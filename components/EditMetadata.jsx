import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Audio } from 'expo-av';
import AuthenticationContext from './AuthenticationContext';
import { v4 as uuidv4 } from 'uuid';


const EditMetadata = ({ navigation, route }) => {
  const user = useContext(AuthenticationContext);
  const [db, setDb] = useContext(FakeDatabaseContext);

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [text, setText] = useState("");
  const [soundUri, setSoundUri] = useState("");
  const [sound, setSound] = useState();

  useEffect(() => {
    if (route.params.partialWrittenStory) {
      setTitle(route.params.partialWrittenStory.title);
      setStartDate(route.params.partialWrittenStory.startDate);
      setEndDate(route.params.partialWrittenStory.endDate);
      setText(route.params.partialWrittenStory.text);
    } else if (route.params.partialAudioStory) {
      setTitle(route.params.partialAudioStory.title);
      setStartDate(route.params.partialAudioStory.startDate);
      setEndDate(route.params.partialAudioStory.endDate);
      setSoundUri(route.params.partialAudioStory.uri);
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
    if (existingStory) {
      let updated = {};
      // every story has these
      updated.id = existingStory.id;
      updated.author = existingStory.author;
      updated.postedAt = existingStory.postedAt;

      // these get set through the form
      updated.title = title;
      updated.startDate = startDate;
      updated.endDate = endDate;

      // these differ per type of story
      updated.text = text;
      updated.image = existingStory.image;
      updated.audio = soundUri;
      db.stories[db.stories.indexOf(existingStory)] = updated;
      console.log('updated:', db);
      return;
    }

    // Add values needed to create a new story
    let newStory = {};
    // every story has these
    newStory.id = uuidv4();
    newStory.author = user.id;
    newStory.postedAt = new Date().toISOString();
    // these get set through the form
    newStory.title = title;
    newStory.startDate = startDate;
    newStory.endDate = endDate;
    // these differ per type of story
    newStory.text = text;
    newStory.image = route.params.partialWrittenStory?.image;
    newStory.audio = soundUri;
    // TODO: video
    db.stories.push(newStory);
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