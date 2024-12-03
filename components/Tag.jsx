import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const Tag = ({ navigation, title }) => (
  <Pressable
    style={styles.suggestionButton}
    onPress={() => navigation.navigate("SearchResults", { query: title })}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  suggestionButton: {
    backgroundColor: "#FCD385",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "400",
  },
});

export default Tag;
