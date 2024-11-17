import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomePage = ({navigation}) => {
  return (
    <View>
      <Button title="Share Your Story" onPress={() => navigation.navigate("StoryFormatChoice")} />
    </View>
  );
};

export default HomePage;