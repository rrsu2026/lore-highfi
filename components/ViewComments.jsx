import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NewComment = ({ navigation, route }) => {
  const [db, setDb] = useContext(FakeDatabaseContext);
  return (
    <View>
      {
        route.params.story.comments?.map((comment, index) => (
          <View key={index}>
            <Text>{db.users.find(u => u.id == route.params.story.authorId).name}</Text>
            <Text>{comment.text}</Text>
          </View>
        )) || <Text>No comments</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
});

export default NewComment;
