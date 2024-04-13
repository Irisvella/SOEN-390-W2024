import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';


const BookParty = ({ navigation }) => {
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [selectedDate, setSelectedDate] = useState(new Date());


  const onDaySelect = (day) => {
    setSelectedDate(day.dateString);
  };

  const markedDates = {
    [selectedDate]: {selected: true, selectedColor: '#00adf5'}
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
        current={Date()}
        onDayPress={onDaySelect}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: '#00adf5',
          todayTextColor: '#00adf5',
          arrowColor: 'blue',
        }}
      />
      <Text style={styles.timePickerLabel}>Select Time:</Text>
      <Picker
        selectedValue={selectedTime}
        style={styles.timePicker}
        onValueChange={(itemValue, itemIndex) => setSelectedTime(itemValue)}
      >
        {/* Example time slots, need to adjust to be dynamic w database */}
        <Picker.Item label="10:00 AM" value="10:00 AM" />
        <Picker.Item label="11:00 AM" value="11:00 AM" />
        <Picker.Item label="12:00 PM" value="12:00 PM" />
      </Picker>
      <TouchableOpacity style={styles.bookButton} onPress={() => console.log('Booking confirmed')}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
