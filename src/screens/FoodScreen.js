import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Image, Text, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchFoods } from '../api.js';

const FoodScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFoods = async () => {
      try {
        const foodsData = await fetchFoods();
        setFoods(foodsData);
        setFilteredFoods(foodsData);
      } catch (error) {
        console.error('Error fetching foods:', error);
      } finally {
        setLoading(false);
      }
    };

    getFoods();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredFoods(foods);
    } else {
      const filtered = foods.filter((food) =>
        food.food_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFoods(filtered);
    }
  };

  const navigation = useNavigation();

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <LinearGradient colors={['#f3f4f6', '#e2e8f0']} style={styles.container}>
      <ScrollView>
        <View style={styles.screenContainer}>
          <Text style={styles.title}>Foods</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search foods..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {filteredFoods.map((food) => (
            <Card key={food.food_id} style={styles.foodItem}>
              <TouchableOpacity 
                onPress={() => navigation.navigate('FoodDetail', { id: food.food_id })}
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <Image source={{ uri: food.food_image }} style={styles.image} />
                <View style={styles.foodInfo}>
                  <Text style={styles.subtitle}>{food.food_name}</Text>
                  <View style={styles.nutrientInfo}>
                    <Text style={styles.info}>Protein: {food.protein}g</Text>
                    <Text style={styles.info}>Carbs: {food.carbonhidrats}g</Text>
                    <Text style={styles.info}>Fat: {food.fat}g</Text>
                    <Text style={styles.info}>Calories: {food.calories}</Text>
                  </View>
                </View>
              </TouchableOpacity>
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
});

export default FoodScreen;
