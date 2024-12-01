import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditMetadata = ({ navigation, route }) => {
  return (
    <View>
      <Text>
        Title
        <TextInput />
      </Text>
      <Text>
        Start Date <DateTimePicker type="date" />
      </Text>
      <Text>
        End Date (optional) <DateTimePicker type="date" />
      </Text>
      {route.params.partialWrittenStory && <Text>{route.params.partialWrittenStory.text}</Text>}
      {/* TODO: previews for audio & video */}

      <Text>Make Visible to</Text>
      <Text>
        {/* TODO: Implement radio button functionality */}
        <Button type="radio" /> Public
        <Button type="radio" /> Circle
      </Text>
      <Button title="Confirm" onPress={() => navigation.navigate("MyStories")} />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default EditMetadata;