import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, FlatList, Modal, Button } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
  }).format(date);
};


const HomeScreen = ({ navigation }) => {

  const [user, setUser] = useState(''); 
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [hasUnseenNotifications, setHasUnseenNotifications] = useState(false);



  const newsUpdates = [
    { id: '1', title: 'Summer Pool Party', summary: 'Join us for a summer pool party this Saturday!', image: require('../../assets/pool.png') },
    { id: '2', title: 'Gym Renovation', summary: 'Our gym is getting an upgrade. Check out the new equipment!', image: require('../../assets/gym.png') },
  ];

  const quickAccess = [
    { id: '1', name: 'View Bookings', icon: 'calendar-alt', iconSet: 'FontAwesome5', screen: 'ViewBookings', onPress: () => navigation.navigate('ViewBookings')},
    { id: '2', name: 'My Bills', icon: 'dollar-sign', iconSet: 'FontAwesome5', screen: 'MyBills', onPress: () => navigation.navigate('MyBills')}, 
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
      case 'My Bills':
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
      

     const url = 'https://estate-api-production.up.railway.app/profile';
     // const url = 'http://192.168.2.30:3000/profile'; 
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

useEffect(() => {
  fetchNotifications();
}, []);

const fetchNotifications = async () => {
  setLoading(true);
  const token = await AsyncStorage.getItem('token');
  if (!token) {
    alert('You must be logged in to see notifications');
    return;
  }
  try {
    const response = await fetch('https://estate-api-production.up.railway.app/notifications', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.ok) {
      setNotifications(data.data.notifications);
      const unseenExists = data.data.notifications.some(notif => !notif.seen);
      setHasUnseenNotifications(unseenExists);
    } else {
      throw new Error(data.message || 'Unable to fetch notifications');
    }
  } catch (error) {
    console.error('Error fetching notifications:', error);
    alert('Failed to load notifications');
  } finally {
    setLoading(false);
  }
};

const markAllNotificationsAsSeen = async () => {
  const token = await AsyncStorage.getItem('token');
  fetch('https://estate-api-production.up.railway.app/notifications/mark-all-seen', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('All notifications marked as seen:', data);
  })
  .catch(error => console.error('Error marking all notifications as seen:', error));
};


const toggleModal = () => {
  setModalVisible(!modalVisible);
};

const handleCloseModal = async () => {
  await markAllNotificationsAsSeen();  
  fetchNotifications();
  toggleModal();
};

const renderNotification = ({ item }) => {
  const notificationDate = formatDate(item.inserted_at);
  return (
    <View style={styles.notificationItem}>
      <Text style={[styles.notificationTitle, item.seen ? styles.seen : styles.unseen]}>
        {item.title}
      </Text>
      <Text style={[styles.notificationStatus, item.status === 'unassigned' ? styles.statusUnassigned : styles.statusAssigned]}>
        {item.status}
      </Text>
      <Text style={styles.notificationDate}>{notificationDate}</Text>
    </View>
  );
};



  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}> {user} 
      <TouchableOpacity onPress={toggleModal}>
        <MaterialIcons
          name={hasUnseenNotifications ? "notifications-active" : "notifications"}
          size={24}
          color="#000"
          marginLeft={70}
        />
      </TouchableOpacity> </Text> 
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Notifications</Text>
            {loading ? <Text>Loading...</Text> : (
              <FlatList
              data={notifications}
              keyExtractor={item => item.id.toString()}
              renderItem={renderNotification}
              showsVerticalScrollIndicator={false}
            />
            )}
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginLeft: '25%',
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
    padding: 10,
  },
  quickAccessText: {
    marginTop: 15,
  },
  quickAccessContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  }, 
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: '60%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationStatus: {
    fontSize: 14,
    color: '#555',
  },
  notificationDate: {
    fontSize: 12,
    color: '#999',
  },
  seen: {
    color: '#ccc',  
  },
  unseen: {
    color: '#333', 
  },
  statusUnassigned: {
    color: 'red',  
  },
  statusAssigned: {
    color: 'green',  
  },
  closeButton: {
    backgroundColor: '#00adf5', 
    padding: 10,
    borderRadius: 5, 
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  }
});

export default HomeScreen;
