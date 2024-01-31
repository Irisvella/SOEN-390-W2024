import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import tw from "twrnc"
import { AntDesign } from '@expo/vector-icons';
import { Input } from '@rneui/themed';
import { Button } from '@rneui/base';

export default function SignupScreen() {
  return (
    <View style={tw`flex-1 bg-gray-100`} >
      <StatusBar style="auto" />
      <SafeAreaView style={tw`flex-1 relative`} >

        <Image
          source={require("../assets/cloud.png")}
          style={ tw`absolute bottom-0`}
        />

        <View style={tw`w-full h-full z-50`} >

          <View style={tw`w-full h-[4rem] px-4`} >
            <TouchableOpacity activeOpacity={.7} style={tw `h-[3rem] w-[3rem] bg-gray-200 rounded-full items-center justify-center`} >
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={tw`w-full mt-[4rem] px-4`} >
            <Text style={tw`text-[2.5rem] font-medium`}>
              Welcome Back
            </Text>
            <Text style={tw`text-[1.1rem] text-gray-700`}>
              Enter Your Username & Password
            </Text>
          </View>

          <View style={tw`w-full mt-[6rem] px-4`} >
            <Input 
              containerStyle={tw`w-full my-4`}
              inputContainerStyle={tw`py-2`}
              placeholder='Username'
              keyboardType='default'
            />

            <Input 
              containerStyle={tw`w-full my-4`}
              inputContainerStyle={tw`py-2`}
              placeholder='Password'
              keyboardType='default'
              secureTextEntry={true}
            />
          </View>

          <View style={tw`w-full items-center`} >
              <Button 
                title={"LOGIN"}
                buttonStyle={tw`rounded-100 py-3 w-[15rem] mt-4 bg-black text-white`}
              />

            <Text style={tw`mt-4 text-gray-600`} >Forgotten Password</Text>
            <Text style={tw`mt-4 text-gray-600`} >Or Create a New Account</Text>

          </View>

        </View>

      </SafeAreaView>
    </View>
  );
}


