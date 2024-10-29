import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
const VideoWatchingScreen = ({ route }: any) => {
  const { videoTopTrending } = route.params || {};
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={{ uri: videoTopTrending.content }}
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
export default VideoWatchingScreen;
