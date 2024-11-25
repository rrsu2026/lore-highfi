import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import theme from "../Theme";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const RecordAudio = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Recording...</Text>
      <View style={styles.pauseCont}>
        <Pressable style={styles.choiceButton}>
          <Text style={styles.buttonText}>Pause</Text>
          <FontAwesome name="pause" size={30} color="black" />
        </Pressable>
        <Pressable
          style={styles.choiceButton}
          onPress={() => navigation.navigate("EditMetadata")}
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
