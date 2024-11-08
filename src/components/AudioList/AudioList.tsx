import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { AudioListProps } from "../../types/interfaces";
import Audio from "../Audio/Audio";
const AudioList: React.FC<AudioListProps> = ({ audios }) => {
  const [audioPlayingId, setAudioPlayingId] = useState(null);

  const handlePlayAudio = (id: any) => {
    setAudioPlayingId((prevId) => (prevId === id ? null : id));
  };
  return (
    <FlatList
      data={audios}
      renderItem={({ item }) => (
        <Audio
          audio={item}
          isPlaying={audioPlayingId === item.audioId}
          onPlay={() => handlePlayAudio(item.audioId)}
        />
      )}
      keyExtractor={(item) => item.audioId}
    />
  );
};

export default AudioList;
