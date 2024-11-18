import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import StoryCard from './StoryCard';

const StoriesDisplayTimeline = ({ navigation, stories }) => {
  return (
    <View>
      {
        stories.map(story => <StoryCard navigation={navigation} story={story} key={story.title} />)
      }
    </View>
  );
};

const styles = StyleSheet.create({
});

export default StoriesDisplayTimeline;