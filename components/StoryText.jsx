import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const StoryText = ({ text }) => {
  const textArray = text.split("\n\n");

  return (
    <FlatList
      data={textArray}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <Text style={styles.textParagraph}>{item}</Text>
      )}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: "3%",
    marginVertical: "5%",
  },
  textParagraph: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 24,
    color: "#333",
  },
});

export default StoryText;
