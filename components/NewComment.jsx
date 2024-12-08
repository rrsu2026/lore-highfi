import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Pressable } from 'react-native';

const NewComment = ({ navigation, route }) => {
  const [text, setText] = useState("");
  const [db, setDb] = useContext(FakeDatabaseContext);
  const [user, setUser] = useContext(AuthenticationContext);
  const [created, setCreated] = useState(false);

  function createComment() {
    const dbClone = JSON.parse(JSON.stringify(db));
    dbClone.stories.find(story =>
      story.id === route.params.story.id
    ).comments.push({ text, authorId: user.id });
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
      <View style={styles.commentCont}>
      <Text style={styles.headerText}>
        Write a comment to "{route.params.story.title}" by {db.users.find(u => u.id == route.params.story.authorId).name}!
      </Text>
      <TextInput style={styles.inputStyle} onChangeText={setText} />
      </View>
      <Pressable style={styles.button} onPress={createComment}>
        <Text style={styles.buttonText}>Share</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  commentCont: {
    flexDirection: "column"
  },
  inputStyle: {
    borderWidth: 2.5,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    height: 250,
    marginHorizontal: "4%",
    textAlignVertical: "top",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "300",
    marginVertical: "3%",
    textAlign: "center"
  },
  button: {
    backgroundColor: "#FCD385",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: "1%",
    borderWidth: 2.5,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "45%",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
});

export default NewComment;