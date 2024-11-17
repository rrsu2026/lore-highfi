import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomePage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Page!</Text>
      <Button title="Share Your Story" onPress={() => navigation.navigate("StoryFormatChoice")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});

export default HomePage;