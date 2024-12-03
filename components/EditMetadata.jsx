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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [text, setText] = useState("");
  const [soundUri, setSoundUri] = useState("");
  const [sound, setSound] = useState();

  useEffect(() => {
    if (route.params.partialWrittenStory) {
      setTitle(route.params.partialWrittenStory.title);
      setStartDate(route.params.partialWrittenStory.startDate);
      setEndDate(route.params.partialWrittenStory.endDate);
      setText(route.params.partialWrittenStory?.text);
    } else if (route.params.partialAudioStory) {
      setTitle(route.params.partialAudioStory.title);
      setStartDate(route.params.partialAudioStory.startDate);
      setEndDate(route.params.partialAudioStory.endDate);
      setSoundUri(route.params.partialAudioStory?.uri);
    } else if (route.params.partialVideoStory) {
      setTitle(route.params.partialVideoStory.title);
      setStartDate(route.params.partialVideoStory.startDate);
      setEndDate(route.params.partialVideoStory.endDate);
    }
  }, [route.params.partialWrittenStory, route.params.partialAudioStory, route.params.partialVideoStory]);

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
    // update story with form values
    story.title = title; // TODO: load existing values into form if exist
    if (existingStory) {
      Object.assign(existingStory, story);
      console.log('Story updated:', existingStory);
      return;
    }

    // Add values needed to create a new story
    story.id = uuidv4();
    story.author = user.id;
    db.stories.push(story);
    console.log('Story created:', story); // FIXME: story props not getting set
  }

  return (
    <View>
      <Text>
        Title
        <TextInput onChangeText={setTitle} defaultValue={title} />
      </Text>
      <Text>
        Start Date <DateTimePicker type="date" value={startDate} />
      </Text>
      <Text>
        End Date (optional) <DateTimePicker type="date" value={endDate} />
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