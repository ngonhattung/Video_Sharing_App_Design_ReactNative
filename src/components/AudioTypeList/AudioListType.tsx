import { View, Text, FlatList } from "react-native";
import React from "react";
import { AudioTypeListProps } from "../../types/interfaces";
import AudioType from "../AudioType/AudioType";
const AudioTypeList: React.FC<AudioTypeListProps> = ({ audiotypes }) => {
  return (
    <FlatList
      data={audiotypes}
      renderItem={({ item }) => <AudioType audiotype={item} />}
      keyExtractor={(item) => item.audioID}
      horizontal={true}
      nestedScrollEnabled={true}
    />
  );
};

export default AudioTypeList;
