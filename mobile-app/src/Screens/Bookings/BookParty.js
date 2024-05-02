import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BookParty = ({ route, navigation }) => {
  const [selectedHour, setSelectedHour] = useState("1");
  const [selectedModifier, setSelectedModifier] = useState('AM');
  const [duration, setDuration] = useState('1'); 
  const [selectedDate, setSelectedDate] = useState(); 

  const amenityId = route.params?.amenityId; 
  const propertyId = route.params?.propertyId;

  const formatTimeForRequest = (hour, modifier) => {
    const normalizedHour = hour % 12 + (modifier === 'PM' ? 12 : 0);
    return `${normalizedHour.toString().padStart(2, '0')}:00:00`;
};


const bookSlot = async () => {
  const startTime = formatTimeForRequest(selectedHour, selectedModifier);
  const endTime = formatTimeForRequest(parseInt(selectedHour) + parseInt(duration), selectedModifier); 
  const token = await AsyncStorage.getItem("token"); 
  if (!token) {
    console.log('No token found, redirecting to login');
    navigation.navigate("Login");
    return;
  }
  console.log(`${selectedDate}T${startTime}`);
  console.log(`${selectedDate}T${endTime}`);
  
  try {
    const response = await fetch(`https://estate-api-production.up.railway.app/makeReservation/${propertyId}/newReservation`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amenities_id: amenityId, 
        start_date: `${selectedDate}T${startTime}`, 
        end_date: `${selectedDate}T${endTime}`, 
      })
    });

    if (response.ok) {
      const data = await response.json();
      alert('Booking successful!');
      navigation.goBack();  
    } else {
      const errorData = await response.json();
      alert(`Failed to book: ${errorData.message}`);
    }
  } catch (error) {
    console.error("Error booking gym slot:", error);
    alert('Error making reservation');
  }
};

  return (
    <ScrollView style={styles.container}>
      <Image source={require("../../../assets/party.png")} style={styles.headerImage} />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back-ios" size={26} color="#52575D" />
        </TouchableOpacity>
      <Text style={styles.headerText}>Party Room Booking</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
            Host your next event in our spacious party room. Book your slot now to celebrate your special occasion with friends and family.
        </Text>
      </View>
      <Calendar
       current={selectedDate}
       onDayPress={(day) => setSelectedDate(day.dateString)}
       markedDates={{[selectedDate]: {selected: true, selectedColor: '#00adf5'}}}
       theme={{
         selectedDayBackgroundColor: '#00adf5',
         todayTextColor: '#00adf5',
         arrowColor: 'blue',
      }}
    />
    <View style={styles.pickerContainer}>
   <Picker
     selectedValue={selectedHour}
     style={styles.hourPicker}
     onValueChange={(itemValue) => setSelectedHour(itemValue)}>
     {Array.from({ length: 12 }, (_, i) => <Picker.Item label={`${i+1}:00`} value={`${i+1}`} key={i} />)}
   </Picker>
   <Picker
     selectedValue={selectedModifier}
     style={styles.hourPicker}
     onValueChange={(itemValue) => setSelectedModifier(itemValue)}>
     <Picker.Item label="AM" value="AM" />
     <Picker.Item label="PM" value="PM" />
   </Picker>
   <Picker
     selectedValue={duration}
     style={styles.hourPicker}
     onValueChange={(itemValue) => setDuration(itemValue)}>
     {Array.from({ length: 3 }, (_, i) => <Picker.Item label={`${i+1} h`} value={`${i+1}`} key={i} />)}
   </Picker>
   </View>
   <TouchableOpacity style={styles.bookButton} onPress={bookSlot}>
     <Text style={styles.bookButtonText}>Book Now</Text>
   </TouchableOpacity>
 </ScrollView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    },
    hourPicker: {
     width: 125,
    },
  headerImage: {
    width: '100%',
    height: 200,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  descriptionContainer: {
    padding: 15,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  timePickerLabel: {
    marginLeft: 15,
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  timePicker: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  bookButton: {
    marginHorizontal: 100,
    backgroundColor: '#00adf5',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 56, 
    left: 16,
  },
});

export default BookParty;
