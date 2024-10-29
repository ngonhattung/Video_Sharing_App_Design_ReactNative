import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { AudioProps } from "../../types/interfaces";
const Audio: React.FC<AudioProps> = ({ audio }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: audio.image }}
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
        {audio.title}
      </Text>
      <Text
        style={{
          fontSize: 10,
          color: "#757980",
        }}
      >
        {audio.catalog}
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
export default Audio;
