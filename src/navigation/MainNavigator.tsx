import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import SearchNavigator from "./SearchNavigator";
import CreateVideoNavigator from "./CreateVideoNavigator";
import FriendScreen from "../screens/FriendScreen";
import MyProfileNavigator from "./MyProfileNavigator";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";
import { boolHideTabBar } from "../redux/selectors";
const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const hideTabBar = useSelector(boolHideTabBar);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Create") {
            iconName = "plus-circle";
            size = 50;
            color = "#FF5A98";
          } else if (route.name === "Friends") {
            iconName = "users";
          } else {
            iconName = "user-circle";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FF5A98",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          display: hideTabBar ? "none" : "flex",
          height: 55,
          paddingVertical: 10,
          marginBottom: 10,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarStyle: {
            display: hideTabBar ? "none" : "flex",
            height: 55,
            paddingVertical: 10,
            marginBottom: 10,
          },
        }}
      />
      <Tab.Screen name="Search" component={SearchNavigator} />
      <Tab.Screen
        name="Create"
        component={CreateVideoNavigator}
        options={{
          tabBarLabel: () => null,
          tabBarStyle: {
            display: "none",
          },
        }}
      />
      <Tab.Screen name="Friends" component={FriendScreen} />
      <Tab.Screen name="My Profile" component={MyProfileNavigator} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
