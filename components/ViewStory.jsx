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
      { route.params.story.text && <StoryText text={route.params.story.text} /> }
      { route.params.story.audio && <StoryAudio audio={route.params.story.audio} />}
      { route.params.story.video && <StoryVideo video={route.params.story.video} />}
    </View>
  );
};

const styles = StyleSheet.create({
});

export default ViewStory;