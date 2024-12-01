import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import theme from "../Theme";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Audio } from 'expo-av';

const RecordAudio = ({ navigation }) => {

  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [audio, setAudio] = useState(null);

  async function startRecording() {
    // https://docs.expo.dev/versions/latest/sdk/audio-av/
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    setAudio(uri);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Recording...</Text>
      <View style={styles.pauseCont}>
        <Pressable style={styles.choiceButton}>
          <Text style={styles.buttonText}>Pause</Text>
          <FontAwesome name="pause" size={30} color="black" />
        </Pressable>
        <Pressable style={styles.choiceButton} onPress={startRecording}>
          <Text style={styles.buttonText}>Start</Text>
          <FontAwesome name="pause" size={30} color="black" />
        </Pressable>
        <Pressable style={styles.choiceButton} onPress={stopRecording}>
          <Text style={styles.buttonText}>Stop</Text>
          <FontAwesome name="pause" size={30} color="black" />
        </Pressable>
        <Pressable
          style={styles.choiceButton}
          onPress={() => navigation.navigate("EditMetadata", { partialAudioStory: { uri: audio } })}
        >
          <Text style={styles.buttonText}>Save</Text>
          <Entypo name="save" size={35} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  pauseCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  choiceButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.complementColor2,
    paddingVertical: 12,
    paddingHorizontal: "2%",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
    marginBottom: 15,
    gap: "10%",
  },
  headerText: {
    fontSize: 24,
    textAlign: "center",
    marginHorizontal: "5%",
    paddingHorizontal: "10%",
    paddingVertical: "5%",
  },
  buttonText: {
    fontSize: 24,
  },
});

export default RecordAudio;
