import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
const VideoWatchingScreen = ({ route }: any) => {
  const { videoTopTrending } = route.params || {};
  const navigation = useNavigation();
  const formatViews = (views: any) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + "M";
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + "K";
    } else {
      return views.toString();
    }
  };
  return (
    <ImageBackground
      source={{ uri: videoTopTrending.content }}
      style={styles.background}
    >
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ position: "absolute", top: 20, right: 20 }}
        >
          <Image source={require("../assets/close.png")} />
        </TouchableOpacity>

        <View style={styles.info}>
          <Text style={[styles.infoText, { fontWeight: 700, fontSize: 20 }]}>
            {videoTopTrending.userName}
          </Text>
          <View style={{ marginVertical: 10 }}>
            <Text style={styles.infoText}> {videoTopTrending.title}</Text>
            <Text style={styles.infoText}>
              {videoTopTrending.hashtag.map((ht: any) => ht + " ")}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/notemusic.png")}
              style={{ marginRight: 5 }}
            />
            <Text style={styles.infoText}>{videoTopTrending.audio}</Text>
          </View>
        </View>
        <View style={styles.intractionInfo}>
          <View style={{ marginBottom: 30, alignItems: "center" }}>
            <Image
              source={{ uri: videoTopTrending.avatar }}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#0D99FF",
                width: 14,
                height: 14,
                borderRadius: 7,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                bottom: -5,
              }}
            >
              <Text style={{ color: "#ffffff", alignContent: "center" }}>
                +
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginBottom: 30, alignItems: "center" }}>
            <Image
              source={require("../assets/heart.png")}
              style={{ marginBottom: 5 }}
            />
            <Text style={styles.infoText}>
              {formatViews(videoTopTrending.likes)}
            </Text>
          </View>

          <View style={{ marginBottom: 30, alignItems: "center" }}>
            <Image
              source={require("../assets/comment.png")}
              style={{ marginBottom: 5 }}
            />
            <Text style={styles.infoText}>
              {formatViews(videoTopTrending.comments)}
            </Text>
          </View>

          <Image source={require("../assets/detailicon.png")} />
        </View>
      </View>
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
  content: {
    flex: 1,
    justifyContent: "flex-end",
  },
  info: {
    position: "absolute",
    left: 25,
    bottom: 25,
  },
  infoText: {
    color: "#ffffff",
  },
  intractionInfo: {
    position: "absolute",
    right: 25,
    bottom: 25,
    alignItems: "center",
  },
});
export default VideoWatchingScreen;
