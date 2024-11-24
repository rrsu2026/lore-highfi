import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import theme from "../Theme";

const StartVideoRecording = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Video</Text>
      <Pressable
        style={styles.choiceButton}
        onPress={() => navigation.navigate("RecordVideo")}
      >
        <Text style={styles.buttonText}>Start Recording</Text>
        <View style={styles.icon}>
          <View style={styles.innerCircle} />
        </View>
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
  headerText: {
    fontSize: 24,
    textAlign: "center",
    marginHorizontal: "5%",
    paddingHorizontal: "10%",
    paddingVertical: "5%",
  },
  buttonText: {
    fontSize: 30,
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

export default StartVideoRecording;
