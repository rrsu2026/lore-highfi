import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewComment = ({ navigation, route }) => {
  return (
    <View>
      {
        route.params.story.comments?.map((comment, index) => (
          <Text key={index}>{comment.text}</Text>
        )) || <Text>No comments</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
});

export default NewComment;
