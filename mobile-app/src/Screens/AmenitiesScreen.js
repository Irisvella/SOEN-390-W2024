import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get("screen");

const AmenitiesScreen = () => {
 
  const route = useRoute();
  const navigation = useNavigation();
  const propertyId = route.params?.propertyId || 1;
  const [amenities, setAmenities] = useState([]); 

  const amenitiesMapping = {
    gym: {
      image: require("../../assets/gym.png"),
      text: "Gym",
      navigationRoute: "BookGym",
    },
    skylounge: {
      image: require("../../assets/sky_lounge.png"), 
      text: "Sky Lounge",
      navigationRoute: "BookLounge",
    },
    pool: {
      image: require("../../assets/pool.png"),
      text: "Pool",
      navigationRoute: "BookPool",
    },
    sauna: {
      image: require("../../assets/sauna.png"),
      text: "Sauna",
      navigationRoute: "BookSauna",
    },
    massageRoom: {
      image: require("../../assets/massage.png"),
      text: "Massage Room",
      navigationRoute: "BookMassage",
    },
    conferenceRoom: {
      image: require("../../assets/conference.png"),
      text: "Conference Room",
      navigationRoute: "BookConference",
    },
    partyRoom: {
      image: require("../../assets/party.png"),
      text: "Party Room",
      navigationRoute: "BookParty",
    },
  };
  

  useEffect(() => {
    const fetchAmenities = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.navigate("Login");
        return;
      }
      try {
        const response = await fetch(
          `https://estate-api-production.up.railway.app/makeReservation/${propertyId}`, 
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setAmenities(data);
        } else {
          console.error("Failed to fetch amenities");
        }
      } catch (error) {
        console.error("Error fetching amenities:", error);
      }
    };
  
    fetchAmenities();
  }, [navigation, propertyId]);


  if (amenities.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Text>No available amenities</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {amenities.map((amenity) => {
        const amenityInfo = amenitiesMapping[amenity.text_id];
        

        return (
          <View key={amenity.id} style={styles.mediaImageContainer}>
            <Image source={amenityInfo.image} style={styles.image} resizeMode="cover"></Image>
            <View style={styles.textBackground}>  
              <Text style={styles.text}>{amenityInfo.text}</Text>
            </View>
            <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate(amenityInfo.navigationRoute, { amenityId: amenity.id, propertyId: propertyId })}>
              <Ionicons name="add-circle" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#FFF"
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 20,
    backgroundColor: "#FFF"
  },
  mediaImageContainer: {
    width: width - 20, 
    height: width - 150,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    position: 'relative', 
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bookButton: {
    position: 'absolute',
    right: 10, 
    bottom: 10, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    borderRadius: 25,
    padding: 8,
    zIndex: 1, 
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
    zIndex: 2, 
  },
  textBackground: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)', 
    borderRadius: 5, 
    paddingVertical: 20, 
    paddingHorizontal: 30,
    zIndex: 2, 
  },
  textBackgroundLong: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)', 
    borderRadius: 5, 
    paddingVertical: 20, 
    paddingHorizontal: 62,
    zIndex: 2, 
  },
  textBackgroundLong2: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)', 
    borderRadius: 5, 
    paddingVertical: 20, 
    paddingHorizontal: 90,
    zIndex: 2, 
  },
  textBackgroundLong3: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)', 
    borderRadius: 5, 
    paddingVertical: 20, 
    paddingHorizontal: 78,
    zIndex: 2, 
  },
  textBackgroundSauna: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)', 
    borderRadius: 5, 
    paddingVertical: 20, 
    paddingHorizontal: 38,
    zIndex: 2, 
  },
});

export default AmenitiesScreen;
