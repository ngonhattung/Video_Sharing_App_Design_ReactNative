import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import { getFollowing, getFollower } from "../api/apiFollowing";
import { useNavigation } from "@react-navigation/native";
import * as apiUser from "../api/apiUser";
import { useDispatch, useSelector } from "react-redux";
import { count } from "firebase/firestore";
import { setHideTabBar } from "../redux/tabBarSlice";

const { width, height } = Dimensions.get("window");
const avatarSize = width * 0.14;
const itemWidth = width * 0.33;
const itemHeight = height * 0.38;
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

const FollowScreen = ({ route }: { route: any }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const auth = useSelector((state: any) => state.auth);
  const { user, img, type } = route.params;
  const [typeFilter, setTypeFilter] = useState(type);
  const [myFollower, setMyFollower] = useState<any>([]);
  const [myFollowing, setMyFollowing] = useState<any>([]);

  useEffect(() => {
    const fetchMyFollower = async () => {
      try {
        const res = await apiUser.getFollower();
        console.log("fetchMyFollower", res);
        setMyFollower(res);
      } catch (error) {
        console.log("fetchMyFollower", error);
      }
    };

    const fetchMyFollowing = async () => {
      try {
        const res = await apiUser.getFollowing();
        console.log("fetchMyFollowing", res);
        setMyFollowing(res);
      } catch (error) {
        console.log("fetchMyFollowing", error);
      }
    };
    fetchMyFollower();
    fetchMyFollowing();
  }, [typeFilter]);

  const checknFollow = (arr: any) => {
    let count = 0;
    if (arr !== undefined) {
      if (arr.length > 0) {
        count = arr.length;
      }
    }
    return count;
  };

  const checkDisplay = () => {
    if (typeFilter === "followers") {
      return myFollower;
    } else {
      return myFollowing;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.userLeft}>
          <Ionicons
            name="chevron-back-outline"
            size={24}
            color="black"
            style={{ marginRight: 5, padding: 10 }}
            onPress={() => {
              dispatch(setHideTabBar(false));
              navigation.goBack();
            }}
          />
          <Image
            source={{ uri: img }}
            style={{
              resizeMode: "contain",
              width: avatarSize - 8,
              height: avatarSize - 8,
              borderRadius: 50,
              padding: 2,
              margin: "auto",
            }}
          />
          <Text style={{ padding: 10, fontSize: textSize, fontWeight: 600 }}>
            {user}
          </Text>
        </View>
        <View style={styles.userRight}>
          <Pressable style={{ marginRight: 20, padding: 10 }}>
            <Ionicons name="search-outline" size={24} color="black" />
          </Pressable>
          <Pressable style={{ padding: 10 }}>
            <Ionicons name="filter-outline" size={24} color="black" />
          </Pressable>
        </View>
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
            styles.filterButton,
            typeFilter === "followers" && styles.filterActive,
          ]}
          onPress={() => setTypeFilter("followers")}
        >
          <Text
            style={[
              { fontSize: textSize, fontWeight: 500, color: "#aaa" },
              typeFilter === "followers" && { color: "#F9A6C3" },
            ]}
          >
            {convertNumberToString(checknFollow(myFollower))} followers
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.filterButton,
            typeFilter === "following" && styles.filterActive,
          ]}
          onPress={() => setTypeFilter("following")}
        >
          <Text
            style={[
              { fontSize: textSize, fontWeight: 500, color: "#aaa" },
              typeFilter === "following" && { color: "#F9A6C3" },
            ]}
          >
            {convertNumberToString(checknFollow(myFollowing))} following
          </Text>
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={checkDisplay()}
          renderItem={({ item }) => <Item item={item} />}
        />
      </View>
    </View>
  );
};

export default FollowScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  userContainer: {
    flexDirection: "row",
  },
  userLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  userRight: {
    marginLeft: "auto",
    flexDirection: "row",
  },
  filterButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  filterActive: {
    borderBottomWidth: 3,
    borderBottomColor: "#F9A6C3",
  },
});

interface ObjItem {
  userId: string;
  avatar: string;
  name: string;
}
const Item = ({ item }: { item: ObjItem }) => {
  const navigation = useNavigation();

  const pressOnProfile = (navigation: any) => {
    navigation.navigate("ProfileDetailScreen", {
      userTransfer: {
        userId: item.userId,
        avatar: item.avatar,
        name: item.name,
      },
    });
  };
  return (
    <Pressable
      style={{
        flexDirection: "row",
        padding: 15,
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        borderRadius: 5,
        margin: 3,
      }}
      onPress={() => pressOnProfile(navigation)}
    >
      <Image
        source={{ uri: item.avatar }}
        style={{
          resizeMode: "contain",
          width: avatarSize,
          height: avatarSize,
          borderRadius: 50,
          padding: 2,
        }}
      />
      <Text
        style={{
          fontSize: textSize,
          fontWeight: 600,
          padding: 10,
          marginLeft: 5,
        }}
      >
        {item.name}
      </Text>
    </Pressable>
  );
};
