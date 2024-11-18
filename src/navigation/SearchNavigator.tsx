import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchVideoScreen from "../screens/SearchVideoScreen";
import VideoWatchingScreen from "../screens/VideoWatchingScreen";
import ProfileDetailScreen from "../screens/ProfileDetailScreen";
import VideoStreamingScreen from "../screens/VideoStreamingScreen";
const Stack = createNativeStackNavigator();
const SearchNavigator = () => {
  return (
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
      <Stack.Screen
        name="VideoStreamingScreen"
        component={VideoStreamingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileDetailScreen"
        component={ProfileDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
