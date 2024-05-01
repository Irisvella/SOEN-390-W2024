import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ViewBookings = ({ route, navigation }) => {
  const [bookings, setBookings] = useState();
  const [amenities, setAmenities] = useState([]);
  const propertyId = route.params?.propertyId;


  useEffect(() => {
    const fetchAmenities = async () => {

      if (!propertyId) {
        alert('Please select a property to view bookings.');
        navigation.navigate('Profile'); // Assume 'ProfileScreen' is where properties can be selected
      }

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.navigate("Login");
        return;
      }
      try {
        const response = await fetch(
          `http://192.168.2.30:3000/makeReservation/${propertyId}`, 
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Amenities fetched:", data);
        setAmenities(data.map(amenity => ({
        ...amenity,
        id: amenity.id
      })));
        } else {
          console.error("Failed to fetch amenities");
        }
      } catch (error) {
        console.error("Error fetching amenities:", error);
      }
    };
  
    fetchAmenities();
  }, [navigation, propertyId]);

  useEffect(() => {
    const fetchReservations = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.navigate("Login");
        return;
      }
      try {
        const response = await fetch(
          `http://192.168.2.30:3000/myReservations/`, 
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log('Reservations fetched: ',data);
          const validBookings = data.filter(booking => amenities.some(a => parseInt(a.id) === parseInt(booking.amenities_id)));
          setBookings(validBookings);
          } else {
          console.error("Failed to fetch amenities");
        }
      } catch (error) {
        console.error("Error fetching amenities:", error);
      }
    };
  
    if (amenities.length > 0) {  
      fetchReservations();
    }
  }, [navigation, amenities]);  


  const renderBookingItem = ({ item }) => {
    const amenity = amenities.find(a => parseInt(a.id) === parseInt(item.amenities_id));

    console.log(`Trying to find: ${item.amenities_id} Found: ${amenity ? amenity.description : 'none'}`);
  
    return (
      <View style={styles.bookingItem}>
        <Text style={styles.bookingText}><Text style={styles.boldText}>Facility:</Text> {amenity ? amenity.description : 'Unknown'}</Text>
        <Text style={styles.bookingText}><Text style={styles.boldText}>Date:</Text> {new Date(item.start_date).toLocaleDateString()}</Text>
        <Text style={styles.bookingText}><Text style={styles.boldText}>Time:</Text> {`${new Date(item.start_date).toLocaleTimeString()} - ${new Date(item.end_date).toLocaleTimeString()}`}</Text>
      </View>
    );
  };

  if (!bookings || !amenities) {
    return   <View style={styles.centeredContainer}>
      <Text>Loading...</Text>
    </View>
  };

  if (bookings.length === 0 || amenities.length === 0) {
    return (
      <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={26} color="#52575D" />
        </TouchableOpacity>
      <View style={styles.centeredContainer}>
        <Text>No available bookings</Text>
      </View>
    </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={26} color="#52575D" />
        </TouchableOpacity>
      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF"
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 20,
    backgroundColor: "#FFF"
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 40,
  },
  bookingItem: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  bookingText: {
    fontSize: 16,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 56, 
    left: 16,
  },
});

export default ViewBookings;
