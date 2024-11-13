import { View, Text, FlatList } from "react-native";
import React from "react";
import { FriendRecommendListProps } from "../../types/interfaces";
import FriendRecommend from "../Friend/FriendRecommend";

const FriendListRecommend: React.FC<FriendRecommendListProps> = ({
  friendRecommends,
}) => {
  return (
    <FlatList
      data={friendRecommends}
      renderItem={({ item }) => <FriendRecommend friendRecommend={item} />}
      keyExtractor={(item) => item.userId}
    />
  );
};

export default FriendListRecommend;
