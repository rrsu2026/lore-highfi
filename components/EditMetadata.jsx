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
import theme from "../Theme";


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
    newStory.comments = [];
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
    <View style={styles.container}>
      <View style={styles.inputCont}>
      <Text style={styles.catText}>
        Title
        </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Enter your title here..."
          onChangeText={setTitle}
          defaultValue={title}
        />

      </View>
      <View style={styles.datesCont}>
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
      </View>
      {text && <Text>{text}</Text>}
      {soundUri && <Button title="Play Audio" onPress={playSound} />}
      {/* TODO: preview for video */}
      <Text style={styles.makeVisText}>Make Visible to...</Text>
      <View style={styles.publicCont}>  
  <Pressable
    onPress={() => setVisibility("Public")}
    style={[
      styles.button,
      visibility === "Public" && styles.selectedButton,
    ]}
  >
    <Text
      style={[
        styles.buttonText,
        visibility === "Public" && styles.buttonText, 
      ]}
    >
      Public
    </Text>
  </Pressable>

  <Pressable
    onPress={() => setVisibility("Circle")}
    style={[
      styles.button,
      visibility === "Circle" && styles.selectedButton, // Change color when selected
    ]}
  >
    <Text
      style={[
        styles.buttonText,
        visibility === "Circle" && styles.buttonText, 
      ]}
    >
      Circle
    </Text>
  </Pressable>
</View>

      <View style={styles.centCont}>
      <Pressable style={styles.button} onPress={() => {
          createOrUpdateStory();
          navigation.navigate("MyStories");
        }}>
          <Text style={styles.buttonText}>Confirm</Text>

        </Pressable>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: "2%"
  },
  button: {
    backgroundColor: "#FCD385",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: "1%",
    borderWidth: 2.5,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
    radioButton: {
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#ccc",
      backgroundColor: theme.colors.primaryColor1, 
      alignItems: "center",
      margin: 10,
    },
    selectedButton: {
      backgroundColor: theme.colors.x11Gray, 
    },
  inputStyle: {
    borderWidth: 2.5,
    borderColor: "#000",
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    color: "#000",
    backgroundColor: "#fff",
  },
  catText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  makeVisText: {
    fontSize: 20,
    fontWeight: "300",
    marginVertical: "5%"
  },
  inputCont: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 20,
  },
  datesCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  publicCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "25%",
  },
  centCont: {
    alignItems: "center",
    justifyContent: "center"
  }
});

export default EditMetadata;
