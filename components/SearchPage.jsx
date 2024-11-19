import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const SearchPage = ({ navigation }) => {
  return (
    <View>
      <label>Search <input /></label>
      <Button title="🔎" onPress={() => navigation.navigate("SearchResults", { query: null })} />
      <Text>Suggestions</Text>
      <Button title="Chinese-American" onPress={() => navigation.navigate("SearchResults", { query: "Chinese-American" })} />
      <Button title="Women" onPress={() => navigation.navigate("SearchResults", { query: "Women" })} />
      <Button title="Military" onPress={() => navigation.navigate("SearchResults", { query: "Military" })} />
      <Button title="Peru" onPress={() => navigation.navigate("SearchResults", { query: "Peru" })} />
      <Button title="1980s" onPress={() => navigation.navigate("SearchResults", { query: "1980s" })} />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default SearchPage;