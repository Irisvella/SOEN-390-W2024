import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const contacts = [
  { id: '1', name: 'Front Desk', email: 'frontdesk@example.com', phone: '123-456-7890' },
  { id: '2', name: 'Maintenance', email: 'maintenance@example.com', phone: '098-765-4321' },
  // Add more contacts as needed
];

const ContactManagement = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
         <Text style={styles.title}>Contact Us</Text>
         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={26} color="#52575D" />
        </TouchableOpacity>
      {contacts.map((contact) => (
        <View key={contact.id} style={styles.contactCard}>
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.contactDetail}>Email: {contact.email}</Text>
          <Text style={styles.contactDetail}>Phone: {contact.phone}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 20,
  },
  contactCard: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactDetail: {
    fontSize: 16,
    marginBottom: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 56, 
    left: 16,
  },
});

export default ContactManagement;
