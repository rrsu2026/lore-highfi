import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import theme from "../Theme";

const RecordVideo = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);

  // Request Permissions
  React.useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryStatus.status === "granted");
    })();
  }, []);

  // Start Video Recording
  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setIsRecording(true);
        const video = await cameraRef.current.recordAsync();
        console.log("Video recorded at: ", video.uri);
        setIsRecording(false);
        saveVideo(video.uri);
      } catch (error) {
        console.error("Error recording video:", error);
        setIsRecording(false);
      }
    }
  };

  // Stop Video Recording
  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
    }
  };

  // Save Video to Library and Navigate
  const saveVideo = async (uri) => {
    if (hasMediaLibraryPermission) {
      await MediaLibrary.createAssetAsync(uri);
    }
    navigation.navigate("EditMetadata", { partialVideoStory: { uri } });
  };

  if (hasCameraPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={cameraRef}
      >
        <View style={styles.controls}>
          {isRecording ? (
            <Pressable style={styles.stopButton} onPress={stopRecording}>
              <Text style={styles.buttonText}>Stop</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.startButton} onPress={startRecording}>
              <Text style={styles.buttonText}>Record</Text>
            </Pressable>
          )}
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  controls: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 20,
  },
  startButton: {
    backgroundColor: theme.colors.complementColor2,
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  stopButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default RecordVideo;
