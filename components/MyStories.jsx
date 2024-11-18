import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import StoryCard from './StoryCard';

const RecordVideo = ({ navigation }) => {
  return (
    <View>
      <Text>My Stories</Text>
      <StoryCard navigation={navigation} />
      </View>
  );
};

const styles = StyleSheet.create({
});

export default RecordVideo;