import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { RootStackParamList, UserStreamingProps } from "../../types/interfaces";
import { useNavigation } from "@react-navigation/native";
import { setHideTabBar } from "../../redux/tabBarSlice";
import { useDispatch } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
type VideoStreamingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "VideoStreamingScreen"
>;
const Streaming: React.FC<UserStreamingProps> = ({ userStreaming }) => {
  const navigation = useNavigation<VideoStreamingScreenNavigationProp>();
  const dispatch = useDispatch();
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
    <TouchableOpacity
      onPress={() => {
        dispatch(setHideTabBar(true));
        navigation.navigate("VideoStreamingScreen", {
          userStreaming: userStreaming,
        });
      }}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={{ uri: userStreaming.liveStream.content }}
            style={{ width: 140, height: 180, borderRadius: 10 }}
          />
          <View
            style={{
              position: "absolute",
              left: 10,
              top: 15,
              backgroundColor: "red",
              borderRadius: 20,
              width: 70,
              height: 21,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 100,
                backgroundColor: "#fff",
              }}
            ></View>
            <Text style={{ fontSize: 8, color: "#fff" }}>
              {userStreaming.liveStream.minutesAgo} min ago
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ position: "absolute", left: 10, bottom: 15 }}>
                <Text
                  style={{ fontSize: 12, fontWeight: "bold", color: "#fff" }}
                >
                  {userStreaming.liveStream.streamTitle}
                </Text>
                <Text
                  style={{ fontSize: 10, fontWeight: "bold", color: "#fff" }}
                >
                  {formatViews(userStreaming.liveStream.viewers)} views
                </Text>
              </View>
              <Image
                source={{ uri: userStreaming.avatar }}
                style={{
                  width: 30,
                  height: 30,
                  position: "absolute",
                  right: 10,
                  bottom: 15,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  content: {},
});
export default Streaming;
