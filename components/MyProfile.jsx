import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AuthenticationContext from './AuthenticationContext';

const MyProfile = ({ navigation }) => {
  const user = useContext(AuthenticationContext);

  return (
    <View>
      <Text>{user.name}</Text>
      <Text>{user.location}</Text>
      <Text>{user.age}</Text>
      <Text>{user.tags.join(", ")}</Text>
      <Text>About Me</Text>
      <Text>{user.about}</Text>
      <Button title="My Stories" onPress={() => navigation.navigate("MyStories")} />
      <Button title="Saved Stories" onPress={() => navigation.navigate("SavedStories")} />
      <Button title="My Circle" onPress={() => navigation.navigate("MyCircle")} />
      <Button title="My Subscribers" onPress={() => navigation.navigate("MySubscribers")} />
      <Button title="SubscribedAuthors" onPress={() => navigation.navigate("SubscribedAuthors")} />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default MyProfile;