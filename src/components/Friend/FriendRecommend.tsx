import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FriendRecommendProps } from "../../types/interfaces";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Image } from "react-native";
import * as apiUser from "../../api/apiUser";
const FriendRecommend: React.FC<FriendRecommendProps> = ({
  friendRecommend,
}) => {
  const handleFollowUser = async () => {
    try {
      await apiUser.handleSaveFowllow(friendRecommend.userId);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: friendRecommend.avatar }}
          style={{ height: 40, width: 40, borderRadius: 20 }}
        />
        <View>
          <Text
            style={{
              textAlign: "center",
              color: "black",
              fontWeight: "bold",
              fontSize: 15,
              marginLeft: 10,
            }}
          >
            {friendRecommend.name}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "gray",
                fontSize: 10,
              }}
            >
              Friend with{" "}
            </Text>
            <Image
              source={{ uri: friendRecommend.avatarFriend }}
              style={{ height: 20, width: 20, borderRadius: 10 }}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            backgroundColor: "#F44B87",
            padding: 10,
            marginRight: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Follow
          </Text>
        </TouchableOpacity>
        <Icon name="times" size={20} color={"#9495A2"} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});
export default FriendRecommend;
