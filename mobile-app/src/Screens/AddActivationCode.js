import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 


const ActivationScreen = ({ navigation }) => {
  const [activationCode, setActivationCode] = useState('');

  const handleActivation = async () => {

    if (activationCode.trim() === '') {
      Alert.alert('Missing Code', 'Please enter an activation code before continuing.');
      return; 
    }

    try {
      // Assuming 'token' is saved in localStorage (adjust as needed for React Native)
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('https://estate-api-production.up.railway.app/registration', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registrationKey: activationCode })
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Unit registered successfully');
        navigation.goBack();
      } else {
        Alert.alert('Registration Failed', data.message || 'Failed to register unit');
      }
    } catch (error) {
      console.error('Error registering unit:', error);
      Alert.alert('Error', 'An error occurred while trying to register the unit');
    }
  };


  return (
    <View style={styles.container}>
         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={26} color="#52575D" />
        </TouchableOpacity>
      <Text style={styles.instructionText}>Please enter your activation code:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setActivationCode}
        value={activationCode}
        placeholder="Activation Code"
        keyboardType="numeric" 
      />
       <TouchableOpacity style={styles.activateButton} onPress={handleActivation}>
        <Text style={styles.activateButtonText}>Activate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  instructionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 56, 
    left: 16,
    marginTop: 40,
  },
  activateButton: {
    marginHorizontal: 100,
    backgroundColor: '#00adf5',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  activateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ActivationScreen;
