import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const UserSignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        setProfilePic(response);
      }
    });
  };

  const handleSignup = () => {
    // Implement your signup logic here
    console.log(username, email, phone, password, confirmPassword);
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
        <Text>Set Profile Picture</Text>
      </TouchableOpacity>
      {profilePic && (
        <Image source={{ uri: profilePic.uri }} style={styles.image} />
      )}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
     
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '90%',
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  // Additional styles if needed
});

export default UserSignupForm;
