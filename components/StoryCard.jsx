import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const StoryCard = ({ navigation, story }) => {
  return (
    <View>
      <Text>{story.occurredAt}</Text>
      <Text>{story.title}</Text>
      <Text>{story.author}</Text>
      <Text>{story.text && "Text" || story.audio && "Audio" || story.video && "Video"}</Text>
      <Text>{story.location}</Text>
      <Text>{story.postedAt}</Text>
      <Button title="View" onPress={() => navigation.navigate("ViewStory", { "story": story })} />
      {/* TODO: Find a way to make this whole element clickable without breaking a11y */}
    </View>
  );
};

const styles = StyleSheet.create({
});

export default StoryCard;