import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { UserStoryProps } from "../../types/interfaces";
import { useSelector } from "react-redux";
const UserStory: React.FC<UserStoryProps> = ({ userStory }) => {
  const userId = useSelector((state: any) => state.auth.userId);
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: userStory.avatar }}
        style={{ width: 60, height: 60 }}
        resizeMode="contain"
      />
      {userStory.id === userId ? (
        <Text style={{ fontSize: 14, color: "gray" }}>You</Text>
      ) : (
        <Text style={{ fontSize: 14, color: "gray" }}>{userStory.name}</Text>
      )}
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
