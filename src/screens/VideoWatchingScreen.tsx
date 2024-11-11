import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setHideTabBar } from "../redux/tabBarSlice";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import * as apiUser from "../api/apiUser";
import { CommentType } from "../types/interfaces";
import CommentList from "../components/CommentList/CommentList";
import Icon from "react-native-vector-icons/FontAwesome5";
const VideoWatchingScreen = ({ route }: any) => {
  const { videoTopTrending } = route.params || {};
  const [modalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(false);
  const handleLikeVideo = async () => {
    setLike((prevLike) => {
      const newLikeStatus = !prevLike;
      if (newLikeStatus) {
        videoTopTrending.likes += 1;
        apiUser.saveVideo(videoTopTrending);
      } else {
        videoTopTrending.likes -= 1;
        apiUser.unSaveVideo(videoTopTrending);
      }
      return newLikeStatus;
    });
  };
  const userId = useSelector((state: any) => state.auth.userId);
  const sendComment = async () => {
    try {
      const result = await apiUser.postComment(
        userId,
        videoTopTrending.videoId,
        comment,
        videoTopTrending.userId
      );
      setComment("");
      if (result && result.commentId) {
        setComments((prevComments) => [...prevComments, result]);
      } else {
        console.error("Invalid comment result", result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const navigation = useNavigation();
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
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const results = await apiUser.getCommentsFromVideo(
          videoTopTrending.videoId
        );
        setComments(results);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchLikedStatus = async () => {
      try {
        const results = await apiUser.getVideoSaved();

        setLike(
          results.some(
            (video: any) => video.videoId === videoTopTrending.videoId
          )
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchLikedStatus();
    fetchComments();
  }, [videoTopTrending.videoId]);
  return (
    <ImageBackground
      source={{ uri: videoTopTrending.content }}
      style={styles.background}
    >
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => {
            dispatch(setHideTabBar(false));
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
            <TouchableOpacity onPress={handleLikeVideo}>
              <Icon
                name="heart"
                size={25}
                color={like ? "red" : "gray"}
                style={{ marginBottom: 5 }}
              />
            </TouchableOpacity>
            <Text style={styles.infoText}>
              {formatViews(videoTopTrending.likes)}
            </Text>
          </View>

          <TouchableOpacity onPress={toggleModal}>
            <View style={{ marginBottom: 30, alignItems: "center" }}>
              <Image
                source={require("../assets/comment.png")}
                style={{ marginBottom: 5 }}
              />
              <Text style={styles.infoText}>
                {formatViews(comments.length)}
              </Text>
            </View>
          </TouchableOpacity>

          <Image source={require("../assets/detailicon.png")} />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModal}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.bottomSheet}>
                {/* Content for comments */}
                <View style={styles.headerModal}>
                  <Text style={styles.headerText}>
                    {comments.length} Comments
                  </Text>
                  {/* Close Button */}
                  <TouchableOpacity onPress={toggleModal}>
                    <Image source={require("../assets/closeb.png")} />
                  </TouchableOpacity>
                </View>
                <ScrollView style={styles.commentContainer}>
                  <CommentList comments={comments} />
                </ScrollView>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 20,
                  }}
                >
                  <TextInput
                    placeholder="Leave comment..."
                    style={{
                      width: "90%",
                      height: 40,
                      paddingLeft: 10,
                      backgroundColor: "#F3F4F6",
                    }}
                    onChangeText={(text) => setComment(text)}
                  />

                  <TouchableOpacity onPress={sendComment}>
                    <Image source={require("../assets/send.png")} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
    zIndex: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  bottomSheet: {
    width: "100%",
    height: "65%",
    backgroundColor: "white",
    padding: 15,
  },
  commentContainer: {
    maxHeight: "90%",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  headerModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
export default VideoWatchingScreen;
