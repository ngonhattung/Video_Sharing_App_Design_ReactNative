import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";
import FriendList from "../components/FriendList/FriendList";
import * as apiUser from "../api/apiUser";
import FriendRecommend from "../components/Friend/FriendRecommend";
import FriendListRecommend from "../components/FriendList/FriendListRecommend";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchFriendRecommend } from "../redux/friendRecommendSlice";
import { friendRecommendSelector } from "../redux/selectors";
const FriendScreen = () => {
  const dispatch = useDispatch<any>();
  const [friends, setFriends] = useState([]);
  //const [recommendFriends, setRecommendFriends] = useState([]);
  const fetchFriends = async () => {
    try {
      const result = await apiUser.getFriends();
      setFriends(result);
    } catch (error) {
      console.error(error);
    }
  };
  // const fetchRecommendFriends = async () => {
  //   try {
  //     const result = await apiUser.getFriendsOfMyFriends();
  //     setRecommendFriends(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const fetchRecommendFriends = async () => {
  //   try {
  //     const result = await apiUser.getFriendsOfMyFriends();
  //     return result;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    dispatch(fetchFriendRecommend());
    fetchFriends();
  }, []);

  // useEffect(() => {
  //   fetchRecommendFriends();
  //   fetchFriends();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchFriendRecommend());
      fetchFriends();
    }, [])
  );
  const recommendFriends = useSelector(friendRecommendSelector);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "#000",
          }}
        >
          Friends {friends.length}
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Icon
          name="search"
          size={20}
          style={{ marginRight: 10, position: "absolute", left: 15 }}
        />
        <TextInput
          placeholder="Search by name"
          style={{
            height: 50,
            flex: 1,
            backgroundColor: "#F3F4F6",
            paddingLeft: 40,
            borderRadius: 5,
          }}
        />
      </View>
      <FriendList friends={friends} />
      {recommendFriends.length > 0 ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#000",
            }}
          >
            Find friends
          </Text>
          <Icon name="info-circle" size={20} style={{ marginLeft: 10 }} />
        </View>
      ) : null}
      <FriendListRecommend friendRecommends={recommendFriends} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: 10,
    marginTop: 20,
  },
});
export default FriendScreen;
