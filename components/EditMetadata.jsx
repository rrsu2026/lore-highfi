import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Audio } from 'expo-av';

const EditMetadata = ({ navigation, route }) => {

  const [sound, setSound] = useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(route.params.partialAudioStory.uri);
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

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
      {route.params.partialAudioStory && <Button title="Play Audio" onPress={playSound} />}

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