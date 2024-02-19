import { StyleSheet, View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, Pressable, KeyboardAvoidingView, Platform } from 'react-native'
import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';


export default function SignupScreen() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [successAnimation, setSuccessAnimation] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");
    const [failMessage, setFailMessage] = useState("");

    const handleSignup = async () => {
        setSuccessMessage("");
        setFailMessage("");

        // URL should be replaced with your actual backend endpoint
        const url = 'http://192.168.2.13:3000/signup/public-user';
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              email,
              password,
              phone
            }),
          });
      
          const data = await response.json();
      
          if (response.ok) {
            console.log('Signup successful', data);
            setSuccessMessage("Signup successful! You can now login.");     
            setSuccessAnimation(true);
  
            setTimeout(() => {
              setSuccessAnimation(false); 
              navigation.navigate('Login'); 
            }, 2000)
          } else {
            console.error('Signup failed:', data.message);
            setFailMessage(data.message);}
        } catch (error) {
          console.error('Signup error:', error);
          setFailMessage("Signup failed. Please try again.");}
      };
      

  return (
     <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <StatusBar style="dark" />

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
      <View  className="h-full w-full flex justify-around pt-48">
        
        {/* title */}
        <View className="flex items-center">
            <Animated.Text 
                entering={FadeInUp.duration(1000).springify()} 
                className="text-orange-900 font-bold tracking-wider text-5xl">
                    Sign Up
            </Animated.Text>
        </View>

        {failMessage && (
            <View style={{ alignItems: 'center', marginVertical: 10 }}>
            <Text style={{ color: 'red' }}>{failMessage}</Text>
            </View>
        )}


        {/* form */}

        {successAnimation && (
                <View style={styles.overlay}>
                    <LottieView
                        source={require('../../assets/Success-animation.json')}
                        autoPlay
                        loop={false}
                        onAnimationFinish={() => setSuccessAnimation(false)}
                     style={styles.lottie}
                    />
                    <Text style={styles.successText}>{successMessage}</Text>
                </View>
                )}

        <View className="flex items-center mx-5 space-y-4">
            <Animated.View 
                entering={FadeInDown.duration(1000).springify()} 
                className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput
                    placeholder="Username"
                    placeholderTextColor={'gray'}
                    value={username}
                    onChangeText={setUsername}
                />
            </Animated.View>
            <Animated.View 
                entering={FadeInDown.delay(200).duration(1000).springify()} 
                className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={'gray'}
                    value={email}
                    onChangeText={setEmail}
                />
            </Animated.View>
            <Animated.View 
                entering={FadeInDown.delay(400).duration(1000).springify()} 
                className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput
                    placeholder="Phone Number"
                    placeholderTextColor={'gray'}
                    secureTextEntry
                    value={phone}
                    onChangeText={setPhone}
                />
            </Animated.View>
            <Animated.View 
                entering={FadeInDown.delay(600).duration(1000).springify()} 
                className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                <TextInput
                    placeholder="Password"
                    placeholderTextColor={'gray'}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </Animated.View>

            <Animated.View className="w-full" entering={FadeInDown.delay(600).duration(1000).springify()}>
                <TouchableOpacity 
                onPress={handleSignup}
                className="w-full bg-orange-900 p-3 rounded-2xl mb-3">
                    <Text className="text-xl font-bold text-white text-center">SignUp</Text>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View 
                entering={FadeInDown.delay(800).duration(1000).springify()} 
                className="flex-row justify-center">

                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={()=> navigation.push('Login')}>
                    <Text className="text-sky-600">Login</Text>
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
    }
});