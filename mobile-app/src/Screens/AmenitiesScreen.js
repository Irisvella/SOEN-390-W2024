import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get("screen");

const AmenitiesScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.mediaImageContainer}>
            <Image source={require("../../assets/pool.png")} style={styles.image} resizeMode="cover"></Image>
               <View style={styles.textBackground}>
               <Text style={styles.text}>Pool</Text>
               </View>
            <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('BookPool')}>
                <Ionicons name="add-circle" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
        <View style={styles.mediaImageContainer}>
            <Image source={require("../../assets/gym.png")} style={styles.image} resizeMode="cover"></Image>
            <View style={styles.textBackground}>
            <Text style={styles.text}>Gym</Text>
            </View> 
              <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('BookGym')}>
                <Ionicons name="add-circle" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
        <View style={styles.mediaImageContainer}>
            <Image source={require("../../assets/sauna.png")} style={styles.image} resizeMode="cover"></Image>
            <View style={styles.textBackgroundSauna}>  
            <Text style={styles.text}>Sauna</Text>
            </View>
              <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('BookSauna')}>
                <Ionicons name="add-circle" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
        <View style={styles.mediaImageContainer}>
            <Image source={require("../../assets/massage.png")} style={styles.image} resizeMode="cover"></Image>
            <View style={styles.textBackgroundLong3}>
            <Text style={styles.text}>Massage Room</Text>
            </View>
              <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('BookMassage')}>
                <Ionicons name="add-circle" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
        <View style={styles.mediaImageContainer}>
            <Image source={require("../../assets/conference.png")} style={styles.image} resizeMode="cover"></Image>
            <View style={styles.textBackgroundLong2}>
            <Text style={styles.text}>Conference Room</Text>
            </View>
              <TouchableOpacity style={styles.bookButton}  onPress={() => navigation.navigate('BookConference')}>
                <Ionicons name="add-circle" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
        <View style={styles.mediaImageContainer}>
            <Image source={require("../../assets/party.png")} style={styles.image} resizeMode="cover"></Image>
            <View style={styles.textBackgroundLong}>
            <Text style={styles.text}>Party Room</Text>
            </View>
              <TouchableOpacity style={styles.bookButton}  onPress={() => navigation.navigate('BookParty')}>
                <Ionicons name="add-circle" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
        {/* Add more amenities as needed */}
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
