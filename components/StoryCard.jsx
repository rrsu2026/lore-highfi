import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const StoryCard = ({ navigation }) => {
  return (
      <Button title="View Story" onPress={() => navigation.navigate("ViewStory")} />
  );
};

const styles = StyleSheet.create({
});

export default StoryCard;