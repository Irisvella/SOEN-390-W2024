import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 


const HomeScreen = ({ navigation }) => {

  const [user, setUser] = useState(''); 



  const newsUpdates = [
    { id: '1', title: 'Summer Pool Party', summary: 'Join us for a summer pool party this Saturday!', image: require('../../assets/pool.png') },
    { id: '2', title: 'Gym Renovation', summary: 'Our gym is getting an upgrade. Check out the new equipment!', image: require('../../assets/gym.png') },
  ];

  const quickAccess = [
    { id: '1', name: 'View Bookings', icon: 'calendar-alt', iconSet: 'FontAwesome5', screen: 'ViewBookings', onPress: () => navigation.navigate('ViewBookings')},
    { id: '2', name: 'Service Request', icon: 'tools', iconSet: 'FontAwesome5', screen: 'ServiceRequest', onPress: () => navigation.navigate('ServiceRequest')}, 
    { id: '3', name: 'Contact Management', icon: 'email', iconSet: 'MatericalIcons', screen: 'ContactManagement', onPress: () => navigation.navigate('ContactManagement')},
  ];

  const renderNewsCard = ({ item }) => (
    <TouchableOpacity style={styles.newsCard}>
      <Image source={item.image} style={styles.newsImage} />
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsSummary}>{item.summary}</Text>
    </TouchableOpacity>
  );

  const renderQuickAccessButton = ({ item, key }) => {
    const IconComponent = item.iconSet === 'FontAwesome5' ? FontAwesome5 : MaterialIcons;
    let iconColor = "#52575D"; 
    switch(item.name) {
      case 'View Bookings':
        iconColor = '#4CAF50'; 
        break;
      case 'Service Request':
        iconColor = '#FFC107'; 
        break;
      case 'Contact Management':
        iconColor = '#2196F3'; 
        break;
    }
    
  
    return (
      <TouchableOpacity
        key={key}
        style={styles.quickAccessButton}
        onPress={() => navigation.navigate(item.screen)}
      >
        <IconComponent name={item.icon} size={30} color={iconColor} />
        <Text style={styles.quickAccessText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };


  const fetchUserProfile = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    if (!storedToken) return;
      

    const url = 'http://192.168.2.13:3000/profile';
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
          if (data.role === 'publicUser') {
              setUser('Hi, ' + data.firstName + '!');
          }
      } else {
          console.error('Failed to fetch profile:', data.message);
      }
  } catch (error) {
      console.error('Error fetching profile:', error);
  }
};

useEffect(() => {
  const fetchOnNavigate = navigation.addListener('focus', () => {
    fetchUserProfile();
  });

  return fetchOnNavigate;
}, [navigation]);


  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}> {user} </Text> 
      {/* will dynamically adjust once login is working  */}

      <View style={styles.quickAccessContainer}>
      {quickAccess.map(item => renderQuickAccessButton({ item, key: item.id }))}
    </View>

      <Text style={styles.sectionTitle}>Latest News & Updates</Text>
      <FlatList
        data={newsUpdates}
        renderItem={renderNewsCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

    </View>
  );

};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flex: 1,
    backgroundColor: "#FFF"
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 15,
  },
  amenityContainer: {
    marginRight: 15,
    alignItems: 'center',
  },
  amenityImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  amenityText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  newsCard: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  newsImage: {
    width: '100%',
    height: 150,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    paddingBottom: 0,
  },
  newsSummary: {
    fontSize: 16,
    padding: 10,
    paddingTop: 5,
    color: '#666',
  },
  quickAccessButton: {
    alignItems: 'center',
    marginRight: 20,
  },
  quickAccessText: {
    marginTop: 5,
  },
  quickAccessContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  }, 
});

export default HomeScreen;
