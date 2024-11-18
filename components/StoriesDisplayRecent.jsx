import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import StoryCard from './StoryCard';

const StoriesDisplayRecent = ({ navigation, stories }) => {
  return (
    <ScrollView>
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

export default StoriesDisplayRecent;