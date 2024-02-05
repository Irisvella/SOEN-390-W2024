// LoginPage.js 
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import UserLoginForm from './UserLoginForm'; 
import CompanyLoginForm from './CompanyLoginForm';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

const LoginPage = () => {
  const [role, setRole] = useState('user');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <RadioButton.Group onValueChange={newValue => setRole(newValue)} value={role}>
        <View style={styles.radioButtonContainer}>
          <Text>Public User</Text>
          <RadioButton value="user" />
        </View>
        <View style={styles.radioButtonContainer}>
          <Text>Company</Text>
          <RadioButton value="company" />
        </View>
      </RadioButton.Group>
      
      {role === 'company' ? <CompanyLoginForm /> : <UserLoginForm />}
      
      <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.signupButton}>
        <Text>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioGroupContainer: {
    flexDirection: 'row', // Align radio buttons side by side
    justifyContent: 'space-between', // Add space between the radio buttons
    marginBottom: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 10,
    // Add your styling for the avatar container
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  formGroup: {
    marginTop: 20,
    // Add your styling
  },
  label: {
    // Add your styling
  },
  picker: {
    width: 200,
    height: 40,
    // Add your styling
  },
});

export default LoginPage;
