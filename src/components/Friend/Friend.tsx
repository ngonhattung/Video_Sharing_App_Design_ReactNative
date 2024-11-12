import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FriendProps } from "../../types/interfaces";
import Icon from "react-native-vector-icons/FontAwesome5";
const Friend: React.FC<FriendProps> = ({ friend }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: friend.avatar }}
          style={{ height: 40, width: 40, borderRadius: 20 }}
        />
        <Text
          style={{
            textAlign: "center",
            color: "black",
            fontWeight: "bold",
            fontSize: 15,
            marginLeft: 10,
          }}
        >
          {friend.name}
        </Text>
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
            borderColor: "#9495A2",
            borderWidth: 1,
            padding: 10,
            marginRight: 10,
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
            }}
          >
            Message
          </Text>
        </TouchableOpacity>
        <Icon name="ellipsis-h" size={20} color={"#9495A2"} />
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
export default Friend;
