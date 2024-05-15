
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingsAccountScreen = () => {
  const [user, setUser] = useState({
    name: 'Jane',
    surname: 'Doe',
    email: 'jane.doe@example.com',
    phone: '+1234567890',
    address: '123 Main St, Anytown, USA',
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEditDetails = () => {
    setIsModalVisible(true);
  };

  const handleSaveDetails = () => {
    setUser(editedUser);
    setIsModalVisible(false);
  };

  const handleInputChange = (key, value) => {
    setEditedUser({ ...editedUser, [key]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileBackground}>
        <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{user.name} {user.surname}</Text>
          <Text style={styles.phone}>{user.phone}</Text>
          <Text style={styles.address}>{user.address}</Text>
        </View>
        <TouchableOpacity onPress={handleEditDetails} style={styles.editButton}>
          <Ionicons name="pencil-outline" size={18} color="#fff" />
          <Text style={styles.editButtonText}>Edit Details</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Details Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Account Details</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={editedUser.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={editedUser.surname}
              onChangeText={(text) => handleInputChange('surname', text)}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={editedUser.phone}
              keyboardType="phone-pad"
              onChangeText={(text) => handleInputChange('phone', text)}
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Address"
              value={editedUser.address}
              multiline
              onChangeText={(text) => handleInputChange('address', text)}
            />
            <TouchableOpacity onPress={handleSaveDetails} style={styles.saveButton}>
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
      flexGrow: 1,
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
      marginBottom: 20,
    },
    name: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
    },
    email: {
      fontSize: 18,
      color: '#666',
      marginBottom: 5,
    },
    phone: {
      fontSize: 18,
      color: '#666',
      marginBottom: 5,
    },
    address: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginBottom: 15,
    },
    editButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#007bff',
      paddingVertical: 10,
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
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 12,
      borderRadius: 8,
      width: '100%',
      marginBottom: 15,
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
  
  export default SettingsAccountScreen;