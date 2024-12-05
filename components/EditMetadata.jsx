import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Audio } from "expo-av";
import AuthenticationContext from "./AuthenticationContext";
import uuid from "react-native-uuid";

const EditMetadata = ({ navigation, route }) => {
  const user = useContext(AuthenticationContext);
  const [db, setDb] = useContext(FakeDatabaseContext);

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [text, setText] = useState("");
  const [soundUri, setSoundUri] = useState("");
  const [sound, setSound] = useState();

  const [visibility, setVisibility] = useState("Public");

  useEffect(() => {
    if (route.params.partialWrittenStory) {
      setTitle(route.params.partialWrittenStory.title);
      setStartDate(
        route.params.partialWrittenStory.startDate
          ? new Date(route.params.partialWrittenStory.startDate)
          : new Date()
      );
      setEndDate(
        route.params.partialWrittenStory.endDate
          ? new Date(route.params.partialWrittenStory.endDate)
          : new Date()
      );
      setText(route.params.partialWrittenStory.text);
    } else if (route.params.partialAudioStory) {
      setTitle(route.params.partialAudioStory.title);
      setStartDate(
        route.params.partialAudioStory.startDate
          ? new Date(route.params.partialAudioStory.startDate)
          : new Date()
      );
      setEndDate(
        route.params.partialAudioStory.endDate
          ? new Date(route.params.partialAudioStory.endDate)
          : new Date()
      );
      setSoundUri(route.params.partialAudioStory.uri);
    } else if (route.params.partialVideoStory) {
      setTitle(route.params.partialVideoStory.title);
      setStartDate(
        route.params.partialVideoStory.startDate
          ? new Date(route.params.partialVideoStory.startDate)
          : new Date()
      );
      setEndDate(
        route.params.partialVideoStory.endDate
          ? new Date(route.params.partialVideoStory.endDate)
          : new Date()
      );
    }
  }, [
    route.params.partialWrittenStory,
    route.params.partialAudioStory,
    route.params.partialVideoStory,
  ]);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playSound() {
    try {
      console.log("Loading sound...");
      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: soundUri,
      });
      setSound(newSound);
      console.log("Sound successfully set:", newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error("Error loading or playing sound:", error);
    }
  }

  function createOrUpdateStory() {
    // Check if a story with this id exists
    const story =
      route.params.partialWrittenStory ||
      route.params.partialAudioStory ||
      route.params.partialVideoStory;
    const existingStory = db.stories.find((s) => s.id === story.id);
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
      console.log("updated:", db);
      return;
    }

    // Add values needed to create a new story
    let newStory = {};
    // every story has these
    newStory.id = uuid.v4();
    newStory.author = user.id;
    newStory.postedAt = new Date().toISOString();
    // these get set through the form
    newStory.title = title;
    newStory.startDate = startDate.toISOString();
    newStory.endDate = endDate.toISOString();
    // these differ per type of story
    newStory.text = text;
    newStory.image = route.params.partialWrittenStory?.image;
    newStory.audio = soundUri;
    // TODO: video
    db.stories.push(newStory);
  }

  return (
    <View>
      <View style={styles.inputCont}>
      <Text style={styles.catText}>
        Title
        </Text>
        <TextInput
          style={styles.inputStyle}
          onChangeText={setTitle}
          defaultValue={title}
        />

      </View>
      <View style={styles.inputCont}>
      <Text style={styles.catText}>
        Start Date 
      </Text>
      <DateTimePicker type="date" value={startDate} />
      </View>
      <View style={styles.inputCont}>
      <Text style={styles.catText}>
        End Date (optional) 
      </Text>
      <DateTimePicker type="date" value={endDate} />
      </View>
      {text && <Text>{text}</Text>}
      {soundUri && <Button title="Play Audio" onPress={playSound} />}
      {/* TODO: preview for video */}
      <View>
        <Text>Make Visible to</Text>
        <Pressable
          onPress={() => setVisibility("Public")}
          style={styles.radioButton}
        >
          <View style={styles.radioCircle}>
            {visibility === "Public" && <View style={styles.selectedCircle} />}
          </View>
          <Text>Public</Text>
        </Pressable>
        <Pressable
          onPress={() => setVisibility("Circle")}
          style={styles.radioButton}
        >
          <View style={styles.radioCircle}>
            {visibility === "Circle" && <View style={styles.selectedCircle} />}
          </View>
          <Text>Circle</Text>
        </Pressable>
      </View>
      <Button
        title="Confirm"
        onPress={() => {
          createOrUpdateStory();
          navigation.navigate("MyStories");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  inputStyle: {
    borderWidth: 2.5,
    borderColor: "#000",
    padding: 10,
    marginVertical: 10,
    color: "#000",
    backgroundColor: "#fff",
    width: "90%",
  },
  catText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  inputCont: {
    flexDirection: "column",
    justifyContent: "center",
  }
});

export default EditMetadata;
