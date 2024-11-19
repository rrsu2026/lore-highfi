import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FakeDatabaseContext from './FakeDatabaseContext';
import UserList from './UserList';

const MyCircle = ({ navigation }) => {
  const db = useContext(FakeDatabaseContext);
  const loggedInUser = useContext(AuthenticationContext);
  return (
    <View style={styles.container}>
      <Text>My Circle</Text>
      <UserList navigation={navigation} users={db.users.filter((i) => loggedInUser.circle.includes(i.id))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default MyCircle;