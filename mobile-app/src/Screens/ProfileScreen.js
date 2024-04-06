import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import * as ImagePicker from 'expo-image-picker';






export default function App() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [userRole, setUserRole] = useState(''); 
    const [companyName, setCompanyName] = useState(''); 
    const [profileImage, setProfileImage] = useState(null); // will use when we implement image upload with backend endpoint

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        setUsername('');
        setPhone('');
        setShowDropdown(false);
        navigation.reset({
            index: 0,
            routes: [{ name: 'Auth', state: { routes: [{ name: 'Login' }] } }],
        });
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
                    setUserRole('publicUser');
                    setUsername('Hi, ' + data.firstName);
                    setPhone(data.phoneNumber);
                    setProfileImage(data.avatar);
                } else if (data.role === 'company') {
                    setUserRole('company');
                    setCompanyName(data.companyName);
                    setPhone(data.phone);
                }
            } else {
                console.error('Failed to fetch profile:', data.message);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

      
    const uploadImage = async (imageUri) => {

        console.log("now in upload" + imageUri); 
        const storedToken = await AsyncStorage.getItem('token');
        const url = 'http://192.168.2.13:3000/profile/public-user';
    
        let formData = new FormData();
        formData.append('isUpload', '1'); 
    
        
        let uriParts = imageUri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        console.log('fileType:', fileType); 
        formData.append('avatar', {
            uri: imageUri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`, 
        });
    
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${storedToken}`,
                },
                body: formData,
            });
    
            const data = await response.json();
            if (response.ok) {
                console.log('Upload successful', data);
                fetchUserProfile();
            } else {
                console.error('Upload failed', data.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error uploading image', error);
        }
    };
    

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        console.log(result);
      
        if (!result.cancelled && result.assets && result.assets.length > 0) {
            const imageUri = result.assets[0].uri;
            console.log(imageUri);
            uploadImage(imageUri);
            fetchUserProfile();
          }
      };

      useEffect(() => {
        const fetchOnNavigate = navigation.addListener('focus', () => {
          fetchUserProfile();
        });
      

        return fetchOnNavigate;
      }, [navigation]);
      

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={true}>
                <View style={styles.titleBar}>
                <StatusBar style="dark" />
                <TouchableOpacity  onPress={() => setShowDropdown(!showDropdown)} style={styles.dropdownIcon}>
                    <MaterialIcons name="more-horiz" size={26} color="#52575D"></MaterialIcons>
                </TouchableOpacity>
                </View>

               
            {showDropdown && (
                <View style={styles.dropdown}>
                      <TouchableOpacity
                      onPress={pickImage}
                        style={styles.dropdownItem}
                    >
                        <Text style={styles.dropdownItemText}>Edit picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddActivationCode')}
                        style={styles.dropdownItem}
                    >
                        <Text style={styles.dropdownItemText}>Add Condo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleLogout}
                        style={styles.dropdownItem}
                    >
                        <Text style={styles.dropdownItemText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
    


                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={require("../../assets/avatar.png") } style={styles.image} resizeMode="center"></Image>
                    </View>
                </View>

                    <View style={styles.infoContainer}>
                    {userRole === 'publicUser' ? (
                        <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
                        {username ? username : 'User'}
                        </Text>
                    ) : (
                        <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
                        {companyName ? companyName : 'Company'}
                        </Text>
                    )}
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
                        {phone ? phone : '(XXX)-XXX-XXXX'}
                    </Text>
                    </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>32</Text>
                        <Text style={[styles.text, styles.subText]}>Parking #</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>4503</Text>
                        <Text style={[styles.text, styles.subText]}>Condo Unit # </Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>252</Text>
                        <Text style={[styles.text, styles.subText]}>Storage #</Text>
                        {/* // or we can put lease end date etc..  */}
                    </View>
                </View>
            
                <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {/* We can insert condo plans here */}
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../../assets/condo.png")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../../assets/condo.png")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../../assets/condo.png")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                    </ScrollView>
                </View>

                <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
                <View style={{ alignItems: "center" }}>
                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Rent is Due in <Text style={{ fontWeight: "400" }}> 5 days</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                A/C service request now marked as <Text style={{ fontWeight: "400" }}>completed</Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    dropdown: {
        marginTop: 60,
        backgroundColor: '#f9f9f9',
        borderColor: '#ccc',
        borderWidth: 1,
        width: 100,
        alignSelf: 'flex-end',
        position: 'absolute',
    },
    dropdownItem: {
        padding: 10,
    },
    dropdownItemText: {
        textAlign: 'center',
    },
    dropdownIcon: {
        marginLeft: 310, 

    },
});