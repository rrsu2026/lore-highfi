import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import StoryText from "./StoryText";
import StoryAudio from "./StoryAudio";

const ViewStory = ({ route }) => {
  const db = useContext(FakeDatabaseContext);
  return (
    <View>
      <Text>{db.users.find((user)=>user.id == route.params.story.author).name}</Text>
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