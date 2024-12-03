import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import theme from "../Theme";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const StoryFormatChoice = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        How would you like to share your story?
      </Text>
      <Pressable
        style={styles.choiceButton}
        onPress={() => navigation.navigate("TextInputChoice")}
      >
        <Text style={styles.buttonText} t>
          Text
        </Text>
        <Entypo name="pencil" size={50} color="black" />
      </Pressable>
      <Pressable
        style={styles.choiceButton}
        onPress={() => navigation.navigate("RecordAudio")}
      >
        <Text style={styles.buttonText}>Audio</Text>
        <FontAwesome6 name="microphone" size={45} color="black" />
      </Pressable>
      <Pressable
        style={styles.choiceButton}
        onPress={() => navigation.navigate("StartVideoRecording")}
      >
        <Text style={styles.buttonText}>Video</Text>
        <FontAwesome name="video-camera" size={40} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  choiceButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors.complementColor2,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
    width: "80%",
    marginBottom: 15,
  },
  headerText: {
    fontSize: 24,
    textAlign: "center",
    marginHorizontal: "5%",
    paddingHorizontal: "10%",
    paddingVertical: "5%",
  },
  buttonText: {
    fontSize: 30,
    paddingLeft: "5%",
  },
});

export default StoryFormatChoice;
