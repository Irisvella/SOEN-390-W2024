import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Mock data for user bookings
const mockBookings = [
  {
    id: '1',
    facility: 'Pool',
    date: '2023-07-20',
    time: '2:00 PM - 3:00 PM',
  },
  {
    id: '2',
    facility: 'Gym',
    date: '2023-07-22',
    time: '5:00 PM - 6:00 PM',
  },
  {
    id: '3',
    facility: 'Sauna',
    date: '2023-07-25',
    time: '6:00 PM - 7:00 PM',
  },
];

const ViewBookings = ({ navigation }) => {
  const [bookings, setBookings] = useState(mockBookings);

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <Text style={styles.bookingText}><Text style={styles.boldText}>Facility:</Text> {item.facility}</Text>
      <Text style={styles.bookingText}><Text style={styles.boldText}>Date:</Text> {item.date}</Text>
      <Text style={styles.bookingText}><Text style={styles.boldText}>Time:</Text> {item.time}</Text>
    </View>
  );

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
