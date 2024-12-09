import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FakeDatabaseContext from './FakeDatabaseContext';
import UserList from './UserList';

const MySubscribers = ({ navigation }) => {
  const [db, setDb] = useContext(FakeDatabaseContext);
  const loggedInUser = useContext(AuthenticationContext);
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>No subscribers yet. </Text>
      <UserList navigation={navigation} users={db.users.filter(user => user.subscribedTo?.includes(loggedInUser.id))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textStyle: {
    justifyContent: "center",
    fontSize: 20,
    padding: "2%",
  }
});

export default MySubscribers;