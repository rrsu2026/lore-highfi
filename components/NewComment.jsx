import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const NewComment = ({ navigation, route }) => {
  const [text, setText] = useState("");
  const [db, setDb] = useContext(FakeDatabaseContext);
  const [created, setCreated] = useState(false);

  function createComment() {
    const dbClone = structuredClone(db);
    dbClone.stories.find(story =>
      story.id === route.params.story.id
    ).comments.push({ text });
    setDb(dbClone);
    setCreated(true);
  }

  useEffect(() => {
    if (created) {
      navigation.navigate("ViewComments", {
        story: db.stories.find(story =>
          story.id === route.params.story.id
        )
      });
    }
  }, [created]);

  return (
    <View>
      <Text>
        Write a comment
        <TextInput onChangeText={setText} />
      </Text>
      <Button title="Save" onPress={createComment} />
    </View>
  );
};

export default NewComment;