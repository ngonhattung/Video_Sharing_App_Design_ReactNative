import { View, Text, FlatList } from "react-native";
import React from "react";
import { CommentListProps } from "../../types/interfaces";
import Comment from "../Comment/Comment";
const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => <Comment comment={item} />}
      keyExtractor={(item) => item.commentId}
    />
  );
};

export default CommentList;
