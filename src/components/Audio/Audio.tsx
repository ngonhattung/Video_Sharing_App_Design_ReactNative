import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AudioProps, RootStackParamList } from "../../types/interfaces";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
type PostVideoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CreateVideoScreen"
>;
const Audio: React.FC<AudioProps> = ({ audio, isPlaying, onPlay }) => {
  const navigation = useNavigation<PostVideoScreenNavigationProp>();
  const useAudio = () => {
    navigation.navigate("CreateVideoScreen", { audioName: audio.name });
  };
  return (
    <View
      style={
        isPlaying
          ? [styles.container, { backgroundColor: "#FEF0F5" }]
          : styles.container
      }
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ position: "relative", width: 50, height: 50 }}>
          <TouchableOpacity
            onPress={onPlay}
            style={{
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <Image
              source={{ uri: audio.image }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
              }}
            />
            {isPlaying ? (
              <Icon
                name="pause"
                size={10}
                color="white"
                style={{ position: "absolute" }}
              />
            ) : (
              <Icon
                name="play"
                size={10}
                color="white"
                style={{ position: "absolute" }}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 15 }}>{audio.name}</Text>
          <Text style={{ fontSize: 16, color: "gray" }}>
            00:{audio.duration}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
            width: 60,
            height: 30,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#F891B6",
          }}
          onPress={useAudio}
        >
          <Text style={{ color: "#F891B6" }}>Use</Text>
        </TouchableOpacity>
        <Image source={require("../../assets/detailau.png")} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderRadius: 5,
  },
});
export default Audio;
