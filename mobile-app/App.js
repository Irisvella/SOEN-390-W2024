import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/Login/LoginPage.js'; 
import  SignUp from './src/Signup/SignUp.js';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} options={{ title: 'Login' }} />
        <Stack.Screen name="Signup" component={SignUp} options={{ title: 'Signup' }} />

        {/* <Stack.Screen name="Home" component={HomePage} options={{ title: 'Home' }} /> */}
        {/* Add more screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
