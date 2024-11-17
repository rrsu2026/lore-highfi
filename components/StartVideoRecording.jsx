import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const StartVideoRecording = ({navigation}) => {
  return (
    <View>
      <Text>Video</Text>
      <Button title="Start Recording" onPress={() => navigation.navigate("RecordVideo")} />
      </View>
  );
};

const styles = StyleSheet.create({
});

export default StartVideoRecording;