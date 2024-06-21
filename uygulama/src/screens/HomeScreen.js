import React, { useContext, useState, useEffect } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl // RefreshControl'ü import edin
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import * as Progress from "react-native-progress";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  const [totalCal, setTotalCal] = useState(2000);
  const [currentCal, setCurrentCal] = useState(1200);
  const [protein, setProtein] = useState(50); // Protein gram cinsinden
  const [carbs, setCarbs] = useState(200); // Karbonhidrat gram cinsinden
  const [fat, setFat] = useState(70); // Yağ gram cinsinden

  const [remainingCal, setRemainingCal] = useState(0);
  const [remainingProtein, setRemainingProtein] = useState(0);
  const [remainingCarbs, setRemainingCarbs] = useState(0);
  const [remainingFat, setRemainingFat] = useState(0);

  const [refreshing, setRefreshing] = useState(false); // Yenileme durumu için state

  const fetchProfileData = async () => {
    try {
      const profileDataString = await AsyncStorage.getItem("profileData");
      if (profileDataString) {
        const profileData = JSON.parse(profileDataString);
        setTotalCal(parseInt(profileData.calories));
        setRemainingCal(parseInt(profileData.calories) - currentCal);
        setRemainingProtein(parseInt(profileData.protein) - protein);
        setRemainingCarbs(parseInt(profileData.carbs) - carbs);
        setRemainingFat(parseInt(profileData.fat) - fat);
      }
    } catch (error) {
      console.error("Error fetching profile data", error);
    }
  };

  // useEffect ile verileri ilk yüklemede çekin
  useEffect(() => {
    fetchProfileData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true); // Yenileme işlemi başladı
    await fetchProfileData(); // Verileri yeniden çekin
    setRefreshing(false); // Yenileme işlemi bitti
  };

  const renderProgressBar = (title, currentValue, maxValue, remainingValue, color) => {
    return (
      <Card style={styles.card}>
        <View style={{ padding: 10 }}>
          <Text style={styles.progressText}>
            {title}: {currentValue} ({remainingValue} remaining)
          </Text>
          <Progress.Bar
            progress={currentValue / maxValue}
            width={null}
            color={color}
          />
        </View>
      </Card>
    );
  };

  return (
    <LinearGradient colors={['#f3f4f6', '#e2e8f0']} style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#9Bd35A", "#689F38"]} // Android için renkler
            tintColor="#689F38" // iOS için renk
          />
        }
      >
        <Text style={styles.title}>Daily Calorie Tracker</Text>
        {renderProgressBar("Total Calories", currentCal, totalCal, remainingCal, "#4CAF50")}
        {renderProgressBar("Protein", protein, 150, remainingProtein, "#FF9800")}
        {renderProgressBar("Carbs", carbs, 300, remainingCarbs, "#2196F3")}
        {renderProgressBar("Fat", fat, 100, remainingFat, "#F44336")}

        <Text style={styles.title}>Choose Your Meal</Text>

        <View style={styles.buttonContainer}>
          <AppButton title="Add Breakfast" backgroundColor="#007bff" />
          <AppButton title="Add Lunch" backgroundColor="#28a745" />
          <AppButton title="Add Dinner" backgroundColor="#ffc107" />
          <AppButton title="Add Snacks" backgroundColor="#dc3545" />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const AppButton = ({ title, backgroundColor }) => {
  const navigation = useNavigation();
  const onPressHandler = () => {
    navigation.navigate('Foods'); // FoodsScreen'e yönlendirme işlemi
  };

  return (
    <TouchableOpacity onPress={onPressHandler} style={[styles.appButtonContainer, { backgroundColor }]}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fff',
  },
  progressText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
  },
  appButtonContainer: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

export default HomeScreen;