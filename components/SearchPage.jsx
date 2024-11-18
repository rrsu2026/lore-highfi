import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const SearchPage = ({ navigation }) => {
  return (
    <View>
      <Text>SEARCH PAGE PLACEHOLDER</Text>
      <Button title="Scan" onPress={() => navigation.navigate("EditWrittenStory")} />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default SearchPage;