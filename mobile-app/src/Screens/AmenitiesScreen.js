import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';


// Get the full width of the screen
const { width } = Dimensions.get("screen");

const AmenitiesScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Each TouchableOpacity can be used to navigate to a specific booking screen for the amenity */}
        <View style={styles.mediaImageContainer}>
            <Image source={require("../../assets/pool.png")} style={styles.image} resizeMode="cover"></Image>
            <Text style={styles.text}>Pool</Text>
            <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('BookPool')}>
                <Ionicons name="add-circle" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
        <View style={styles.mediaImageContainer}>
            <Image source={require("../../assets/gym.png")} style={styles.image} resizeMode="cover"></Image>
            <Text style={styles.text}>Gym</Text>
              <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('BookGym')}>
                <Ionicons name="add-circle" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
        <View style={styles.mediaImageContainer}>
            <Image source={require("../../assets/sauna.png")} style={styles.image} resizeMode="cover"></Image>
            <Text style={styles.text}>Sauna</Text>
              <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('BookSauna')}>
                <Ionicons name="add-circle" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
        <View style={styles.mediaImageContainer}>
            <Image source={require("../../assets/massage.png")} style={styles.image} resizeMode="cover"></Image>
            <Text style={styles.text}>Massage Room</Text>
              <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('BookMassage')}>
                <Ionicons name="add-circle" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
        <View style={styles.mediaImageContainer}>
            <Image source={require("../../assets/conference.png")} style={styles.image} resizeMode="cover"></Image>
            <Text style={styles.text}>Conference Room</Text>
              <TouchableOpacity style={styles.bookButton}  onPress={() => navigation.navigate('BookConference')}>
                <Ionicons name="add-circle" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
        <View style={styles.mediaImageContainer}>
            <Image source={require("../../assets/party.png")} style={styles.image} resizeMode="cover"></Image>
            <Text style={styles.text}>Party Room</Text>
              <TouchableOpacity style={styles.bookButton}  onPress={() => navigation.navigate('BookParty')}>
                <Ionicons name="add-circle" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
        {/* Add more amenities as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 10, // Add some horizontal padding to the whole container
  },
  mediaImageContainer: {
    width: width - 20, // Adjusted width for screen padding
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    position: 'relative', // This enables absolute positioning for children
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bookButton: {
    position: 'absolute',
    right: 10, // Position from the right edge of the container
    bottom: 10, // Position from the bottom edge of the container
    backgroundColor: 'rgba(0,0,0,0.6)', // Semi-transparent black background
    borderRadius: 25,
    padding: 8,
    // Ensure the zIndex is high enough if it's still appearing beneath other elements
    zIndex: 1, 
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#FFFFFF',
    zIndex: 2, // Ensure text also appears above the image
  },
});

export default AmenitiesScreen;
