import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsNutritionScreen = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nutritionGoals, setNutritionGoals] = useState({
    calories: '2000',
    protein: '100',
    carbs: '250',
    fat: '70',
  });
  const [editedGoals, setEditedGoals] = useState(nutritionGoals);

  useEffect(() => {
    const fetchNutritionGoals = async () => {
      try {
        const storedGoals = await AsyncStorage.getItem('profileData');
        if (storedGoals) {
          setNutritionGoals(JSON.parse(storedGoals));
        }
      } catch (error) {
        console.error('Error fetching nutrition goals', error);
      }
    };

    fetchNutritionGoals();
  }, []);

  const handleEditGoals = () => {
    setEditedGoals(nutritionGoals);
    setIsModalVisible(true);
  };

  const handleSaveGoals = async () => {
    setNutritionGoals(editedGoals);
    setIsModalVisible(false);
    await AsyncStorage.setItem('profileData', JSON.stringify(editedGoals));
  };

  const handleInputChange = (key, value) => {
    setEditedGoals({ ...editedGoals, [key]: value });
  };

  return (
    <LinearGradient colors={['#f3f4f6', '#e2e8f0']} style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Nutrition Goals</Text>
        <Card style={styles.card}>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Calories</Text>
            <Text style={styles.value}>{nutritionGoals.calories} kcal</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Protein</Text>
            <Text style={styles.value}>{nutritionGoals.protein} g</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Carbs</Text>
            <Text style={styles.value}>{nutritionGoals.carbs} g</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.label}>Fat</Text>
            <Text style={styles.value}>{nutritionGoals.fat} g</Text>
          </View>
        </Card>
        <TouchableOpacity onPress={handleEditGoals} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Goals</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Edit Goals Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Nutrition Goals</Text>
            <View style={styles.inputGroup}>
              <TextInput
                style={[styles.input, styles.inputWithLabel]}
                placeholder="Calories"
                value={editedGoals.calories}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('calories', text)}
              />
              <Text style={styles.inputLabel}>kcal</Text>
            </View>
            <View style={styles.inputGroup}>
              <TextInput
                style={[styles.input, styles.inputWithLabel]}
                placeholder="Protein"
                value={editedGoals.protein}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('protein', text)}
              />
              <Text style={styles.inputLabel}>protein</Text>
            </View>
            <View style={styles.inputGroup}>
              <TextInput
                style={[styles.input, styles.inputWithLabel]}
                placeholder="Carbs"
                value={editedGoals.carbs}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('carbs', text)}
              />
              <Text style={styles.inputLabel}>carbs</Text>
            </View>
            <View style={styles.inputGroup}>
              <TextInput
                style={[styles.input, styles.inputWithLabel]}
                placeholder="Fat"
                value={editedGoals.fat}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange('fat', text)}
              />
              <Text style={styles.inputLabel}>fat</Text>
            </View>
            <TouchableOpacity onPress={handleSaveGoals} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 15,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 18,
    color: '#333',
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: Dimensions.get('window').width * 0.85,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  inputWithLabel: {
    width: '80%',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SettingsNutritionScreen;