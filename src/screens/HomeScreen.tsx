import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import UserStoryList from "../components/ListUserStory/UserStoryList";
import * as apiUser from "../api/apiUser";
import * as apiTopic from "../api/apiTopic";
import * as apiAudio from "../api/apiAudio";
import TopTrendingList from "../components/TopTrendingList/TopTrendingList";
import TopicList from "../components/TopicList/TopicList";
import StreamingList from "../components/StreamingList/StreamingList";
import AudioList from "../components/AudioList/AudioList";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const HomeScreen = () => {
  const [userStory, setUserStory] = useState([]);
  const [topTrending, setTopTrending] = useState([]);
  const [topic, setTopic] = useState([]);
  const [streaming, setStreaming] = useState([]);
  const [audio, setAudio] = useState([]);
  useEffect(() => {
    const fetchUserStory = async () => {
      try {
        const response = await apiUser.getUserStory();
        setUserStory(response);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchTopTrending = async () => {
      try {
        const response = await apiUser.getTopTrending();
        setTopTrending(response);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchTopic = async () => {
      try {
        const response = await apiTopic.getTopic();
        setTopic(response);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchUserStreaming = async () => {
      try {
        const response = await apiUser.getUserStreaming();
        setStreaming(response);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchUserAudio = async () => {
      try {
        const response = await apiAudio.getAudio();
        setAudio(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserAudio();
    fetchUserStreaming();
    fetchTopic();
    fetchTopTrending();
    fetchUserStory();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={require("../assets/Logo.png")} />
          <Text style={{ fontSize: 20, fontWeight: 700, marginLeft: 10 }}>
            Video Sharing App
          </Text>
        </View>
        <Image source={require("../assets/Spell.png")} />
      </View>
      <KeyboardAwareScrollView>
        <UserStoryList userStorys={userStory} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
            Top trending
          </Text>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "#FF6781" }}>View more</Text>
          </TouchableOpacity>
        </View>
        <TopTrendingList videoTopTrendings={topTrending} />
        <Text style={{ fontSize: 20, fontWeight: 700, marginVertical: 10 }}>
          Browse topic
        </Text>
        <TopicList topics={topic} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
            Streaming
          </Text>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "#FF6781" }}>View more</Text>
          </TouchableOpacity>
        </View>
        <StreamingList userStreamings={streaming} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
            Audio
          </Text>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "#FF6781" }}>View more</Text>
          </TouchableOpacity>
        </View>
        <AudioList audios={audio} />
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
    borderColor: "#E6E6E6",
    borderBottomWidth: 1,
  },
});

export default HomeScreen;
