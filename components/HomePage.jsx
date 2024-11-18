import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import StoryCard from './StoryCard';
import TabbedCardList from './TabbedCardList';
import TimelineDisplay from './TimelineDisplay';

const HomePage = ({navigation}) => {
  return (
    <View>
      <Button title="Share Your Story" onPress={() => navigation.navigate("StoryFormatChoice")} />
      <TimelineDisplay />
    </View>
  );
};

export default HomePage;