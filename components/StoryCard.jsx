import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const StoryCard = ({ navigation, story }) => {
  return (
      <Button title={story.title} onPress={() => navigation.navigate("ViewStory", {"story": story})} />
  );
};

const styles = StyleSheet.create({
});

export default StoryCard;