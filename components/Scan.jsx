import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import theme from "../Theme";


const RecordVideo = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Take a clear photo of your written story</Text>
      <View style={styles.scanArea}>
        {/* Placeholder for the scanning area */}
      </View>
      <Pressable
        style={styles.scanButton}
        onPress={() => navigation.navigate("EditWrittenStory")}
      >
        <Text style={styles.scanButtonText}>Scan</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "semibold",
    textAlign: "center",
    marginVertical: 20,
  },
  scanArea: {
    width: "90%",
    height: 350,
    borderWidth: 2,
    borderColor: "#000",
    borderStyle: "solid",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  scanButton: {
    backgroundColor: theme.colors.complementColor2,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    borderWidth: 2.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  scanButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default RecordVideo;
