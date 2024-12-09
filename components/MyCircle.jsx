import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FakeDatabaseContext from './FakeDatabaseContext';
import UserList from './UserList';

const MyCircle = ({ navigation }) => {
  const [db, setDb] = useContext(FakeDatabaseContext);
  const [loggedInUser, setLoggedInUser] = useContext(AuthenticationContext);
  return (
    <View style={styles.container}>
      <UserList navigation={navigation} users={db.users.filter((i) => loggedInUser.circle?.includes(i.id))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default MyCircle;