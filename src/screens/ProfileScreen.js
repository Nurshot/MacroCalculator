import React, { useLayoutEffect,useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {
    const [user, setUser] = useState({
      name: 'John',
      surname: 'Doe',
      gender: 'Male',
      imageUrl: 'https://avatars.githubusercontent.com/u/9919?s=460&v=4',
      goals: 'Eat healthier, exercise more', // Goals added here
    });
  
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editedGoals, setEditedGoals] = useState(user.goals);
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <View style={{ marginRight: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
              <Ionicons name="settings-outline" size={25} color="#000" />
            </TouchableOpacity>
          </View>
        ),
      });
    }, [navigation]);
  
    const handleEditGoals = () => {
      setIsModalVisible(true);
    };
  
    const handleSaveGoals = () => {
      setUser({ ...user, goals: editedGoals });
      setIsModalVisible(false);
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{user.name} {user.surname}</Text>
            <Text style={styles.gender}>{user.gender}</Text>
          </View>
        </View>
        
        <View style={styles.goalsContainer}>
          <Text style={styles.goalsTitle}>My Goals</Text>
          <Text style={styles.goalsText}>{user.goals}</Text>
          <TouchableOpacity onPress={handleEditGoals} style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
  
        {/* Edit Goals Modal */}
        <Modal visible={isModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Goals</Text>
            <TextInput
              style={styles.goalsInput}
              multiline
              value={editedGoals}
              onChangeText={setEditedGoals}
            />
            <TouchableOpacity onPress={handleSaveGoals} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  gender: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },
  goalsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  goalsText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#007bff', // Example color
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start', // Align the button to the left
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  goalsInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    textAlignVertical: 'top', // Important for multiline TextInput
    height: 100,
  },
  saveButton: {
    backgroundColor: '#28a745', // Example color
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;