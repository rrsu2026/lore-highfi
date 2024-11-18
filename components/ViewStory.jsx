import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import StoryText from "./StoryText";
import StoryAudio from "./StoryAudio";

const ViewStory = ({ navigation, route }) => {
  return (
    <View>
      <Text>{route.params.story.author}</Text>
      <Text>{route.params.story.title}</Text>
      { route.params.story.text && <StoryText /> }
      { route.params.story.audio && <StoryAudio />}
      { route.params.story.video && <StoryVideo />}
    </View>
  );
};

const styles = StyleSheet.create({
});

export default ViewStory;