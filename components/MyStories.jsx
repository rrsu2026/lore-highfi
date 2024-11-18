import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import TabbedCardList from './TabbedCardList';

const MyStories = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Text>My Stories</Text>
      <TabbedCardList navigation={navigation} stories={route.params.stories} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default MyStories;