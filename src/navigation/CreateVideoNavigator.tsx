import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateVideoScreen from '../screens/CreateVideoScreen';
import PostVideoScreen from '../screens/PostVideoScreen';
const Stack = createNativeStackNavigator();
const CreateVideoNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreateVideoScreen">
        <Stack.Screen
          name="CreateVideoScreen"
          component={CreateVideoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PostVideoScreen"
          component={PostVideoScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default CreateVideoNavigator