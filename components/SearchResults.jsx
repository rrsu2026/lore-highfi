import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import TabbedCardList from './TabbedCardList';
import FakeDatabaseContext from './FakeDatabaseContext';

const SearchResults = ({ navigation, route }) => {
  const db = useContext(FakeDatabaseContext);
  return (
    <View>
      <Text>Results for "{route.params.query}"</Text>
      <TabbedCardList navigation={navigation} stories={db.stories} />
      {/* TODO: Filter based on search query */}
    </View>
  );
};

const styles = StyleSheet.create({
});

export default SearchResults;