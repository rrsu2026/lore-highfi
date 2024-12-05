import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const EditWrittenStory = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  const pickImage = async () => {
    // https://docs.expo.dev/versions/latest/sdk/imagepicker/
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result); // expand the base64 in your console if you want to crash your browser :>

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imageButton: {
    backgroundColor: "#FFD966",
    padding: 10,
    borderRadius: 8,
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
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginVertical: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    height: 150,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#FFD966",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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