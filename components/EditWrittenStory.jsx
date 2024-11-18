import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const RecordVideo = ({ navigation }) => {
  return (
    <View>
      {/* TODO: Optional "make sure that this is correct" if the story was prefilled by scan */}
      <label>
        Image (optional)
        <input type="image" />
      </label>
      <label>
        Text
        <textarea />
      </label>
      <Button title="Save" onPress={() => navigation.navigate("EditMetadata")} />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default RecordVideo;