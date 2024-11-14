import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { setHideTabBar } from "../redux/tabBarSlice";
import * as apiUser from "../api/apiUser";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const avatarSize = width * 0.16;
const itemWidth = width * 0.32;
const itemHeight = height * 0.36;
const textSize = 16;

const convertNumberToString = (num: number) => {
  if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num > 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num;
  }
};

const ProfileDetailScreen = ({ route }: { route: any }) => {
  const dispatch = useDispatch();
  const { userTransfer } = route.params;
  const [typeFilter, setTypeFilter] = useState("videos");
  const navigation = useNavigation<NavigationProp<any>>();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [nFollowers, setNFollowers] = useState(0);
  const [nFollowing, setNFollowing] = useState(0);
  const [nLikes, setNLikes] = useState(0);
  const [statusFollow, setStatusFollow] = useState<any>(null);

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const res = await apiUser.getUserProfileById(userTransfer.userId);
        console.log("fetchUserProfile", res);
        setUserProfile(res);
      } catch (error) {
        console.log("fetchUserProfile", error);
      }
    };
    fetchMyProfile();
  }, [typeFilter, statusFollow]);

  useEffect(() => {
    const checkIsFriend = async () => {
      try {
        const res = await apiUser.checkIsFriend(userTransfer.userId);
        console.log("checkIsFriend", res);
        if (res === true) {
          setStatusFollow("Unfollow");
        } else {
          setStatusFollow("Follow");
        }
      } catch (error) {
        console.log("checkIsFriend", error);
      }
    };
    checkIsFriend();
    setNFollowers(userProfile?.followers.length);
    setNFollowing(userProfile?.following.length);
    setNLikes(countLikes(userProfile));
  }, [userProfile]);
  const handleFollowUser = async () => {
    if (statusFollow === "Follow") {
      setStatusFollow("Unfollow");
      console.log("userTransfer.userId", userTransfer.userId);
      try {
        await apiUser.handleSaveFowllow(userTransfer.userId);
      } catch (error) {
        console.error(error);
      }
    } else {
      setStatusFollow("Follow");
      try {
        await apiUser.handleUnSaveFowllow(userTransfer.userId);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const countLikes = (arr: any) => {
    let count = 0;
    if (arr?.videos !== undefined) {
      if (arr?.videos.length > 0) {
        arr?.videos.forEach((video: any) => {
          count += video.likes;
        });
      }
    }
    return count;
  };

  const checkDisplay = () => {
    if (typeFilter === "videos") {
      const temp: any = [];
      userProfile?.videos.forEach((video: any) => {
        temp.push({
          userId: userTransfer.userId,
          avatar: userProfile?.avatar,
          userName: userProfile?.name,
          videoId: video.videoId,
          title: video.title,
          hashtag: video.hashtag,
          content: video.content,
          audio: video.audio,
          views: video.views,
          likes: video.likes,
          comments: video.comments,
        });
      });
      return temp;
    } else {
      return userProfile?.saved;
    }
  };

  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <View style={{ flexDirection: "row" }}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="chevron-back-outline" size={24} color="black" />
          </Pressable>
          <View style={{ marginLeft: "auto", flexDirection: "row" }}>
            <Pressable>
              <Ionicons name="notifications-outline" size={24} color="black" />
            </Pressable>
            <Pressable style={{ marginLeft: 10 }}>
              <Ionicons name="ellipsis-vertical" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </View>

      <View>
        <Image
          source={{ uri: userProfile?.avatar }}
          style={{
            resizeMode: "contain",
            width: avatarSize,
            height: avatarSize,
            borderRadius: 50,
            padding: 2,
            margin: "auto",
          }}
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >
          {userProfile?.name}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 15,
        }}
      >
        <Pressable style={styles.infoItem}>
          <Text style={styles.infoText}>
            {convertNumberToString(nFollowing)}
          </Text>
          <Text style={styles.infoText}>Following</Text>
        </Pressable>
        <Pressable style={styles.infoItem}>
          <Text style={styles.infoText}>
            {convertNumberToString(nFollowers)}
          </Text>
          <Text style={styles.infoText}>Followers</Text>
        </Pressable>
        <Pressable style={styles.infoItem}>
          <Text style={styles.infoText}>{convertNumberToString(nLikes)}</Text>
          <Text style={styles.infoText}>Like</Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          alignSelf: "center",
        }}
      >
        <Pressable
          style={{
            borderRadius: 5,
            padding: 10,
            width: 100,
            backgroundColor: "#fff0f5",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleFollowUser}
        >
          <Text style={{ color: "#f54c87", fontSize: 15, fontWeight: 500 }}>
            {statusFollow}
          </Text>
        </Pressable>
        <Pressable
          style={{
            borderRadius: 5,
            marginLeft: 30,
            padding: 10,
            width: 100,
            backgroundColor: "#fff0f5",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#f54c87", fontSize: 15, fontWeight: 500 }}>
            Message
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#eee",
          padding: 10,
        }}
      >
        <Pressable
          style={[
            {
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 50,
              paddingVertical: 10,
              flexDirection: "row",
            },
            typeFilter === "videos" && {
              borderBottomWidth: 3,
              borderBottomColor: "#F9A6C3",
            },
          ]}
          onPress={() => setTypeFilter("videos")}
        >
          <Ionicons
            name="play-outline"
            size={24}
            color="black"
            style={[typeFilter === "videos" && { color: "#F9A6C3" }]}
          />
          <Text
            style={[
              { fontSize: 15, fontWeight: 500, color: "#aaa", marginLeft: 5 },
              typeFilter === "videos" && { color: "#F9A6C3" },
            ]}
          >
            Videos
          </Text>
        </Pressable>
        <Pressable
          style={[
            {
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 50,
              paddingVertical: 10,
              flexDirection: "row",
            },
            typeFilter === "liked" && {
              borderBottomWidth: 3,
              borderBottomColor: "#F9A6C3",
            },
          ]}
          onPress={() => setTypeFilter("liked")}
        >
          <Ionicons
            name="heart-outline"
            size={24}
            color="black"
            style={[typeFilter === "liked" && { color: "#F9A6C3" }]}
          />
          <Text
            style={[
              { fontSize: 15, fontWeight: 500, color: "#aaa", marginLeft: 5 },
              typeFilter === "liked" && { color: "#F9A6C3" },
            ]}
          >
            Liked
          </Text>
        </Pressable>
      </View>

      <View style={{ flex: 1, marginTop: 20 }}>
        <FlatList
          data={checkDisplay()}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.videoId}
          numColumns={3}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileDetailScreen;

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: "center",
  },
  infoFollowContainer: {
    flexDirection: "row",
  },
  infoItem: {
    marginHorizontal: 20,
    alignItems: "center",
  },
  itemContainer: {
    width: 120,
    height: 160,
    margin: 3,
  },
  itemImage: {
    resizeMode: "contain",
    width: 120,
    height: 160,
    borderRadius: 5,
    margin: "auto",
  },
  viewsText: {
    position: "absolute",
    bottom: 5,
    left: 5,
    flexDirection: "row",
    width: 110,
  },
  infoText: {
    color: "#b1b4bd",
    fontSize: textSize,
    marginTop: 5,
    fontWeight: 500,
  },
});

interface ObjItem {
  userId: string;
  avatar: string;
  userName: string;
  videoId: string;
  title: string;
  hashtag: string[];
  content: string;
  audio: string;
  views: number;
  likes: number;
  comments: number;
}

const Item = ({ item }: { item: ObjItem }) => {
  // console.log("item", item);
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<any>>();
  const convertViews = (views: number) => {
    if (views > 1000000) {
      return (views / 1000000).toFixed(1) + "M";
    } else if (views > 1000) {
      return (views / 1000).toFixed(1) + "K";
    } else {
      return views;
    }
  };

  return (
    <Pressable
      style={{
        width: itemWidth,
        height: itemHeight,
        margin: 2,
      }}
      onPress={() => {
        dispatch(setHideTabBar(true));
        navigation.navigate("VideoWatchingScreen", {
          videoTopTrending: item,
        });
      }}
    >
      <Image
        source={{ uri: item.content }}
        style={{
          width: itemWidth,
          height: itemHeight,
          borderRadius: 5,
          margin: "auto",
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 5,
          left: 5,
          flexDirection: "row",
          width: 110,
        }}
      >
        <Ionicons
          name="play-outline"
          size={14}
          color="white"
          style={{ alignSelf: "center" }}
        />
        <Text
          style={{
            color: "white",
            fontWeight: "400",
            fontSize: 10,
            alignSelf: "center",
          }}
        >
          {convertViews(item.views)} views
        </Text>
      </View>
    </Pressable>
  );
};
