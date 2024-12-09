import React, { useContext } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import AuthenticationContext from './AuthenticationContext';
import FakeDatabaseContext from './FakeDatabaseContext';

const ViewComment = ({ navigation, route }) => {
  const [user, setUser] = useContext(AuthenticationContext);
  const [db, setDb] = useContext(FakeDatabaseContext);
  const comment = route.params.story.comments.find(
    (comment) => comment.authorId === user.id
  );

  const deleteComment = () => {
    // Find the story
    const storyIndex = db.stories.findIndex(
      (story) => story.id === route.params.story.id
    );
    if (storyIndex !== -1) {
      // Remove the comment from the story's comments array
      const updatedComments = db.stories[storyIndex].comments.filter(
        (c) => c.id !== comment.id
      );
      // Update the story with the new comments array
      const updatedStory = {
        ...db.stories[storyIndex],
        comments: updatedComments,
      };
      // Update the database
      const updatedStories = [...db.stories];
      updatedStories[storyIndex] = updatedStory;
      setDb({ ...db, stories: updatedStories });
      // Navigate back or show a confirmation
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Your response to "{route.params.story.title}" posted by{' '}
        {db.users.find((u) => u.id == route.params.story.authorId).name}
      </Text>
      <Text style={styles.commentText}>{comment.text}</Text>
      <Pressable style={styles.deleteButton} onPress={deleteComment}>
        <Text style={styles.buttonText}>Delete Comment</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '300',
    marginVertical: '3%',
    textAlign: 'center',
  },
  commentText: {
    fontSize: 18,
    textAlign: 'left',
    paddingTop: '5%',
    paddingHorizontal: '3%',
  },
  deleteButton: {
    backgroundColor: '#ed786f',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: '1%',
    borderWidth: 2.5,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    marginBottom: 10,
    marginTop: '8%',
    alignSelf: 'center', // Center the button horizontally
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});

export default ViewComment;
