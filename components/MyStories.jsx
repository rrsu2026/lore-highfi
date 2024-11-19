import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TabbedCardList from './TabbedCardList';
import FakeDatabaseContext from './FakeDatabaseContext';

const MyStories = ({ navigation }) => {
  const db = useContext(FakeDatabaseContext);
  return (
    <View style={styles.container}>
      <Text>My Stories</Text>
      <TabbedCardList navigation={navigation} stories={db.stories} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default MyStories;