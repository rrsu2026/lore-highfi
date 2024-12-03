import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import theme from "../Theme";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Audio } from 'expo-av';

const RecordAudio = ({ navigation }) => {

  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [hasStartedRecording, setHasStartedRecording] = useState(false);

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
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setHasStartedRecording(true);
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
    return uri;
  }

  return (
    <View style={styles.container}>
      {hasStartedRecording ?
        <View>
          <Text style={styles.headerText}>Recording...</Text>
          <View style={styles.pauseCont}>
            <Pressable style={styles.choiceButton} onPress={() => { alert("not implemented"); }}>
              <Text style={styles.buttonText}>Pause</Text>
              <FontAwesome name="pause" size={30} color="black" />
            </Pressable>
            <Pressable
              style={styles.choiceButton}
              onPress={async () => {
                const audio = await stopRecording();
                navigation.navigate("EditMetadata", { partialAudioStory: { uri: audio } });
              }}
            >
              <Text style={styles.buttonText}>Save</Text>
              <Entypo name="save" size={35} color="black" />
            </Pressable>
          </View>
        </View>
        :
        <View style={styles.container}>
          <Text style={styles.headerText}>Audio</Text>
          <Pressable
            style={styles.startRecordingButton}
            onPress={startRecording}
          >
            <Text style={styles.buttonText}>Start Recording</Text>
            <View style={styles.icon}>
              <View style={styles.innerCircle} />
            </View>
          </Pressable>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
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
  startRecordingButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.complementColor2,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
    width: "80%",
    marginBottom: 15,
    gap: "5%",
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: theme.colors.gray,
    borderColor: "black",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: "red",
  },
});

export default RecordAudio;
