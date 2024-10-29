import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { TopicProps } from "../../types/interfaces";
const Topic: React.FC<TopicProps> = ({ topic }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#F8F9FA",
          width: 90,
          height: 90,
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: topic.image }}
          style={{ width: 25, height: 22 }}
          resizeMode="contain"
        />
        <Text style={{ fontWeight: "700", fontSize: 12, color: "#757980" }}>
          {topic.name}
        </Text>
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
export default Topic;
