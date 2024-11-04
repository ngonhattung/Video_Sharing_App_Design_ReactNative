import { View, Text, FlatList } from "react-native";
import React from "react";
import { AudioListProps } from "../../types/interfaces";
import Audio from "../Audio/Audio";
const AudioList: React.FC<AudioListProps> = ({ audios }) => {
  return (
    <FlatList
      data={audios}
      renderItem={({ item }) => <Audio audio={item} />}
      keyExtractor={(item) => item.audioID}
      horizontal={true}
      nestedScrollEnabled={true}
    />
  );
};

export default AudioList;
