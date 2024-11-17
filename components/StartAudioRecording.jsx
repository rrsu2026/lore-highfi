import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const StartAudioRecording = ({navigation}) => {
  return (
    <View>
      <Text>Audio</Text>
      <Button title="Start Recording" onPress={() => navigation.navigate("RecordAudio")} />
      </View>
  );
};

const styles = StyleSheet.create({
});

export default StartAudioRecording;