import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

const NewComment = ({ navigation, route }) => {
  const [text, setText] = useState("");

  function createComment() {
    if (!route.params.story.comments) {
      route.params.story["comments"] = [];
      console.log("story", route.params.story);
    }
    route.params.story.comments.push({ text });
    console.log("updated story", route.params.story);
  }

  return (
    <View>
      <Text>
        Write a comment
        <TextInput onChangeText={setText} />
      </Text>
      <Button title="Save" onPress={() => {
        createComment();
        navigation.navigate("ViewComments", { story: route.params.story });
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default NewComment;