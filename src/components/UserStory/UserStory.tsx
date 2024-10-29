import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { UserStoryProps } from "../../types/interfaces";
const UserStory: React.FC<UserStoryProps> = ({ userStory }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: userStory.avatar }}
        style={{ width: 60, height: 60 }}
        resizeMode="contain"
      />
      <Text style={{ fontSize: 14, color: "gray" }}>{userStory.name}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    alignItems: "center",
  },
});
export default UserStory;
