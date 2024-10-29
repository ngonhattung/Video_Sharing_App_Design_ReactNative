import { View, Text, FlatList, StyleSheet, StatusBar } from "react-native";
import React from "react";
import { TopTrendingListProps } from "../../types/interfaces";
import { SafeAreaView } from "react-native-safe-area-context";
import TopTrending from "../TopTrending/TopTrending";
const TopTrendingList: React.FC<TopTrendingListProps> = ({
  videoTopTrendings,
}) => {
  return (
    <FlatList
      data={videoTopTrendings}
      renderItem={({ item }) => <TopTrending videoTopTrending={item} />}
      keyExtractor={(item) => item.videoId}
      horizontal={true}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    width: "100%",
  },
});
export default TopTrendingList;
