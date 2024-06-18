import React,{useContext,useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../context/AuthContext';

const SettingsScreen = ({ navigation }) => {
    const {userInfo, isLoading, logout} = useContext(AuthContext);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('SettingsAccountScreen')}>
          <Ionicons name="person-circle-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Account Details</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('SettingsChangePassScreen')}>
          <Ionicons name="key-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Change Password</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={logout}>
          <Ionicons name="log-out-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Log Out</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Goals</Text>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('SettingsNutritionScreen')}>
          <Ionicons name="restaurant-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Nutrition Goals</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('SettingsAboutApp')}>
          <Ionicons name="information-circle-outline" size={24} color="#333" />
          <Text style={styles.optionText}>About App</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('SettingsTermsConditionsScreen')}>
          <Ionicons name="document-text-outline" size={24} color="#333" />
          <Text style={styles.optionText}>Terms & Conditions</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 18,
    marginLeft: 15,
    flex: 1,
  },
});

export default SettingsScreen;