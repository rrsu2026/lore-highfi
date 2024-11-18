import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import TabbedCardList from './TabbedCardList';

const MyStories = ({ navigation, route }) => {
  return (
    <View>
      <Text>My Stories</Text>
      <TabbedCardList navigation={navigation} stories={route.params.stories} />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default MyStories;