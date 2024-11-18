import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import StoriesDisplayTimeline from './StoriesDisplayTimeline';

const HomePage = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Button title="Share Your Story" onPress={() => navigation.navigate("StoryFormatChoice")} />
      <StoriesDisplayTimeline navigation={navigation} stories={route.params.stories} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default HomePage;