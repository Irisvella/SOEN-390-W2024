import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UnitBillsComponent = ({ navigation }) => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBills = async () => {
            setLoading(true);
            try {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                const token = await AsyncStorage.getItem('token');
                const response = await fetch(`https://estate-api-production.up.railway.app/billing/my-bills`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setBills(data.map(bill => ({
                    ...bill,
                    id: bill.id.toString(),
                    amount: parseFloat(bill.amount).toFixed(2),
                    payBefore: bill.payBefore.split('T')[0]
                })));
            } catch (error) {
                console.error("Failed to fetch bills:", error);
                Alert.alert("Error", "Failed to load bills");
            } finally {
                setLoading(false);
            }
        };

        fetchBills();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.billTitle}>Unit Bills</Text>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back-ios" size={26} color="#52575D" />
            </TouchableOpacity>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : bills.length > 0 ? (
                <ScrollView contentContainerStyle={styles.billsContainer} >
                    {bills.map((bill, index) => (
                        <View key={index} style={styles.billItem}>
                            <View style={styles.row}>
                                <FontAwesome name="building-o" size={24} style={styles.iconStyle} />
                                <Text style={styles.billText}>{bill.propertyAddress}</Text>
                            </View>
                            <View style={styles.row}>
                                <FontAwesome5 name="door-closed" size={24} style={styles.iconStyle} />
                                <Text style={styles.billText}> Unit {bill.unitNumber}</Text>
                            </View>
                            <View style={styles.row}>
                                <FontAwesome name="usd" size={24} style={styles.iconStyle} />
                                <Text style={styles.billText}>{bill.amount}</Text>
                            </View>
                            <View style={styles.row}>
                                <MaterialCommunityIcons name="calendar-clock" size={24} style={styles.iconStyle} />
                                <Text style={styles.billText}>{bill.payBefore}</Text>
                            </View>
                            <View style={styles.row}>
                                <MaterialCommunityIcons name="check-circle-outline" size={24} style={styles.iconStyle} color={bill.status === 'paid' ? styles.statusPaid.color : styles.statusDue.color} />
                                <Text style={[styles.billText, bill.status === 'paid' ? styles.statusPaid : styles.statusDue]}>{bill.status}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.centeredContainer}>
                <Text>No bills available.</Text>
                </View>
            )}
        </View>
    );
    
};

    


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    billsContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-between', 
        alignSelf: 'center',
        
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 20,
        backgroundColor: "#FFF"
      },
    billItem: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    billText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    billTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 60,
    },
    statusPaid: {
        color: 'green',
    },
    statusDue: {
        color: 'red',
    },
    iconStyle: {
        marginRight: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    backButton: {
        position: 'absolute',
        top: 56, 
        left: 16,
        marginTop: 25,
      },
});


export default UnitBillsComponent;
