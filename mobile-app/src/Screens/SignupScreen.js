import { StyleSheet, View, Text, Image, SafeAreaView, TextInput, TouchableOpacity, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { MaterialIcons } from "@expo/vector-icons";
import LottieView from 'lottie-react-native';



export default function SignupScreen() {
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [successAnimation, setSuccessAnimation] = useState(false);
    const [userType, setUserType] = useState('publicUser'); 
    const[companyName, setCompanyName] = useState('');
    const [country, setCountry] = useState('Canada'); // Default to Canada
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [streetName, setStreetName] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [apartmentNumber, setApartmentNumber] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [successMessage, setSuccessMessage] = useState("");
    const [failMessage, setFailMessage] = useState("");

    const handleSignup = async () => {
        setSuccessMessage("");
        setFailMessage("");

        // URL should be replaced with your actual backend endpoint
        const url = userType === 'publicUser' ?
        'http://192.168.2.13:3000/signup/public-user' :
        'http://192.168.2.13:3000/signup/management-company';        //  OR const url = ' http://localhost:3000/signup/public-user'; 

 if (userType === 'publicUser') {     
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email, 
              password, 
              firstName, 
              lastName, 
              phoneNumber: phone,
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
      } else {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email, 
                    password, 
                    companyName, 
                    phoneNumber: phone,
                    country, 
                    province,
                    city,
                    streetName,
                    postalCode,
                    apartmentNumber,
                
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
    };

        

//   return (
//      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
//             <StatusBar style="dark" />

//     <View className="bg-white h-full w-full">
//       <StatusBar style="dark" />
//       <Image className="h-full w-full absolute" source={require('../../assets/background.png')} />

//       {/* lights */}
//       <View className="flex-row justify-around w-full absolute">
//         <Animated.Image 
//             entering={FadeInUp.delay(200).duration(1000).springify()} 
//             source={require('../../assets/light.png')} 
//             className="h-[225] w-[90]"
//         />
//         <Animated.Image 
//             entering={FadeInUp.delay(400).duration(1000).springify()} 
//             source={require('../../assets/light.png')} 
//             className="h-[160] w-[65] opacity-75" 
//         />
//       </View>

//       {/* title and form */}
//       <View  className="h-full w-full flex justify-around pt-48">
        
//         {/* title */}
//         <View className="flex items-center">
//             <Animated.Text 
//                 entering={FadeInUp.duration(1000).springify()} 
//                 className="text-orange-900 font-bold tracking-wider text-5xl">
//                     Sign Up
//             </Animated.Text>
//              </View>
//                                 <View style={styles.userTypeContainer}>
//                         <TouchableOpacity
//                             style={[styles.userTypeButton, userType === 'publicUser' && styles.selected]}
//                             onPress={() => setUserType('publicUser')}
//                         >
//                             <Text style={styles.userTypeText}>Public User</Text>
//                         </TouchableOpacity>
                        
//                         <TouchableOpacity
//                             style={[styles.userTypeButton, userType === 'company' && styles.selected]}
//                             onPress={() => setUserType('company')}
//                         >
//                             <Text style={styles.userTypeText}>Company</Text>
//                         </TouchableOpacity>
//                         </View>


        // {failMessage && (
        //     <View style={{ alignItems: 'center', marginVertical: 10 }}>
        //     <Text style={{ color: 'red' }}>{failMessage}</Text>
        //     </View>
        // )}

        // {successAnimation && (
        //         <View style={styles.overlay}>
        //             <LottieView
        //                 source={require('../../assets/Success-animation.json')}
        //                 autoPlay
        //                 loop={false}
        //                 onAnimationFinish={() => setSuccessAnimation(false)}
        //              style={styles.lottie}
        //             />
        //             <Text style={styles.successText}>{successMessage}</Text>
        //         </View>
        //         )}

//         <View className="flex items-center mx-5 space-y-4">
//         {userType === 'company' && (
//   <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
//     <TextInput
//       placeholder="Company Name"
//       placeholderTextColor={'gray'}
//      value={companyName}
//     onChangeText={setCompanyName}
// />
//   </Animated.View>
// )}
//             <Animated.View 
//                 entering={FadeInDown.duration(1000).springify()} 
//                 className="bg-black/5 p-5 rounded-2xl w-full">
//                  {userType === 'publicUser' ? (
//                 <TextInput
//                 placeholder="First Name"
//                 placeholderTextColor={'gray'}
//                 value={firstName}
//                 onChangeText={setFirstName}
//                 />
//             ) : (
//                 <TextInput
//                 placeholder="Address"
//                 placeholderTextColor={'gray'}
//                 value={companyAddress} 
//                 onChangeText={setCompanyAddress} 
//                 />
//             )}
//             </Animated.View>
//             <Animated.View 
//                 entering={FadeInDown.delay(200).duration(1000).springify()} 
//                 className="bg-black/5 p-5 rounded-2xl w-full">
//                 <TextInput
//                     placeholder="Last Name"
//                     placeholderTextColor={'gray'}
//                     value={lastName}
//                     onChangeText={setLastName}
//                 />
//             </Animated.View>
//             <Animated.View 
//                 entering={FadeInDown.delay(200).duration(1000).springify()} 
//                 className="bg-black/5 p-5 rounded-2xl w-full">
//                 <TextInput
//                     placeholder="Email"
//                     placeholderTextColor={'gray'}
//                     value={email}
//                     onChangeText={setEmail}
//                 />
//             </Animated.View>
//             <Animated.View 
//                 entering={FadeInDown.delay(400).duration(1000).springify()} 
//                 className="bg-black/5 p-5 rounded-2xl w-full">
//                 <TextInput
//                     placeholder="Phone Number"
//                     placeholderTextColor={'gray'}
//                     value={phone}
//                     onChangeText={setPhone}
//                 />
//             </Animated.View>
//             <Animated.View 
//                 entering={FadeInDown.delay(600).duration(1000).springify()} 
//                 className="bg-black/5 p-5 rounded-2xl w-full mb-3">
//                 <TextInput
//                     placeholder="Password"
//                     placeholderTextColor={'gray'}
//                     secureTextEntry
//                     value={password}
//                     onChangeText={setPassword}
//                 />
//             </Animated.View>

//             <Animated.View className="w-full" entering={FadeInDown.delay(600).duration(1000).springify()}>
//                 <TouchableOpacity 
//                 onPress={handleSignup}
//                 className="w-full bg-orange-900 p-3 rounded-2xl mb-3">
//                     <Text className="text-xl font-bold text-white text-center">SignUp</Text>
//                 </TouchableOpacity>
//             </Animated.View>

            // <Animated.View 
            //     entering={FadeInDown.delay(800).duration(1000).springify()} 
            //     className="flex-row justify-center">

            //     <Text>Already have an account? </Text>
            //     <TouchableOpacity onPress={()=> navigation.push('Login')}>
            //         <Text className="text-sky-600">Login</Text>
            //     </TouchableOpacity>

            // </Animated.View>
//         </View>
//       </View>
//     </View>
//     </KeyboardAvoidingView>
//   )




const nextStep = () => {
    if (currentStep >= 3) {
      handleSignup(); 
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };


  const renderStepContent = (step) => {
    switch (userType) {
        case 'publicUser':
        switch (step) {
        case 1:
            return (
            

                <>
                <View className="flex items-center">
                    <Animated.Text
                        entering={FadeInUp.duration(1000).springify()}
                        className="text-orange-900 font-bold tracking-wider text-5xl">
                        Sign Up
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
                            </View>
                            <View style={styles.stepContainer}>
                        <TextInput placeholder="First Name" value={firstName} onChangeText={setFirstName} style={styles.input} />
                        <TextInput placeholder="Last Name" value={lastName} onChangeText={setLastName} style={styles.input} />
                        <TouchableOpacity onPress={nextStep} className="w-full bg-orange-900 p-2 rounded-2xl mb-3"><Text className="text-xl font-bold text-white text-center">Next</Text></TouchableOpacity>
                    </View></>
            );
        case 2:
            return (
                <><View className="flex items-center">
                    <Animated.Text
                        entering={FadeInUp.duration(1000).springify()}
                        className="text-orange-900 font-bold tracking-wider text-2xl">
                        Enter email and password  
                    </Animated.Text>
                </View><View style={styles.stepContainer}>
                        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
                        <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
                        <TouchableOpacity onPress={nextStep} className="w-full bg-orange-900 p-2 rounded-2xl mb-3"><Text className="text-xl font-bold text-white text-center">Next</Text></TouchableOpacity>
                        <TouchableOpacity onPress={prevStep} className=" bg-orange-900 p-2 rounded-2xl mb-3"><Text className="text-xl font-bold text-white text-center">Back</Text></TouchableOpacity>
                    </View></>
            );
        case 3:
            return (
                <><TouchableOpacity onPress={prevStep}>
                    <MaterialIcons name="arrow-back-ios" size={26} color="#52575D" />
                </TouchableOpacity><>
                <View className="flex items-center">
                    <Animated.Text
                        entering={FadeInUp.duration(1000).springify()}
                        className="text-orange-900 font-bold tracking-wider text-2xl">
                        Enter phone number
                    </Animated.Text>
                </View><View style={styles.stepContainer}>
                            <TextInput placeholder="Phone Number" value={phone} onChangeText={setPhone} style={styles.input} />
                            <TouchableOpacity onPress={nextStep} className="w-full bg-orange-900 p-2 rounded-2xl mb-3"><Text className="text-xl font-bold text-white text-center">SignUp!</Text></TouchableOpacity>
                        </View></></>
                    
            );
        default:
            return null;
        }
        case 'company':
            switch (step) {
                case 1:
                    return (
                        <><View className="flex items-center">
                            <Animated.Text
                                entering={FadeInUp.duration(1000).springify()}
                                className="text-orange-900 font-bold tracking-wider text-5xl">
                                Sign Up
                            </Animated.Text>
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
                                </View>
                        </View><View style={styles.stepContainer}>
                                <TextInput placeholder="Company Name" value={companyName} onChangeText={setCompanyName} style={styles.input} />
                                <TextInput placeholder="Phone Number" value={phone} onChangeText={setPhone} style={styles.input} />
                                <TouchableOpacity onPress={nextStep} className="w-full bg-orange-900 p-2 rounded-2xl mb-3"><Text className="text-xl font-bold text-white text-center">Next</Text></TouchableOpacity>
                        </View></> 
                    );
                case 2:
                    return (
                        <><View className="flex items-center">
                            <Animated.Text
                                entering={FadeInUp.duration(1000).springify()}
                                className="text-orange-900 font-bold tracking-wider text-2xl">
                                Enter Address 
                            </Animated.Text>
                        </View><View style={styles.stepContainer}>
                                <TextInput placeholder="Street" value={streetName} onChangeText={setStreetName} style={styles.input} />
                                <TextInput placeholder="Apartment Number" value={apartmentNumber} onChangeText={setApartmentNumber} style={styles.input} />
                                <TextInput placeholder="City" value={city} onChangeText={setCity} style={styles.input} />
                                <TextInput placeholder="Province" value={province} onChangeText={setProvince} style={styles.input} />
                                <TextInput placeholder="Country" value={country} onChangeText={setCountry} style={styles.input} />
                                <TextInput placeholder="Postal Code" value={postalCode} onChangeText={setPostalCode} style={styles.input} />
                                <TouchableOpacity onPress={nextStep} className="w-full bg-orange-900 p-2 rounded-2xl mb-3"><Text className="text-xl font-bold text-white text-center">Next</Text></TouchableOpacity>
                                <TouchableOpacity onPress={prevStep} className="w-full bg-orange-900 p-2 rounded-2xl mb-3"><Text className="text-xl font-bold text-white text-center">Back</Text></TouchableOpacity>
                        </View></>
                    );
                case 3:
                    return (
                        <><TouchableOpacity onPress={prevStep}>
                            <MaterialIcons name="arrow-back-ios" size={26} color="#52575D" />
                        </TouchableOpacity><><View className="flex items-center">
                            <Animated.Text
                                entering={FadeInUp.duration(1000).springify()}
                                className="text-orange-900 font-bold tracking-wider text-2xl">
                                Enter email and password
                            </Animated.Text>
                        </View><View style={styles.stepContainer}>
                                    <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
                                    <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
                                    <TouchableOpacity onPress={nextStep} className="w-full bg-orange-900 p-2 rounded-2xl mb-3"><Text className="text-xl font-bold text-white text-center">SignUp!</Text></TouchableOpacity>
                                </View></></>
                    );
            }
        
        }
    };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {renderStepContent(currentStep)}

        {failMessage && (
                    <View style={{ alignItems: 'center', marginVertical: 10 }}>
                    <Text style={{ color: 'red' }}>{failMessage}</Text>
                    </View>
                )}
        
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

                <Animated.View 
                    entering={FadeInDown.delay(800).duration(1000).springify()} 
                    className="flex-row justify-center">

                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={()=> navigation.push('Login')}>
                        <Text className="text-sky-600">Login</Text>
                    </TouchableOpacity>

                </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};







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
      container: {
        flex: 1,
      },
      scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
      },
      stepContainer: {
        padding: 10,
      },
      input: {
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
      }
      
    });