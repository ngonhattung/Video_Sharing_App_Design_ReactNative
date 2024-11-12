import { View, Text, FlatList } from "react-native";
import React from "react";
import { FriendListProps } from "../../types/interfaces";
import Friend from "../Friend/Friend";

const FriendList: React.FC<FriendListProps> = ({ friends }) => {
  return (
    <FlatList
      data={friends}
      renderItem={({ item }) => <Friend friend={item} />}
      keyExtractor={(item) => item.userId}
    />
  );
};

export default FriendList;
