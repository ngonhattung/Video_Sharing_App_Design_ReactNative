import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState } from "react";
import { FilterListProps } from "../../types/interfaces";
import Filter from "../Filter/Filter";
const FilterList: React.FC<FilterListProps> = ({ filters, clearFilter }) => {
  const [filterChooseId, setFilterChooseId] = useState(null);
  const handleFilter = (id: any) => {
    setFilterChooseId((prevId) => (prevId === id ? null : id));
  };
  return (
    <View style={styles.filterListContainer}>
      {filters.map((item) => (
        <Filter
          key={item.filterId}
          filter={item}
          isFilter={filterChooseId === item.filterId}
          onChoose={() => handleFilter(item.filterId)}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  filterListContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
});
export default FilterList;
