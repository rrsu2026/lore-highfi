import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const RecordVideo = ({ navigation }) => {
  return (
    <View>
      <Text>Take a Clear Photo of your Written Story</Text>
      <Button title="Scan" onPress={() => navigation.navigate("EditWrittenStory")} />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default RecordVideo;