import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import SearchNavigator from "./SearchNavigator";
import CreateVideoNavigator from "./CreateVideoNavigator";
import FriendScreen from "../screens/FriendScreen";
import MyProfileNavigator from "./MyProfileNavigator";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
const Tab = createBottomTabNavigator();
const MainNavigator = () => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search";
          } else if (route.name === "Create") {
            iconName = focused ? "plus-circle" : "plus-circle";
            size = 50;
            color = "#FF5A98";
          } else if (route.name === "Friends") {
            iconName = focused ? "users" : "users";
          } else {
            iconName = focused ? "user-circle" : "user-circle";
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FF5A98",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: { height: "8%", paddingTop: 10, paddingBottom: 10 },
      })}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Search" component={SearchNavigator} />
      <Tab.Screen
        name="Create"
        component={CreateVideoNavigator}
        options={{
          tabBarStyle: { display: "none" },
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen name="Friends" component={FriendScreen} />
      <Tab.Screen name="My Profile" component={MyProfileNavigator} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
