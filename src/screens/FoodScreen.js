import React, { useState } from 'react';
import {
  StyleSheet, Image, Text, View, ScrollView, TextInput, TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const FoodScreen = () => {
  const allFoods = [
    {
      id: "1",
      name: "Yumurtaa",
      protein: "13g",
      carbs: "1g",
      fat: "11g",
      kcal: "155",
      image: "https://avatars.githubusercontent.com/u/9664363?v=4",
    },
    {
      id: "2",
      name: "Elma",
      protein: "0.5g",
      carbs: "25g",
      fat: "0.3g",
      kcal: "52",
      image: "https://avatars.githubusercontent.com/u/43719324?v=4",
    },
    {
      id: "3",
      name: "Avokado",
      protein: "2g",
      carbs: "9g",
      fat: "15g",
      kcal: "160",
      image: "https://avatars.githubusercontent.com/u/9919?v=4",
    },
    {
      id: "4",
      name: "Tavuk Göğsü",
      protein: "31g",
      carbs: "0g",
      fat: "3.6g",
      kcal: "165",
      image: "https://avatars.githubusercontent.com/u/210414?v=4",
    },
    {
      id: "5",
      name: "Muz",
      protein: "1.3g",
      carbs: "27g",
      fat: "0.3g",
      kcal: "89",
      image: "https://avatars.githubusercontent.com/u/10639145?v=4",
    },
    {
      id: "6",
      name: "Somon",
      protein: "25g",
      carbs: "0g",
      fat: "13g",
      kcal: "208",
      image: "https://avatars.githubusercontent.com/u/14101776?v=4",
    },
    {
      id: "7",
      name: "Brokoli",
      protein: "2.8g",
      carbs: "6g",
      fat: "0.4g",
      kcal: "34",
      image: "https://avatars.githubusercontent.com/u/17219288?v=4",
    },
    {
      id: "8",
      name: "Çilek",
      protein: "0.8g",
      carbs: "8g",
      fat: "0.3g",
      kcal: "32",
      image: "https://avatars.githubusercontent.com/u/362606?v=4",
    },
    {
      id: "9",
      name: "Bezelye",
      protein: "5g",
      carbs: "14g",
      fat: "0.4g",
      kcal: "81",
      image: "https://avatars.githubusercontent.com/u/18133?v=4",
    },
    {
      id: "10",
      name: "Ceviz",
      protein: "15g",
      carbs: "14g",
      fat: "65g",
      kcal: "654",
      image: "https://avatars.githubusercontent.com/u/1481251?v=4",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFoods, setFilteredFoods] = useState(allFoods);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredFoods(allFoods);
    } else {
      const filtered = allFoods.filter((food) =>
        food.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFoods(filtered);
    }
  };

  const handleAddMeal = (food) => {
    // Logic to add the food to a meal
    console.log(`Adding ${food.name} to the meal`);
  };

  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#f3f4f6', '#e2e8f0']} style={styles.container}>
      <ScrollView>
        <View style={styles.screenContainer}>
          <Text style={styles.title}>Foods</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search foods..."
            valuevalue={searchQuery}
            onChangeText={handleSearch}
          />
          {filteredFoods.map((food) => (
            <Card key={food.id} style={styles.foodItem}>
              <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('FoodDetail', { food })}
                  style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
                >
                  <Image source={{ uri: food.image }} style={styles.image} />
                  <View style={styles.foodInfo}>
                    <Text style={styles.subtitle}>{food.name}</Text>
                    <View style={styles.nutrientInfo}>
                      <Text style={styles.info}>Protein: {food.protein}</Text>
                      <Text style={styles.info}>Carbs: {food.carbs}</Text>
                      <Text style={styles.info}>Fat: {food.fat}</Text>
                      <Text style={styles.info}>Kalori: {food.kcal}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleAddMeal(food)}
                  style={styles.addButton}
                >
                  <Ionicons name="add-circle-outline" size={32} color="#4caf50" />
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  screenContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 10,
    textAlign: "center",
    color: '#333',
  },
  searchInput: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  foodItem: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    padding: 10,
    width: "100%",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 20,
  },
  foodInfo: {
    flex: 1,
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: '#333',
  },
  nutrientInfo: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  info: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  addButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FoodScreen;