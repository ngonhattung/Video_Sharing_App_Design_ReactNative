import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import VideoWatchingScreen from "../screens/VideoWatchingScreen";
import VideoStreamingScreen from "../screens/VideoStreamingScreen";

const Stack = createNativeStackNavigator();
const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VideoWatchingScreen"
        component={VideoWatchingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VideoStreamingScreen"
        component={VideoStreamingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
