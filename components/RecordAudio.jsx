import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const RecordAudio = ({navigation}) => {
  return (
    <View>
      <Text>Recording...</Text>
      <Button title="Pause" />
      <Button title="Save" onPress={() => navigation.navigate("EditMetadata")} />
      </View>
  );
};

const styles = StyleSheet.create({
});

export default RecordAudio;