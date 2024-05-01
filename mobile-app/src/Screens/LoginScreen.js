import { StyleSheet, View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage'; 



export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [failMessage, setFailMessage] = useState("");
    const [userType, setUserType] = useState(''); 



    const handleLogin = async () => {
        setFailMessage("");

        // URL should be replaced with your actual backend endpoint
        const url = 'http://192.168.2.30:3000/login';
         // const url = 'https://estate-api-production.up.railway.app/login'; 
  
       
        try {
          const response = await fetch(url,  {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, role: userType}), 
          });
      
          const data = await response.json();
                
          if (response.ok) {
            await AsyncStorage.setItem('token', data.token);
            console.log('Login successful', data);
            setTimeout(() => {
                navigation.navigate('Main', { shouldFetchProfile: true }); 
              }, 500)
        } else {
            console.error('Login failed:', data.message);
            setFailMessage(data.message || 'An error occurred. Please try again.');}
        } catch (error) {
          console.error('Login error:', error);
          setFailMessage('An error occurred. Please try again.');}
      };
      
  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    enabled
>
    <View className="bg-white h-full w-full">
        <StatusBar style="dark" />
        <Image className="h-full w-full absolute" source={require('../../assets/background.png')} />

        {/* lights */}
        <View className="flex-row justify-around w-full absolute">
            <Animated.Image 
                entering={FadeInUp.delay(200).duration(1000).springify()} 
                source={require('../../assets/light.png')} 
                className="h-[225] w-[90]" 
            />
            <Animated.Image 
                entering={FadeInUp.delay(400).duration(1000).springify()} 
                source={require('../../assets/light.png')} 
                className="h-[160] w-[65] opacity-75" 
            />
        </View>

        {/* title and form */}
        <View className="h-full w-full flex justify-around pt-40 pb-10">
            
            {/* title */}
            <View className="flex items-center">
                <Animated.Text 
                    entering={FadeInUp.duration(1000).springify()} 
                    className="text-orange-900 font-bold tracking-wider text-5xl">
                        Login
                </Animated.Text>
            </View>

            <View style={styles.userTypeContainer}>
                        <TouchableOpacity
                            style={[styles.userTypeButton, userType === 'publicUser' && styles.selected]}
                            onPress={() => setUserType('publicUser')}
                        >
                            <Text style={styles.userTypeText}>Public User</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={[styles.userTypeButton, userType === 'company' && styles.selected]}
                            onPress={() => setUserType('company')}
                        >
                            <Text style={styles.userTypeText}>Company</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.userTypeButton, userType === 'employeeUser' && styles.selected]}
                            onPress={() => setUserType('employeeUser')}
                        >
                            <Text style={styles.userTypeText}>Employee</Text>
                        </TouchableOpacity>
                        </View>

            {failMessage && (
            <View style={{ alignItems: 'center', marginVertical: 10 }}>
            <Text style={{ color: 'red' }}>{failMessage}</Text>
            </View>
        )}

            {/* form */}
            <View className="flex items-center mx-5 space-y-4">
                <Animated.View 
                    entering={FadeInDown.duration(1000).springify()} 
                    className="bg-black/5 p-5 rounded-2xl w-full">

                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={'gray'}
                        value={email}
                        onChangeText={setEmail}
                    />
                </Animated.View>
                <Animated.View 
                    entering={FadeInDown.delay(200).duration(1000).springify()} 
                    className="bg-black/5 p-5 rounded-2xl w-full mb-3">

                    <TextInput
                        placeholder="Password"
                        placeholderTextColor={'gray'}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </Animated.View>

                <Animated.View 
                    className="w-full" 
                    entering={FadeInDown.delay(400).duration(1000).springify()}>

                    <TouchableOpacity 
                    onPress={handleLogin}
                    className="w-full bg-orange-900 p-3 rounded-2xl mb-3">
                        <Text className="text-xl font-bold text-white text-center">Login</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View 
                    entering={FadeInDown.delay(600).duration(1000).springify()} 
                    className="flex-row justify-center">

                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={()=> navigation.push('Signup')}>
                        <Text className="text-sky-600">SignUp</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', 
    },
    overlay: {
        ...StyleSheet.absoluteFillObject, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', 
    },
    lottie: {
        width: 150,
        height: 150, 
    },

    successText: {
        marginTop: 20, 
        fontSize: 18,
        color: 'green', 
        textAlign: 'center',
    }, 
    userTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
      },
      userTypeButton: {
        backgroundColor: '#e0e0e0',
        padding: 10,
        marginHorizontal: 5,
      },
      selected: {
        backgroundColor: '#8b4513',
      },
      userTypeText: {
        color: 'white',
      },
}); 



// appTest@example.com
// test123456