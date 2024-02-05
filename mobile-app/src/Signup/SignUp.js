import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import UserSignupForm from './UserSignUp'; 
import CompanySignupForm from './CompanySignup'; 
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

const SignUp = () => {
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

      {role === 'company' ? <CompanySignupForm /> : <UserSignupForm />}

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.signupButton}>
        <Text>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  signupButton: {
    marginTop: 20,
  },
  
});

export default SignUp;
