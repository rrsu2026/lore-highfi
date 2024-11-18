import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const MyProfile = ({ navigation }) => {
  return (
    <View>
      <Text>MY PROFILE PLACEHOLDER</Text>
      <Button title="Scan" onPress={() => navigation.navigate("EditWrittenStory")} />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default MyProfile;