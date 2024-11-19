import React from 'react';
import { Text, View } from 'react-native';
import { StyleSheet, ScrollView } from 'react-native';

const UserList = ({ navigation, users }) => {
  return (
    <ScrollView style={styles.container}>
      {
        users?.map(user => <View key={user.id}><Text>{user.name}</Text></View>)
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default UserList;