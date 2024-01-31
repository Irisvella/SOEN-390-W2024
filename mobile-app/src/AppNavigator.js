// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './src/screens/SignupScreen'; // Import SignupScreen

const Stack = createStackNavigator(); // Create a stack navigator

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Add SignupScreen to the stack navigator */}
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
        
        />
        {/* You can add more screens to the stack navigator here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
