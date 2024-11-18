import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const TimelineDisplay = ({ navigation }) => {
  return (
    <View>
      <Button title="View Story 1 (recent)" onPress={() => navigation.navigate("ViewStory")} />
      <Button title="View Story 2" onPress={() => navigation.navigate("ViewStory")} />
      <Button title="View Story 3" onPress={() => navigation.navigate("ViewStory")} />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default TimelineDisplay;