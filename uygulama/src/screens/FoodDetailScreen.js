import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { fetchFoodById } from '../api.js'; // Import the fetchFoodById function

const FoodDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [food, setFood] = useState(null);
  const [portion, setPortion] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFood = async () => {
      try {
        const foodDetails = await fetchFoodById(id);
        setFood(foodDetails);
      } catch (error) {
        console.error('Error fetching food details:', error);
      } finally {
        setLoading(false);
      }
    };

    getFood();
  }, [id]);

  const calculateNutrient = (value) => {
    return (parseFloat(value) * portion).toFixed(2);
  };

  const increasePortion = () => {
    setPortion(portion + 1);
  };

  const decreasePortion = () => {
    if (portion > 1) {
      setPortion(portion - 1);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!food) {
    return <Text>Food not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: food.food_image }} style={styles.image} />
      <Text style={styles.title}>{food.food_name}</Text>

      <View style={styles.portionContainer}>
        <Text style={styles.portionLabel}>Portion:</Text>
        <TouchableOpacity onPress={decreasePortion} style={styles.portionButton}>
          <FontAwesome name="minus" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.portionText}>{portion}</Text>
        <TouchableOpacity onPress={increasePortion} style={styles.portionButton}>
          <FontAwesome name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.nutrientContainer}>
        <NutrientRow label="Protein" value={calculateNutrient(food.protein)} unit="g" />
        <NutrientRow label="Carbs" value={calculateNutrient(food.carbonhidrats)} unit="g" />
        <NutrientRow label="Fat" value={calculateNutrient(food.fat)} unit="g" />
        <NutrientRow label="Calories" value={calculateNutrient(food.calories)} unit="" />
      </View>
    </View>
  );
};

const NutrientRow = ({ label, value, unit }) => (
  <View style={styles.nutrientRow}>
    <Text style={styles.nutrientLabel}>{label}:</Text>
    <Text style={styles.nutrientValue}>{value}{unit}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  portionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  portionLabel: {
    fontSize: 18,
    marginRight: 10,
    color: '#555',
  },
  portionButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 10,
  },
  portionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  nutrientContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '90%', // Increased width to 90% 
    alignSelf: 'center', // Center the container horizontally
  },
  nutrientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  nutrientLabel: {
    fontSize: 18,
    color: '#555',
  },
  nutrientValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default FoodDetailScreen;