import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Entypo, FontAwesome, MaterialIcons} from '@expo/vector-icons'; 

import LoginScreen from './src/Screens/LoginScreen';
import SignupScreen from './src/Screens/SignupScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import AmenitiesScreen from './src/Screens/AmenitiesScreen';
import HomeScreen from './src/Screens/HomeScreen';
import BookPool from './src/Screens/Bookings/BookPool';
import BookGym from './src/Screens/Bookings/BookGym';
import BookSauna from './src/Screens/Bookings/BookSauna';
import BookMassage from './src/Screens/Bookings/BookMassage';
import BookConference from './src/Screens/Bookings/BookConference';
import BookParty from './src/Screens/Bookings/BookParty';
import ViewBookings from './src/Screens/Bookings/ViewBookings';
import CreateServiceRequests from './src/Screens/CreateServiceRequests';
import ContactManagement from './src/Screens/ContactManagement';
import ActivationScreen from './src/Screens/AddActivationCode';

// Import other screens and icons as needed

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthScreens() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

function MainScreens() {
  return (
    <Tab.Navigator /* Your Tab Navigator screenOptions */>
      {/* Define your Tab Screens here */}

      <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <Entypo name="home" size={30} color={focused ? "red": "#16247d"} />
            </View>
              )
            }
          }}
          />

          <Tab.Screen 
          name="Book Amenities" 
          component={AmenitiesScreen} 
           options={{
            tabBarIcon: ({focused})=>{
              return (
                <View
                 style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#16247d",
                  width: Platform.OS == "ios" ? 50 : 60,
                  height: Platform.OS == "ios" ? 50 : 60,
                  top: Platform.OS == "ios" ? -10 : -20,
                  borderRadius: Platform.OS == "ios" ? 25 : 30
                 }}
                >
                  <FontAwesome name="plus" size={24} color="#fff" />
                </View>
              )
            }
           }}
          />
          <Tab.Screen name="Profile" 
          component={ProfileScreen} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <MaterialIcons name="account-circle" size={30} color={focused ? "red": "#16247d"} />
            </View>
              )
            }
          }}/>
      {/* Add more Tab.Screen as needed */}
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{ headerShown: false }}>

        <MainStack.Screen name="Auth" component={AuthScreens} />
        {/* You can add more screens to MainStack that are not part of the bottom tabs but still within the authenticated flow */}
        <MainStack.Screen name="Main" component={MainScreens} />
        <MainStack.Screen name="BookPool" component={BookPool} />
        <MainStack.Screen name="BookGym" component={BookGym} />
        <MainStack.Screen name="BookSauna" component={BookSauna} />
        <MainStack.Screen name="BookMassage" component={BookMassage} />
        <MainStack.Screen name="BookConference" component={BookConference} />
        <MainStack.Screen name="BookParty" component={BookParty} />
        <MainStack.Screen name="ViewBookings" component={ViewBookings} />
        <MainStack.Screen name="ServiceRequest" component={CreateServiceRequests} />
        <MainStack.Screen name="ContactManagement" component={ContactManagement} />
        <MainStack.Screen name="AddActivationCode" component={ActivationScreen} />
        <MainStack.Screen name="Profile" component={ProfileScreen} />


 


      </MainStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
