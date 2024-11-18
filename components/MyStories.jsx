import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import StoryCard from './StoryCard';
import TabbedCardList from './TabbedCardList';

const RecordVideo = ({ navigation }) => {
  return (
    <View>
      <Text>My Stories</Text>
      <TabbedCardList />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default RecordVideo;