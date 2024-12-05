import React, { useContext } from 'react';
import { View, Text } from 'react-native';

const NewComment = ({ navigation, route }) => {
  const user = useContext(AuthenticationContext);
  const [db, setDb] = useContext(FakeDatabaseContext);
  const comment = route.params.story.comments.find(comment =>
    comment.authorId === user.id
  );

  return (
    <View>
      <Text>Your response to "{route.params.story.title}" posted by {db.users.find(u => u.id == route.params.story.authorId).name}</Text>
      <Text>{comment.text}</Text>
    </View>
  );
};

export default NewComment;
