import React, { useLayoutEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    name: 'John',
    surname: 'Doe',
    gender: 'Male',
    bio: 'Loves coding and enjoys outdoor activities.',
    imageUrl: 'https://avatars.githubusercontent.com/u/9919?s=460&v=4',
    goals: 'Eat healthier, exercise more',
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
      <View style={styles.profileBackground}>
        <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{user.name} {user.surname}</Text>
          <Text style={styles.gender}>{user.gender}</Text>
          <Text style={styles.bio}>{user.bio}</Text>
        </View>
      </View>

      <View style={styles.goalsContainer}>
        <View style={styles.goalsHeader}>
          <Text style={styles.goalsTitle}>My Goals</Text>
          <TouchableOpacity onPress={handleEditGoals} style={styles.editButton}>
            <Ionicons name="pencil-outline" size={18} color="#fff" />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.goalsText}>{user.goals}</Text>
      </View>

      {/* Edit Goals Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
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
        </View>
      </Modal>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f2f5',
  },
  profileBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#007bff',
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  gender: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  goalsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    width: '100%',
    marginBottom: 20,
  },
  goalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  goalsText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
    lineHeight: 22,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width * 0.85,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
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
  goalsInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;