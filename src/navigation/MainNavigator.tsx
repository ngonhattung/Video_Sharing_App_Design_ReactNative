import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from './HomeNavigator';
import SearchNavigator from './SearchNavigator';
import CreateVideoNavigator from './CreateVideoNavigator';
import FriendScreen from '../screens/FriendScreen';
import MyProfileNavigator from './MyProfileNavigator';
const Tab = createBottomTabNavigator();
const MainNavigator = () => {
  return (
    <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Search" component={SearchNavigator} />
      <Tab.Screen name="Create" component={CreateVideoNavigator} />
      <Tab.Screen name="Friend" component={FriendScreen} />
      <Tab.Screen name="Profile" component={MyProfileNavigator} />
    </Tab.Navigator>
  </NavigationContainer>
  )
}

export default MainNavigator