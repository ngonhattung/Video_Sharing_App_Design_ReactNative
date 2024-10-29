import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { TopTrendingProps } from "../../types/interfaces";
const TopTrending: React.FC<TopTrendingProps> = ({ videoTopTrending }) => {
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
    <View style={styles.container}>
      <Image
        source={{ uri: videoTopTrending.content }}
        style={{ width: 140, height: 180, borderRadius: 10 }}
      />
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ position: "absolute", left: 10, bottom: 15 }}>
            <Text style={{ fontSize: 12, fontWeight: "bold", color: "#fff" }}>
              {videoTopTrending.title}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "bold", color: "#fff" }}>
              {formatViews(videoTopTrending.views)} views
            </Text>
          </View>
          <Image
            source={{ uri: videoTopTrending.avatar }}
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
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});
export default TopTrending;
