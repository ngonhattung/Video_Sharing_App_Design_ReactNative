import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import { getFollowing, getFollower } from "../api/apiFollowing";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as apiUser from "../api/apiUser";
import { useDispatch, useSelector } from "react-redux";
import { count } from "firebase/firestore";
import { setHideTabBar } from "../redux/tabBarSlice";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

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
  const [search, setSearch] = useState("");
  const [sortedList, setSortedList] = useState<ObjItem[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const fetchMyFollower = async () => {
    try {
      const res = await apiUser.getFollower();
      // console.log("fetchMyFollower", res);
      setMyFollower(res);
    } catch (error) {
      console.log("fetchMyFollower", error);
    }
  };

  const fetchMyFollowing = async () => {
    try {
      const res = await apiUser.getFollowing();
      // console.log("fetchMyFollowing", res);
      setMyFollowing(res);
    } catch (error) {
      console.log("fetchMyFollowing", error);
    }
  };
  useEffect(() => {
    fetchMyFollower();
    fetchMyFollowing();
  }, [typeFilter]);

  useFocusEffect(
    useCallback(() => {
      fetchMyFollower();
      fetchMyFollowing();
    }, [])
  );

  const checknFollow = (arr: any) => {
    let count = 0;
    if (arr !== undefined) {
      if (arr.length > 0) {
        count = arr.length;
      }
    }
    return count;
  };

  useEffect(() => {
    setSortedList(checkDisplay());
  }, [typeFilter, search, myFollower, myFollowing]);

  const checkDisplay = () => {
    const list = typeFilter === "followers" ? myFollower : myFollowing;
    const filteredList =
      search.trim() === ""
        ? list
        : list.filter((item: ObjItem) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          );
    return filteredList;
  };

  const sortList = () => {
    const sorted = [...sortedList].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSortedList(sorted);
  };

  useEffect(() => {
    sortList();
  }, [sortOrder]);

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
              width: avatarSize - avatarSize * 0.5,
              height: avatarSize - avatarSize * 0.5,
              borderRadius: 50,
              padding: 2,
              margin: "auto",
            }}
          />
          <Text style={{ padding: 10, fontSize: textSize, fontWeight: 600 }}>
            {user}
          </Text>
        </View>
      </View>
      <View style={styles.userRight}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            style={styles.boxSearch}
            placeholder="Search"
            onChangeText={(text) => {
              const timeoutId = setTimeout(() => setSearch(text), 1000);
              return () => clearTimeout(timeoutId);
            }}
          />
          <Ionicons
            name="search-outline"
            size={24}
            color="black"
            style={{
              position: "absolute",
              right: 20,
              alignSelf: "center",
            }}
          />
        </View>

        <Pressable
          style={{ padding: 10 }}
          onPress={() => {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
          }}
        >
          <FontAwesome5
            name={sortOrder === "asc" ? "sort-amount-up" : "sort-amount-down"}
            size={24}
            color="black"
          />
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
          data={sortedList}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.userId}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  boxSearch: {
    height: 40,
    width: width * 0.8,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "#ccc",
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
