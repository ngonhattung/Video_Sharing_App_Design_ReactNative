import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { AudioTypeProps } from "../../types/interfaces";
const AudioType: React.FC<AudioTypeProps> = ({ audiotype }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: audiotype.image }}
        style={{ width: 100, height: 100 }}
        resizeMode="contain"
      />
      <Text
        style={{
          fontWeight: "700",
          fontSize: 12,
          color: "#757980",
          marginVertical: 5,
        }}
      >
        {audiotype.title}
      </Text>
      <Text
        style={{
          fontSize: 10,
          color: "#757980",
        }}
      >
        {audiotype.catalog}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
});
export default AudioType;
