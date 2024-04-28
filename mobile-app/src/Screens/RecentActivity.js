import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Modal, Button, } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';



const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
    }).format(date);
};

const calculateDaysUntilNextMonth = () => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1); 
    const timeDiff = nextMonth - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); 
    return daysDiff;
};

const daysUntilRentDue = calculateDaysUntilNextMonth();

const activities = [
 
    { id: '1', type: 'payment', description: `Rent is due in ${daysUntilRentDue} days`, amount: '$1500', issued_at: `${new Date()}` },
    { id: '3', type: 'notification', description: 'New document available: Lease Agreement',  issued_at: '2021-04-10' },
    // Add more items here
];


const ActivityItem = ({ item, onPress }) => {
    let iconName;
    let iconColor;

    switch (item.type) {
        case 'payment':
            iconName = 'attach-money';
            iconColor = '#4CAF50'; // Green
            break;
        case 'notification':
            iconName = 'notifications';
            iconColor = '#2196F3'; // Blue
            break;
        default:
            iconName = 'build-circle';
            iconColor = '#FF9800'; // Orange
   
    }

    return (
        <TouchableOpacity onPress={onPress} style={styles.activityItem}>
            <MaterialIcons name={iconName} size={24} color={iconColor} style={styles.icon} />
            <View style={styles.details}>
                <Text style={styles.description}>{item.title || item.description}</Text>
                <Text style={styles.date}>{formatDate(item.issued_at)}</Text>
            </View>
        </TouchableOpacity>
    );
};



const ActivityScreen = ({ navigation }) => {

    const [serviceRequests, setServiceRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);

   

    useEffect(() => {
    const fetchServiceRequests = async () => {
    try {
        const token = await AsyncStorage.getItem('token');  
      const response = await fetch('https://estate-api-production.up.railway.app/CreateRequest/viewRequests', {
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
      console.log("Service Requests:", data);
      setServiceRequests(data.map(req => ({ ...req, id: req.id }))); 
    } catch (error) {
      console.error("Failed to fetch service requests:", error);
    }
  };

  fetchServiceRequests();
}, []);

    return (
    
        <View style={styles.container}>
          <Text style={styles.title}>Recent Activity</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back-ios" size={26} color="#52575D" />
        </TouchableOpacity>
          <FlatList
            data={activities}
            renderItem={({ item }) => <ActivityItem item={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
          />
            <Text style={styles.subtitle}>My Service Requests</Text>
          <FlatList
            data={serviceRequests}
            renderItem={({ item }) => (
                <ActivityItem
                    item={item}
                    onPress={() => setSelectedRequest(item)}
                />
            )}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
                 {selectedRequest && (
                <RequestDetailsModal
                    visible={!!selectedRequest}
                    onRequestClose={() => setSelectedRequest(null)}
                    item={selectedRequest}
                />
            )}
        </View>
      );
    };

    const RequestDetailsModal = ({ visible, onRequestClose, item }) => {
        if (!item) {
            return null;
        }

        const getStatusStyle = (status) => {
            switch (status.toLowerCase()) {
                case 'completed':
                    return styles.statusCompleted;
                case 'unassigned':
                    return styles.statusUnassigned;
                case 'in_progress':
                    return styles.statusInProgress;
            }
        };
        
    
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={visible}
                onRequestClose={onRequestClose}
            >
         <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{item.title}</Text>
                <Text style={styles.description}>
                    <Text style={styles.label}>Description: </Text>
                    {item.description}
                </Text>
                <Text style={styles.description}>
                    <Text style={styles.label}>Date Needed: </Text>
                    {formatDate(item.date_needed)}
                </Text>
                <Text style={styles.description}>
                    <Text style={styles.label}>Priority: </Text>
                    {item.request_priority}
                </Text>
                <Text style={styles.description}>
                    <Text style={styles.label}>Status: </Text>
                    <Text style={getStatusStyle(item.status)}>{item.status}</Text>
                </Text>
                <Button title="Close" onPress={onRequestClose} />
            </View>
            </Modal>
        );
    };

    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF', 
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 80,
    }, 
    subtitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 20,
    },
    listContainer: {
        padding: 10,
    },
    activityItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0'
    },
    icon: {
        marginRight: 10
    },
    details: {
        flex: 1
    },
    description: {
        fontSize: 16,
        color: '#333'
    },
    date: {
        fontSize: 12,
        color: '#666'
    }, 
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    }, 
    modalContent: {
        padding: 20,
        marginTop: 150,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,  
    },
    label: {
        fontWeight: 'bold', 
    },
    statusCompleted: {
        color: 'green', 
    },
    statusUnassigned: {
        color: 'red', 
    },
    statusInProgress: {
        color: 'yellow', 
    },
    backButton: {
        position: 'absolute',
        top: 75, 
        left: 26,
      },
});

export default ActivityScreen;
