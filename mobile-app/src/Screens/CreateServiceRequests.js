import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CreateServiceRequests = ({ route, navigation }) => {
  const [description, setDescription] = useState('');
  const [requestType, setRequestType] = useState('');
  const [priorityType, setPriorityType] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

   const { propertyId } = route.params;

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowDatePicker(false);
  };

  const showDatepicker = () => {
    setShowDatePicker(current => !current); 
  };
  


  const handleSubmit = async () => {
    
    if (!priorityType || !description || !requestType || !date) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    } 
    
    console.log('Request Type:', requestType, 'Priority:', priorityType, 'Date:', date, 'Description:', description, 'Property ID:', propertyId);

    const formData = {
      propertyId: propertyId, 
      requestType,
      requestReason: description,
      priority: priorityType.toLowerCase(),
      date: date.toISOString(),
      id: 1, 
    };

    const url = 'https://estate-api-production.up.railway.app/CreateRequest';
    const storedToken = await AsyncStorage.getItem('token');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`,

        },
        body: JSON.stringify(formData),
      });
  
      const responseData = await response.json();
      
      if (response.ok) {
        Alert.alert('Request Submitted, Thank you!');
        setDescription('');
        setRequestType('');
        setPriorityType('');
        setDate(new Date());
        navigation.goBack();
      } else {
        Alert.alert('Error', responseData.message || 'An error occurred');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Network request failed');
    }
  };

  return (
    <KeyboardAwareScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
         <Text style={styles.title}>Create A New Request</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={26} color="#52575D" />
        </TouchableOpacity>


        <Text style={styles.label}>Request Type</Text>
      <Picker
        selectedValue={requestType}
        onValueChange={(itemValue, itemIndex) => setRequestType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select request type" value="" />
        <Picker.Item label="Moving out" value="MovingOut" />
        <Picker.Item label="Moving In" value="MovingIn" />
        <Picker.Item label="Request Access (Fobs)" value="Request" />
        <Picker.Item label="Intercom Changes" value="Intercom" />
        <Picker.Item label="Reporting a violation" value="Reporting" />
        <Picker.Item label="Common Area Issues" value="Deficiency" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      <Text style={styles.label}>Priority</Text>
      <Picker
        selectedValue={priorityType}
        onValueChange={(itemValue, itemIndex) => setPriorityType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Priority" value="" />
        <Picker.Item label="Low" value="Low" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="High" value="High" />
      </Picker>

      <Text style={styles.label}>Select Date</Text>
      <TouchableOpacity onPress={showDatepicker} style={styles.datePickerButton}>
        <Text style={styles.datePickerButtonText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Reason for request"
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 40,
  }, 
  input: {
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  textArea: {
    height: 100, 
  },
  backButton: {
    position: 'absolute',
    top: 56, 
    left: 16,
  },
  submitButton: {
    marginHorizontal: 100,
    backgroundColor: '#00adf5',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 100,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerButtonText: {
    fontSize: 16,
  },
});

export default CreateServiceRequests;
