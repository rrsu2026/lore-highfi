import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const NewComment = ({ navigation, route }) => {
  const [text, setText] = useState("");
  const [db, setDb] = useContext(FakeDatabaseContext);
  const user = useContext(AuthenticationContext);
  const [created, setCreated] = useState(false);

  function createComment() {
    const dbClone = structuredClone(db);
    dbClone.stories.find(story =>
      story.id === route.params.story.id
    ).comments.push({ text, author: user.id });
    setDb(dbClone);
    setCreated(true);
  }

  useEffect(() => {
    if (created) {
      navigation.navigate("ViewStory", {
        story: db.stories.find(story =>
          story.id === route.params.story.id // Because I'm not sure if the param will have updated by now
        ),
        justCommented: true
      });
    }
  }, [created]);

  return (
    <View>
      <Text>
        Write a comment
        <TextInput onChangeText={setText} />
      </Text>
      <Button title={`Share with ${db.users.find(u => u.id == route.params.story.author).name}`} onPress={createComment} />
    </View>
  );
};

export default NewComment;