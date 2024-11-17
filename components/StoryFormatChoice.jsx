import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const StoryFormatChoice = ({navigation}) => {
  return (
    <View>
      <Text>How would you like to share your story?</Text>
      <Button title="Text" onPress={() => navigation.navigate("TextInputChoice")} />
      <Button title="Audio" onPress={() => navigation.navigate("StartAudioRecording")} />
      <Button title="Video" onPress={() => navigation.navigate("StartVideoRecording")} />
      </View>
  );
};

const styles = StyleSheet.create({
});

export default StoryFormatChoice;