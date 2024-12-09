import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Audio } from "expo-av";
import AuthenticationContext from "./AuthenticationContext";
import FakeDatabaseContext from "./FakeDatabaseContext";
import uuid from "react-native-uuid";
import theme from "../Theme";

const EditMetadata = ({ navigation, route }) => {
  const user = useContext(AuthenticationContext);
  const [db, setDb] = useContext(FakeDatabaseContext);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [text, setText] = useState("");
  const [soundUri, setSoundUri] = useState("");
  const [sound, setSound] = useState();
  const [visibility, setVisibility] = useState("Public");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [deleteBut, setDeleteBut] = useState(false);

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
      setDeleteBut(true);
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
    const story =
      route.params.partialWrittenStory ||
      route.params.partialAudioStory ||
      route.params.partialVideoStory;
    const existingStory = db.stories.find((s) => s.id === story?.id);

    if (existingStory) {
      let updated = {
        ...existingStory,
        title,
        location,
        startDate,
        endDate,
        text,
        tags,
        audio: soundUri,
      };
      db.stories[db.stories.indexOf(existingStory)] = updated;
      setDb({ ...db });
      return;
    }

    let newStory = {
      id: uuid.v4(),
      authorId: "6618d3b5-8540-4b84-9ed8-215a7f769ee3",
      postedAt: new Date().toISOString(),
      comments: [],
      title,
      location,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      text,
      tags,
      image: route.params.partialWrittenStory?.image,
      audio: soundUri,
    };
    db.stories.push(newStory);
    setDb({ ...db });
  }

  const deleteStory = () => {
    const storyId = route.params.partialWrittenStory.id;
    const updatedStories = db.stories.filter((s) => s.id !== storyId);
    setDb({ ...db, stories: updatedStories });
    navigation.navigate("MyStories");
  };
  

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ScrollView>
            {/* Title Input */}
            <View style={styles.inputCont}>
              <Text style={styles.catText}>Title</Text>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter your title here..."
                onChangeText={setTitle}
                value={title}
              />
            </View>
    
            {/* Location Input */}
            <View style={styles.inputCont}>
              <Text style={styles.catText}>Location</Text>
              <TextInput
                style={styles.inputStyle}
                placeholder="Enter your location here..."
                onChangeText={setLocation}
                value={location}
              />
            </View>
    
            {/* Date Pickers */}
            <View style={styles.datesCont}>
              <View style={styles.inputCont}>
                <Text style={styles.catText}>Start Date</Text>
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={(_, date) => setStartDate(date || startDate)}
                />
              </View>
              <View style={styles.inputCont}>
                <Text style={styles.catText}>End Date (optional)</Text>
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="default"
                  onChange={(_, date) => setEndDate(date || endDate)}
                />
              </View>
            </View>
    
            {/* Tags Input */}
            <View style={styles.inputCont}>
              <Text style={styles.catText}>Tags</Text>
              <View style={styles.row}>
                <TextInput
                  style={styles.inputStyle}
                  placeholder="Add a tag..."
                  value={newTag}
                  onChangeText={setNewTag}
                />
                <Pressable
                  style={styles.addButton}
                  onPress={() => {
                    if (newTag.trim() && !tags.includes(newTag.trim())) {
                      setTags((prevTags) => [...prevTags, newTag.trim()]);
                      setNewTag("");
                    }
                  }}
                >
                  <Text style={styles.buttonText}>Add</Text>
                </Pressable>
              </View>
              <View style={styles.tagsContainer}>
                {tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                    <Pressable onPress={() => setTags(tags.filter((t) => t !== tag))}>
                      <Text style={styles.removeTag}>✕</Text>
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>

    
            {/* Audio Playback */}
            {soundUri ? (
              <View style={styles.inputCont}>
                <Text style={styles.catText}>Audio</Text>
                <Pressable style={styles.button} onPress={playSound}>
                  <Text style={styles.buttonText}>Play Audio</Text>
                </Pressable>
              </View>
            ) : null}
    
            {/* Visibility Options */}
            <Text style={styles.catText}>Make Visible to...</Text>
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
                  visibility === "Circle" && styles.selectedButton,
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
    
            {/* Confirm and Delete Buttons */}
            <View style={styles.centCont}>
            <Pressable
                style={styles.button}
                onPress={() => {
                  createOrUpdateStory();
                  navigation.navigate("MyStories");
                }}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </Pressable>
    
              {deleteBut && (
                <Pressable
                  style={[styles.button, styles.deleteButton]}
                  onPress={deleteStory}
                >
                  <Text style={[styles.buttonText, styles.deleteButtonText]}>
                    Delete Story
                  </Text>
                </Pressable>
              )}
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
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
    marginTop: "3%",
  },
  deleteButton: {
    backgroundColor: "#ed786f",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: "1%",
    borderWidth: 2.5,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    marginBottom: 10,
    marginTop: "3%",
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
    marginTop: "3%",
  },
  inputStyle: {
    borderWidth: 2.5,
    borderColor: "#000",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    color: "#000",
    backgroundColor: "#fff",
  },
  catText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: "2%",
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
    marginBottom: "7%",
  },
  centCont: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 5,
  },
  tag: {
    backgroundColor: theme.colors.complementColor2,
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  tagText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
    marginRight: 8,
  },
  removeTag: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#FCD385",
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
    borderWidth: 2.5,
    borderColor: "#000",
  },
  
});

export default EditMetadata;
