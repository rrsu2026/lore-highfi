import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const EditWrittenStory = ({ navigation }) => {
  const [image, setImage] = useState(null);

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
    <View>
      {/* TODO: Optional "make sure that this is correct" if the story was prefilled by scan */}
      <Text>
        Image (optional)
        <Button title="Pick an Image" onPress={pickImage} />
      </Text>
      <Text>
        Text
        <TextInput />
      </Text>
      <Button title="Save" onPress={() => navigation.navigate("EditMetadata")} />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default EditWrittenStory;