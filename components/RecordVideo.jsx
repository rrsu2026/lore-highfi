import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const RecordVideo = ({navigation}) => {
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

export default RecordVideo;