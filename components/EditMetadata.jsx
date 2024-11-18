import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const RecordVideo = ({ navigation }) => {
  return (
    <View>
      <label>
        Title
        <input />
      </label>
      <label>
        Start Date <input type="date" />
      </label>
      <label>
        End Date (optional) <input type="date" />
      </label>
      {/* Preview goes here */}

      <Text>Make Visible to</Text>
      <label>
        <input type="radio" /> Public
        <input type="radio" /> Circle
      </label>
      <Button title="Confirm" onPress={() => navigation.navigate("MyStories")} />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default RecordVideo;