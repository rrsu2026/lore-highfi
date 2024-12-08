import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FakeDatabaseContext from './FakeDatabaseContext';
import UserList from './UserList';

const SubscribedAuthors = ({ navigation }) => {
  const [db, setDb] = useContext(FakeDatabaseContext);
  const loggedInUser = useContext(AuthenticationContext);
  return (
    <View style={styles.container}>
      <Text>Subscribed Authors</Text>
      <UserList navigation={navigation} users={db.users.filter((i) => loggedInUser.subscribedTo?.includes(i.id))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default SubscribedAuthors;