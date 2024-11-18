import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import StoryCard from './StoryCard';

const StoriesDisplayTimeline = ({ navigation }) => {
  return (
    <View>
      <StoryCard navigation={navigation} story={{title: "View Story 1 (timeline)"}} />
      <StoryCard navigation={navigation} story={{title: "View Story 2"}} />
      <StoryCard navigation={navigation} story={{title: "View Story 3"}} />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default StoriesDisplayTimeline;