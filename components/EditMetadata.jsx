import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Audio } from 'expo-av';
import AuthenticationContext from './AuthenticationContext';
import { v4 as uuidv4 } from 'uuid';


const EditMetadata = ({ navigation, route }) => {
  const user = useContext(AuthenticationContext);
  const db = useContext(FakeDatabaseContext);
  const [title, setTitle] = useState('');
  const [text, setText] = useState(route.params.partialWrittenStory?.text || "");
  const [soundUri, setSoundUri] = useState(route.params.partialAudioStory?.uri || "");
  const [sound, setSound] = useState();

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(soundUri);
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  function createOrUpdateStory() {
    // Check if a story with this id exists
    const story = route.params.partialWrittenStory || route.params.partialAudioStory || route.params.partialVideoStory;
    const existingStory = db.stories.find(s => s.id === story.id);
    story.title = title; // TODO: load existing values into form if exist
    if (existingStory) {
      // Update the story
      Object.assign(existingStory, story);
    } else {
      // Create a new story
      story.id = uuidv4();
      story.author = user.id;
      db.stories.push(story);
    }
    console.log('Story created:', story); // FIXME: story props not getting set
  }

  return (
    <View>
      <Text>
        Title
        <TextInput onChangeText={setTitle} />
      </Text>
      <Text>
        Start Date <DateTimePicker type="date" />
      </Text>
      <Text>
        End Date (optional) <DateTimePicker type="date" />
      </Text>
      {text && <Text>{text}</Text>}
      {soundUri && <Button title="Play Audio" onPress={playSound} />}
      {/* TODO: preview for video */}

      <Text>Make Visible to</Text>
      <Text>
        {/* TODO: Implement radio button functionality */}
        <Button type="radio" /> Public
        <Button type="radio" /> Circle
      </Text>
      <Button title="Confirm" onPress={() => {
        createOrUpdateStory();
        navigation.navigate("MyStories");
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default EditMetadata;