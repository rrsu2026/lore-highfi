import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const TextInputChoice = ({navigation}) => {
  return (
    <View>
      <Text>Text</Text>
      <Text>How would you like to input your text?</Text>
      <Button title="Type" onPress={() => navigation.navigate("EditWrittenStory")} />
      <Button title="Scan" onPress={() => navigation.navigate("Scan")} />
      </View>
  );
};

const styles = StyleSheet.create({
});

export default TextInputChoice;