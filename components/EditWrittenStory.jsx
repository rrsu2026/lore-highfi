import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import theme from "../Theme";

const EditWrittenStory = ({ navigation, route }) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  // Check if the last screen was Scan.jsx
  const fromScanPage = route.params?.fromScan || false;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
      <ScrollView>
        {fromScanPage && (
          <Text style={styles.warningText}>
            Please check to make sure this is correct
          </Text>
        )}
        <Text style={styles.label}>Image (Optional)</Text>
        <Pressable style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageButtonText}>Click to attach</Text>
        </Pressable>
        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
        <Text style={styles.label}>Text</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setText}
          value={text}
          placeholder="Type your story here..."
          multiline
        />
        <Pressable
          style={styles.saveButton}
          onPress={() =>
            navigation.navigate("EditMetadata", { partialWrittenStory: { image, text } })
          }
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.colors.grayBg,
  },
  warningText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imageButton: {
    backgroundColor: theme.colors.complementColor2,
    padding: 10,
    borderRadius: 8,
    borderWidth: 2.5,
    alignItems: "center",
    marginBottom: 20,
  },
  imageButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  imagePreview: {
    width: "100%",
    aspectRatio: 16 / 9,
    resizeMode: "contain",
    borderRadius: 8,
    marginVertical: 20,
  },
  textInput: {
    borderWidth: 2.5,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    height: 200,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: theme.colors.complementColor2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2.5,
    padding: 15,
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default EditWrittenStory;
