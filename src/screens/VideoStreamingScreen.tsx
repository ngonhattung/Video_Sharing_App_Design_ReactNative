import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ImageBackground } from "react-native";

const VideoStreamingScreen = ({ route }: any) => {
  const { userStreaming } = route.params || {};
  return (
    <ImageBackground
      source={{ uri: userStreaming.liveStream.content }}
      style={styles.background}
    >
      <View style={styles.content}></View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  background: {
    flex: 1,
    resizeMode: "contain",
  },
  content: {},
});
export default VideoStreamingScreen;
