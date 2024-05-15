import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // For icons
import { LinearGradient } from 'expo-linear-gradient';

const FoodDetailScreen = ({ route, navigation }) => {
  const { food } = route.params;
  const [portion, setPortion] = useState(1);

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

  const handleAddMeal = () => {
    console.log(`Adding ${portion} portion(s) of ${food.name} to the meal`);
    navigation.goBack();
  };

  return (
    <LinearGradient colors={['#f3f4f6', '#e2e8f0']} style={styles.container}>
      <Image source={{ uri: food.image }} style={styles.image} />
      <Text style={styles.title}>{food.name}</Text>

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
        <NutrientRow
          label="Protein"
          value={calculateNutrient(food.protein)}
          unit="g"
          icon={<MaterialCommunityIcons name="food-variant" size={24} color="#007bff" />}
        />
        <NutrientRow
          label="Carbs"
          value={calculateNutrient(food.carbs)}
          unit="g"
          icon={<MaterialCommunityIcons name="rice" size={24} color="#007bff" />}
        />
        <NutrientRow
          label="Fat"
          value={calculateNutrient(food.fat)}
          unit="g"
          icon={<MaterialCommunityIcons name="oil" size={24} color="#007bff" />}
        />
        <NutrientRow
          label="Kcal"
          value={calculateNutrient(food.kcal)}
          unit=""
          icon={<MaterialCommunityIcons name="fire" size={24} color="#007bff" />}
        />
      </View>

      <TouchableOpacity onPress={handleAddMeal} style={styles.addButton}>
        <Ionicons name="add-circle-outline" size={32} color="#4caf50" />
        <Text style={styles.addButtonText}>Add to Meal</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const NutrientRow = ({ label, value, unit, icon }) => (
  <View style={styles.nutrientRow}>
    <View style={styles.nutrientIcon}>{icon}</View>
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
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
  nutrientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  nutrientIcon: {
    marginRight: 10,
  },
  nutrientLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    color: '#333',
  },
  nutrientValue: {
    fontSize: 16,
    color: '#555',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#4caf50',
  },
});

export default FoodDetailScreen;