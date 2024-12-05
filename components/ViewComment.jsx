import React, { useContext } from 'react';
import { View, Text, StyleSheet} from 'react-native';

const NewComment = ({ navigation, route }) => {
  const user = useContext(AuthenticationContext);
  const [db, setDb] = useContext(FakeDatabaseContext);
  const comment = route.params.story.comments.find(comment =>
    comment.authorId === user.id
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your response to "{route.params.story.title}" posted by {db.users.find(u => u.id == route.params.story.authorId).name}</Text>
      <Text style={styles.commentText}>{comment.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
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
  commentText: {
    fontSize: 18,
    textAlign: "left",
    paddingTop: "5%",
    paddingHorizontal: "3%",
  }
});

export default NewComment;
