import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AmenitiesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Amenities</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // You can adjust the background color
  },
  text: {
    fontSize: 20, // Adjust text size as needed
    fontWeight: 'bold',
  },
});

export default AmenitiesScreen;
