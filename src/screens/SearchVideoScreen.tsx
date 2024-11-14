import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import * as apiUser from "../api/apiUser";
import { setHideTabBar } from "../redux/tabBarSlice";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const { width, height } = Dimensions.get("window");
const avatarSize = width * 0.06;
const itemWidth = width * 0.42;
const itemHeight = height * 0.3;
const itemHeightContainer = itemHeight + itemHeight * 0.4;
const textSize = 16;
const itemsToShowDefault = 4;

const convertNumberToString = (num: number) => {
  if (num > 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num > 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num;
  }
};

const SearchVideoScreen = () => {
  const [selectedList, setSelectedList] = useState("trending");
  const [allVideos, setAllVideos] = useState<any>([]);
  const [topTrending, setTopTrending] = useState<any>([]);
  const [userStreaming, setUserStreaming] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [itemsToShow, setItemsToShow] = useState(itemsToShowDefault);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleViewMore = () => {
    setItemsToShow(itemsToShow + 4);
  };

  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        const res = await apiUser.getAllVideos();
        // console.log("fetchAllVideos", res);
        setAllVideos(res);
      } catch (error) {
        console.log("fetchAllVideos", error);
      }
    };

    const fetchTopTrending = async () => {
      try {
        const res = await apiUser.getTopTrending();
        // console.log("fetchTopTrending", res);
        setTopTrending(res);
      } catch (error) {
        console.log("fetchTopTrending", error);
      }
    };

    const fetchUserStreaming = async () => {
      try {
        const res = await apiUser.getUserStreaming();
        console.log("fetchUserStreaming", res);
        setUserStreaming(res);
      } catch (error) {
        console.log("fetchUserStreaming", error);
      }
    };
    if (selectedList === "trending") {
      fetchTopTrending();
    } else if (selectedList === "all") {
      fetchAllVideos();
    } else if (selectedList === "streaming") {
      fetchUserStreaming();
    }
  }, [selectedList]);

  const checkDisplay = () => {
    let list: ObjItem[] = [];
    if (selectedList === "all") {
      list = allVideos;
    } else if (selectedList === "trending") {
      list = topTrending;
    }
    const filteredList =
      search.trim() === ""
        ? list
        : list.filter((item: ObjItem) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          );
    return filteredList;
  };

  const filterUserStreaming = () => {
    return search.trim() === ""
      ? userStreaming
      : userStreaming.filter((item: UserStreamingType) =>
          item.liveStream.streamTitle
            .toLowerCase()
            .includes(search.toLowerCase())
        );
  };
  const sortVideos = (array: ObjItem[]) => {
    return [...array].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
  };

  const sortUserStreaming = (array: UserStreamingType[]) => {
    return [...array].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.liveStream.streamTitle.localeCompare(b.liveStream.streamTitle);
      } else {
        return b.liveStream.streamTitle.localeCompare(a.liveStream.streamTitle);
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* search */}
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

      {/* filter */}
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Pressable
          style={[
            styles.filterButton,
            selectedList === "trending" && { backgroundColor: "#f54c87" },
          ]}
          onPress={() => {
            setSelectedList("trending");
            setItemsToShow(itemsToShowDefault);
          }}
        >
          <Text
            style={[
              styles.textFilter,
              selectedList === "trending" && { color: "white" },
            ]}
          >
            Trending
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.filterButton,
            selectedList === "all" && { backgroundColor: "#f54c87" },
          ]}
          onPress={() => {
            setSelectedList("all");
            setItemsToShow(itemsToShowDefault);
          }}
        >
          <Text
            style={[
              styles.textFilter,
              selectedList === "all" && { color: "white" },
            ]}
          >
            All
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.filterButton,
            selectedList === "streaming" && { backgroundColor: "#f54c87" },
          ]}
          onPress={() => {
            setSelectedList("streaming");
            setItemsToShow(itemsToShowDefault);
          }}
        >
          <Text
            style={[
              styles.textFilter,
              selectedList === "streaming" && { color: "white" },
            ]}
          >
            Streaming
          </Text>
        </Pressable>
      </View>

      {/* list */}
      <ScrollView style={{ flex: 1 }}>
        {selectedList === "streaming" ? (
          <FlatList
            style={{ alignSelf: "center" }}
            data={sortUserStreaming(
              filterUserStreaming().slice(0, itemsToShow)
            )}
            renderItem={({ item }) => <ItemStreaming userStreaming={item} />}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
        ) : (
          <FlatList
            style={{ alignSelf: "center" }}
            data={sortVideos(checkDisplay().slice(0, itemsToShow))}
            renderItem={({ item }) => <ItemVideo item={item} />}
            keyExtractor={(item) => item.videoId}
            numColumns={2}
          />
        )}
      </ScrollView>

      <View style={{ marginHorizontal: "auto" }}>
        {itemsToShow <
          (selectedList === "streaming"
            ? filterUserStreaming().length
            : checkDisplay().length) && (
          <Pressable
            style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
            onPress={handleViewMore}
          >
            <Text
              style={{ fontSize: textSize, fontWeight: 400, color: "#f54c87" }}
            >
              Show more
            </Text>
            <Ionicons name="chevron-down-outline" size={24} color="#f54c87" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default SearchVideoScreen;
const styles = StyleSheet.create({
  filterButton: {
    padding: 10,
    marginVertical: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#f8f8f8",
  },
  textFilter: {
    textAlign: "center",
    color: "#f54c87",
    fontSize: textSize,
    fontWeight: 400,
  },
  itemContainer: {
    width: itemWidth,
    margin: 15,
  },
  itemImage: {
    resizeMode: "contain",
    width: itemWidth,
    height: itemHeight,
    borderRadius: 5,
    margin: "auto",
    backgroundColor: "red",
  },
  viewsText: {
    position: "absolute",
    bottom: 5,
    left: 5,
    flexDirection: "row",
    width: "90%",
  },
  userRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
const ItemVideo = ({ item }: { item: ObjItem }) => {
  console.log("ItemVideo", item);
  const dispatch = useDispatch();
  // const navigation = useNavigation<NavigationProp<any>>();
  // const pressOnProfile = (navigation: any) => {
  //   navigation.navigate("ProfileDetailScreen");
  // };
  return (
    <View
      style={{
        margin: 15,
        width: itemWidth,
        height: itemHeightContainer,
      }}
    >
      {/* pressOn Video */}
      <Pressable
        style={{
          width: itemWidth,
          height: itemHeight,
        }}
        onPress={() => {
          dispatch(setHideTabBar(true));
          // navigation.navigate("VideoWatchingScreen", {
          //   videoTopTrending: item,
          // });
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
            {convertNumberToString(item.views)} views
          </Text>
        </View>
      </Pressable>
      {/* info */}
      <Text
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: "#777",
          marginVertical: 10,
        }}
      >
        {item.title}
      </Text>
      <Pressable
        style={{ flexDirection: "row", alignItems: "center" }}
        // onPress={() => pressOnProfile(navigation)}
      >
        <Image
          source={{ uri: item.avatar }}
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: 50,
            marginRight: 10,
            padding: 3,
          }}
        />
        <Text style={{ fontSize: 12, fontWeight: 600, color: "#777" }}>
          {item.userName}
        </Text>
      </Pressable>
    </View>
  );
};

interface UserStreamingType {
  id: string;
  name: string;
  avatar: string;
  liveStream: {
    isLive: boolean;
    streamTitle: string;
    content: string;
    viewers: number;
    minutesAgo: number;
  };
}

const ItemStreaming = ({
  userStreaming,
}: {
  userStreaming: UserStreamingType;
}) => {
  console.log("ItemStreaming", userStreaming);
  return (
    <View
      style={{
        margin: 15,
        width: itemWidth,
        height: itemHeightContainer,
      }}
    >
      {/* pressOn Video */}
      <Pressable
        style={{
          width: itemWidth,
          height: itemHeight,
        }}
        // onPress={() => {
        //   dispatch(setHideTabBar(true));
        //   navigation.navigate("VideoWatchingScreen", {
        //     videoTopTrending: item,
        //   });
        // }}
      >
        <Image
          source={{ uri: userStreaming.liveStream.content }}
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
            name="eye-outline"
            size={24}
            color="red"
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
            {convertNumberToString(userStreaming.liveStream.viewers)} views
          </Text>
        </View>
      </Pressable>
      {/* info */}
      <Text
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: "#777",
          marginVertical: 10,
        }}
      >
        {userStreaming.liveStream.streamTitle}
      </Text>
      <Pressable
        style={{ flexDirection: "row", alignItems: "center" }}
        // onPress={() => pressOnProfile(navigation)}
      >
        <Image
          source={{ uri: userStreaming.avatar }}
          style={{
            width: avatarSize,
            height: avatarSize,
            borderRadius: 50,
            marginRight: 10,
            padding: 3,
          }}
        />
        <Text style={{ fontSize: 12, fontWeight: 600, color: "#777" }}>
          {userStreaming.name}
        </Text>
      </Pressable>
    </View>
  );
};
