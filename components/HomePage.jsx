import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import StoriesDisplayTimeline from './StoriesDisplayTimeline';
import FakeDatabaseContext from './FakeDatabaseContext';

const HomePage = ({navigation}) => {
  const db = useContext(FakeDatabaseContext);
  return (
    <View style={styles.container}>
      <Button title="Share Your Story" onPress={() => navigation.navigate("StoryFormatChoice")} />
      <StoriesDisplayTimeline navigation={navigation} stories={db.stories} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default HomePage;