import React, { useContext, useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';

const SettingsChangePassScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { isLoading, changePassword } = useContext(AuthContext);

  const handleChangePassword = () => {
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Yeni parolalar uyuşmuyor!');
      return;
    }

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setErrorMessage('Tüm alanları doldurun!');
      return;
    }

    setErrorMessage('');
    changePassword(currentPassword, newPassword);
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <Text style={styles.title}>Şifre Değiştir</Text>
        <TextInput
          style={styles.input}
          value={currentPassword}
          placeholder="Mevcut şifreyi girin"
          onChangeText={text => setCurrentPassword(text)}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          value={newPassword}
          placeholder="Yeni şifreyi girin"
          onChangeText={text => setNewPassword(text)}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          value={confirmNewPassword}
          placeholder="Yeni şifreyi onaylayın"
          onChangeText={text => setConfirmNewPassword(text)}
          secureTextEntry
        />

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Şifreyi Değiştir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f7f7',
  },
  wrapper: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default SettingsChangePassScreen;