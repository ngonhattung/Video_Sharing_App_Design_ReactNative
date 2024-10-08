import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SearchVideoScreen from '../screens/SearchVideoScreen';
import VideoWatchingScreen from '../screens/VideoWatchingScreen';
const Stack = createNativeStackNavigator();
const SearchNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SearchVideoScreen">
        <Stack.Screen
          name="SearchVideoScreen"
          component={SearchVideoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VideoWatchingScreen"
          component={VideoWatchingScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default SearchNavigator