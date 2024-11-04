import { View, Text, FlatList } from "react-native";
import React from "react";
import { TopicListProps } from "../../types/interfaces";
import Topic from "../Topic/Topic";
const TopicList: React.FC<TopicListProps> = ({ topics }) => {
  return (
    <FlatList
      data={topics}
      numColumns={4}
      renderItem={({ item }) => <Topic topic={item} />}
      keyExtractor={(item) => item.id}
      nestedScrollEnabled={true}
    />
  );
};

export default TopicList;
