import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FilterProps } from "../../types/interfaces";

const Filter: React.FC<FilterProps> = ({ filter, isFilter, onChoose }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onChoose}>
        <Image
          source={{ uri: filter.image }}
          style={
            isFilter
              ? {
                  width: 50,
                  height: 50,
                  borderRadius: 5,
                  borderWidth: 2,
                  borderColor: "#F44A86",
                }
              : {
                  width: 50,
                  height: 50,
                  borderRadius: 5,
                }
          }
        />
      </TouchableOpacity>
      <Text style={{ color: "gray" }}>{filter.name}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
  },
});
export default Filter;
