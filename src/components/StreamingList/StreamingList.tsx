import { View, Text, FlatList } from "react-native";
import React from "react";
import { UserStreamingListProps } from "../../types/interfaces";
import Streaming from "../Streaming/Streaming";
const StreamingList: React.FC<UserStreamingListProps> = ({
  userStreamings,
}) => {
  return (
    <FlatList
      data={userStreamings}
      renderItem={({ item }) => <Streaming userStreaming={item} />}
      keyExtractor={(item) => item.id}
      horizontal={true}
      nestedScrollEnabled={true}
    />
  );
};

export default StreamingList;
