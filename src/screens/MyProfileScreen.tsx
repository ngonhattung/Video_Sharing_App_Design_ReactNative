import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import * as apiUser from "../api/apiUser";
import { setHideTabBar } from "../redux/tabBarSlice";

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

const MyProfileScreen = () => {
  const auth = useSelector((state: any) => state.auth);
  const [myProfile, setMyProfile] = useState<any>(null);
  const [nFollowers, setNFollowers] = useState(0);
  const [nFollowing, setNFollowing] = useState(0);
  const [nLikes, setNLikes] = useState(0);
  const [selectedList, setSelectedList] = useState("videos");
  const navigation = useNavigation<NavigationProp<any>>();
  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const res = await apiUser.getUserProfileById(auth.userId);
        console.log("fetchMyProfile", res);
        setMyProfile(res);
      } catch (error) {
        console.log("fetchMyProfile", error);
      }
    };
    fetchMyProfile();
  }, [selectedList]);

  useEffect(() => {
    setNFollowers(myProfile?.followers.length);
    setNFollowing(myProfile?.following.length);
    setNLikes(countLikes(myProfile));
  }, [myProfile]);

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
    if (selectedList === "videos") {
      const temp: any = [];
      myProfile?.videos.forEach((video: any) => {
        temp.push({
          userId: auth.userId,
          avatar: myProfile?.avatar,
          userName: myProfile?.name,
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
      return myProfile?.saved;
    }
  };
  const dispatch = useDispatch();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.navContainer}>
        <View style={styles.navLeft}>
          <Pressable>
            {/* <Ionicons name="menu-sharp" size={24} color="black" /> */}
          </Pressable>
          <Pressable style={{ marginLeft: 15 }}>
            {/* <Ionicons name="person-add-outline" size={24} color="black" /> */}
          </Pressable>
        </View>
        <View style={styles.navRight}>
          <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="pencil-sharp" size={24} color="#F9A6C3" />
            <Text
              style={{ color: "#F9A6C3", marginLeft: 5, fontSize: textSize }}
            >
              Edit profile
            </Text>
          </Pressable>
        </View>
      </View>

      <View>
        <Image
          source={{ uri: myProfile?.avatar }}
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
          {myProfile?.name}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 15,
        }}
      >
        <Pressable
          style={styles.infoItem}
          onPress={() => {
            dispatch(setHideTabBar(true));
            navigation.navigate("FollowScreen", {
              user: myProfile?.name,
              img: myProfile?.avatar,
              type: "following",
            });
          }}
        >
          <Text style={styles.infoText}>
            {convertNumberToString(nFollowing)}
          </Text>
          <Text style={styles.infoText}>Following</Text>
        </Pressable>
        <Pressable
          style={styles.infoItem}
          onPress={() => {
            dispatch(setHideTabBar(true));
            navigation.navigate("FollowScreen", {
              user: myProfile?.name,
              img: myProfile?.avatar,
              type: "followers",
            });
          }}
        >
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

      <View style={styles.listButtonContainer}>
        <Pressable
          style={[
            styles.listButton,
            selectedList === "videos" && styles.activeFilter,
          ]}
          onPress={() => setSelectedList("videos")}
        >
          <Ionicons
            name="play-outline"
            size={24}
            color="black"
            style={[selectedList === "videos" && { color: "#F9A6C3" }]}
          />
          <Text style={{ marginLeft: 5, fontWeight: 500 }}>My Videos</Text>
        </Pressable>
        <Pressable
          style={[
            styles.listButton,
            selectedList === "liked" && styles.activeFilter,
          ]}
          onPress={() => setSelectedList("liked")}
        >
          <Ionicons
            name="heart-outline"
            size={24}
            color="black"
            style={[selectedList === "liked" && { color: "#F9A6C3" }]}
          />
          <Text style={{ marginLeft: 5, fontWeight: 500 }}>Liked</Text>
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

      {/* list */}
    </ScrollView>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  navLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  navRight: {
    marginLeft: "auto",
  },
  infoItem: {
    marginHorizontal: 28,
    alignItems: "center",
  },
  infoText: {
    color: "#b1b4bd",
    fontSize: textSize,
    marginTop: 5,
    fontWeight: 500,
  },
  listButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginVertical: 10,
  },
  listButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    width: "45%",
    justifyContent: "center",
  },
  activeFilter: {
    borderBottomWidth: 4,
    borderBottomColor: "#F9A6C3",
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
