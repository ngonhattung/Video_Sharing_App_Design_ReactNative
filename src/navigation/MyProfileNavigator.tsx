import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyProfileScreen from '../screens/MyProfileScreen'
import FollowScreen from '../screens/FollowScreen';
import ProfileDetailScreen from '../screens/ProfileDetailScreen';
import VideoWatchingScreen from '../screens/VideoWatchingScreen';

const Stack = createNativeStackNavigator();
const MyProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MyProfileScreen">
      <Stack.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FollowScreen"
        component={FollowScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileDetailScreen"
        component={ProfileDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VideoWatchingScreen"
        component={VideoWatchingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default MyProfileNavigator