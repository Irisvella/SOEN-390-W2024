import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ActivationScreen = ({ navigation }) => {
  const [activationCode, setActivationCode] = useState('');

  const handleActivation = () => {
   
    // send code to backend 
    Alert.alert('Activation Attempt', `Code entered: ${activationCode}`);
    
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
       <TouchableOpacity style={styles.activateButton} onPress={() => console.log('Activation confirmed')}>
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
