import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FakeDatabaseContext from './FakeDatabaseContext';
import UserList from './UserList';

const MySubscribers = ({ navigation }) => {
  const [db, setDb] = useContext(FakeDatabaseContext);
  const loggedInUser = useContext(AuthenticationContext);
  return (
    <View style={styles.container}>
      <Text>My Subscribers</Text>
      <UserList navigation={navigation} users={db.users.filter(user => user.subscribedTo?.includes(loggedInUser.id))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default MySubscribers;