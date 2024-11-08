import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { CommentProps } from "../../types/interfaces";
import Icon from "react-native-vector-icons/FontAwesome5";

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={{ uri: comment.avatar }} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.commenter}>{comment.commenter}</Text>
          <Text style={styles.commentText}>{comment.comment}</Text>
          <Text style={styles.timeAgo}>{comment.timeAgo}</Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="heart" size={25} color={comment.like ? "red" : "gray"} />
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
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    alignSelf: "flex-start",
  },
  textContainer: {
    flex: 1,
  },
  commenter: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
  },
  commentText: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 5,
    flexWrap: "wrap",
    maxWidth: "100%",
  },
  timeAgo: {
    fontSize: 13,
    fontWeight: "400",
    color: "grey",
  },
  iconContainer: {
    paddingLeft: 10,
  },
});

export default Comment;
