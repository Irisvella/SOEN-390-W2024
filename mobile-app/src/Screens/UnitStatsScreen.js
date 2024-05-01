import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UnitStatsScreen = ({ route, navigation }) => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(false);
    const { units } = route.params;

    const navigateToCreateRequest = () => {
        navigation.navigate('ServiceRequest', { propertyId: units[0].property_id });
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Unit Info</Text>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={26} color="#52575D" />
            </TouchableOpacity>
            <ScrollView style={styles.scrollView}>
                {units.map((unit, index) => (
                    <View key={index} style={styles.unitItem}>
                        <View style={styles.unitRow}>
                            <MaterialIcons name="home" size={25} color="#3699e0" />
                            <Text style={styles.description}><Text style={styles.label}>Property Number:</Text> {unit.property_id}</Text>
                        </View>
                        <View style={styles.unitRow}>
                        <FontAwesome5 name="door-closed" size={20} color="#3699e0" />
                        <Text style={styles.description}><Text style={styles.label}>Unit Number:</Text> {unit.unit_number}</Text>
                        </View>
                        <View style={styles.unitRow}>
                            <MaterialIcons name="square-foot" size={30} color="#3699e0" />
                            <Text style={styles.description}><Text style={styles.label}>Square Feet:</Text> {unit.square_feet}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.makeRequestButton} onPress={navigateToCreateRequest}>
                <FontAwesome5 name="tools" size={20} color="white" /> 
                <Text style={styles.makeRequestButtonText}>Make A Service Request</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    scrollView: {
        marginBottom: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 60
    },
    unitItem: {
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 1,
    },
    unitRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    label: {
        fontWeight: 'bold',
    },
    makeRequestButton: {
        backgroundColor: '#00adf5',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 40,
    },
    makeRequestButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    billsContainer: {
        flexDirection: 'row',
    },
    billItem: {
        padding: 10,
        backgroundColor: '#e3e3e3',
        borderRadius: 5,
        marginRight: 10,
    },
    billText: {
        fontSize: 14,
        color: '#333',
    },
    backButton: {
        position: 'absolute',
        top: 56, 
        left: 16,
        marginTop: 25,
      },
});

export default UnitStatsScreen;
