import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import StoryCard from './StoryCard';

const HomePage = ({navigation}) => {
  return (
    <View>
      <Button title="Share Your Story" onPress={() => navigation.navigate("StoryFormatChoice")} />
      <StoryCard navigation={navigation} />
    </View>
  );
};

export default HomePage;