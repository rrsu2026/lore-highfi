import React from 'react';
import { FlatList, StyleSheet} from 'react-native';
import ProfileCard from './ProfileCard';

const UserList = ({ navigation, users }) => {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProfileCard user={item} />}
    />
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default UserList;