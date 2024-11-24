import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import theme from "../Theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const TextInputChoice = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Text</Text>
      <Text style={styles.subheaderText}>
        How would you like to input your text?
      </Text>
      <Pressable
        style={styles.choiceButton}
        onPress={() => navigation.navigate("EditWrittenStory")}
      >
        <Text style={styles.buttonText}>Type</Text>
        <MaterialCommunityIcons name="form-textbox" size={50} color="black" />
      </Pressable>
      <Pressable
        style={styles.choiceButton}
        onPress={() => navigation.navigate("Scan")}
      >
        <Text style={styles.buttonText}>Scan</Text>
        <MaterialCommunityIcons name="camera-plus" size={50} color="black" />
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
  subheaderText: {
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: "5%",
    paddingHorizontal: "10%",
    paddingBottom: "2%",
  },
  buttonText: {
    fontSize: 30,
    paddingLeft: "5%",
  },
});

export default TextInputChoice;
