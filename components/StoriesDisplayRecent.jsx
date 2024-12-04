import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import StoryCard from "./StoryCard";
import theme from "../Theme.js";

const StoriesDisplayRecent = ({ navigation, stories }) => {
  return (
    <ScrollView>
      {stories.map((story, index) => (
        <View style={styles.cardContainer} key={index}>
          <StoryCard navigation={navigation} story={story} key={story.title} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    borderWidth: 3,
    borderColor: theme.colors.chineseBlack,
    borderRadius: 10,
    padding: 10,
    backgroundColor: theme.colors.primaryColorBg,
    margin: 10,
  },
});

export default StoriesDisplayRecent;
