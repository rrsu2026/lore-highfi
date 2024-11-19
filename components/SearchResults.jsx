import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import TabbedCardList from './TabbedCardList';

const SearchResults = ({ navigation, route }) => {
  return (
    <View>
      <Text>Results for "{route.params.query}"</Text>
      <TabbedCardList navigation={navigation} stories={route.params.stories} />
      {/* TODO: Filter based on search query */}
    </View>
  );
};

const styles = StyleSheet.create({
});

export default SearchResults;