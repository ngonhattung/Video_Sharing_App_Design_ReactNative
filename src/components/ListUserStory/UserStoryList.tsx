import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
} from "react-native";
import React from "react";
import { UserStoryListProps } from "../../types/interfaces";
import UserStory from "../UserStory/UserStory";
const UserStoryList: React.FC<UserStoryListProps> = ({ userStorys }) => {
  return (
    <FlatList
      data={userStorys}
      renderItem={({ item }) => <UserStory userStory={item} />}
      keyExtractor={(item) => item.id}
      horizontal={true}
    />
  );
};

export default UserStoryList;
