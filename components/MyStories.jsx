import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TabbedCardList from './TabbedCardList';
import FakeDatabaseContext from './FakeDatabaseContext';
import AuthenticationContext from './AuthenticationContext';

const MyStories = ({ navigation }) => {
  const [db, setDb] = useContext(FakeDatabaseContext);
  const user = useContext(AuthenticationContext);
  return (
    <View style={styles.container}>
      <TabbedCardList navigation={navigation} stories={db.stories.filter((s) => s.authorId == user.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default MyStories;