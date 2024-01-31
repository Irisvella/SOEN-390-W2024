import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import { AntDesign } from '@expo/vector-icons';
import { Input } from '@rneui/themed';
import { Button } from '@rneui/base';

export default function SignupScreen() {
  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <StatusBar style="auto" />
      <SafeAreaView style={tw`flex-1 relative`}>
        <Image
          source={require("../assets/cloud.png")}
          style={tw`absolute bottom-0`}
          resizeMode="contain" // Ensure the image fits properly without stretching
        />

        <View style={tw`w-full px-4 z-50`}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={tw`h-12 w-12 bg-gray-200 rounded-full items-center justify-center`}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>

          <Text style={tw`text-4xl font-medium mt-16`}>Welcome Back</Text>
          <Text style={tw`text-lg text-gray-700 mt-2`}>
            Enter Your Information
          </Text>

          <Input
            containerStyle={tw`w-full my-4`}
            inputContainerStyle={tw`py-2`}
            placeholder="Email"
            keyboardType="email-address" // Correct keyboard type for email
            autoCapitalize="none" // Prevent auto-capitalization of email
          />
          <Input
            containerStyle={tw`w-full my-2`}
            inputContainerStyle={tw`py-2`}
            placeholder="Username"
            autoCapitalize="none"
          />
          <Input
            containerStyle={tw`w-full my-2`}
            inputContainerStyle={tw`py-2`}
            placeholder="Phone Number"
            keyboardType="phone-pad" // Correct keyboard type for phone number
          />
          <Input
            containerStyle={tw`w-full my-2`}
            inputContainerStyle={tw`py-2`}
            placeholder="Password"
            secureTextEntry={true} // Only for the password field
          />

          <Button
            title="LOGIN"
            buttonStyle={{
              backgroundColor: 'black', // Use a style object for the button style
              borderRadius: 50, // This will create a fully rounded button
              paddingVertical: 12,
              width: 240, // Adjust the width as needed
              marginTop: 16,
            }}
            titleStyle={{ color: 'white' }}
          />

          <Text style={tw`text-gray-600 mt-4`}>Forgotten Password</Text>
          <Text style={tw`text-gray-600 mt-4`}>Or Create a New Account</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
