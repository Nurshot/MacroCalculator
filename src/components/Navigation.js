import React, { useContext } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { AuthContext } from "../context/AuthContext";
import SplashScreen from "../screens/SplashScreen";
import MealsScreen from "../screens/MealsScreen";
import FoodScreen from "../screens/FoodScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FoodDetailScreen from "../screens/FoodDetailScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SettingsChangePassScreen from "../screens/SettingsChangePassScreen";
import SettingsAboutApp from "../screens/SettingsAboutApp";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
});

// Home Tab Navigator
function HomeTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{
        title:"Homepage",
        tabBarIcon: ({ color, size }) => (
          <Icon name='home-outline' size={size} color={color} />
        )
      }} />
      <Tab.Screen name="Meals" component={MealsScreen} options={{
        title:"Meals",
        tabBarIcon: ({ color, size }) => (
          <Icon name='restaurant-outline' size={size} color={color} />
        )
      }} />
      
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        title:"Profil",
        tabBarIcon: ({ color, size }) => (
          <Icon name='person-circle-outline' size={size} color={color} />
        )
      }} />

      
      
    </Tab.Navigator>
  );
}

// Main Stack Navigator
function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Foods"
        component={FoodScreen}
        options={{ headerShown: true }} 
      />
      <Stack.Screen
        name="FoodDetail"
        component={FoodDetailScreen}
        options={{ headerShown: true }} 
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: true }} 
      />
       <Stack.Screen
        name="SettingsChangePassScreen"
        component={SettingsChangePassScreen}
        options={{ headerShown: true }} 
      />
      <Stack.Screen
        name="SettingsAboutApp"
        component={SettingsAboutApp}
        options={{ headerShown: true }} 
      />
    </Stack.Navigator>
  );
}

const Navigation = () => {
  const { userInfo, splashLoading } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splashLoading ? (
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : userInfo.access_token ? (
          <Stack.Screen
            name="MainStack"
            component={MainStackNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;