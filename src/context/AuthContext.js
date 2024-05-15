import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  // isLoading ve splashLoading state'lerini kaldırdım.

  const register = (name, email, password) => {
    // Register işlevi şimdilik boş kalacak.
  };

  const login = () => {
    // Sabit bir kullanıcı bilgisi ayarladım
    let userInfo = { user: { name: 'Demo User' }, access_token: 'demoToken' };
    setUserInfo(userInfo);
    AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));

    
  };

  const logout = () => {
    AsyncStorage.removeItem('userInfo');
    setUserInfo({});
  };

  const isLoggedIn = async () => {
    let userInfo = await AsyncStorage.getItem('userInfo');
    if (userInfo) {
      setUserInfo(JSON.parse(userInfo));
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
