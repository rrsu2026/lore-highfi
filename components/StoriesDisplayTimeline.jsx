import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import StoryCard from './StoryCard';

const StoriesDisplayTimeline = ({ navigation, stories }) => {
  return (
    <ScrollView style={styles.container}>
      {
        stories.map(story => <StoryCard navigation={navigation} story={story} key={story.title} />)
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default StoriesDisplayTimeline;