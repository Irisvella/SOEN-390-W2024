// HomeScreen.js
import React from 'react';
import { View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Signup"
        onPress={() => navigation.navigate('Signup')} // Use the navigate function to go to SignupScreen
      />
    </View>
  );
};

export default HomeScreen;
