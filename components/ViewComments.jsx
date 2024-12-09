import React, { useContext } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import FakeDatabaseContext from './FakeDatabaseContext';
import CommentCard from './CommentCard';

const ViewComments = ({ navigation, route }) => {
  const [db] = useContext(FakeDatabaseContext);
  const { story } = route.params;

  const renderComment = ({ item }) => {
    const author = db.users.find(u => u.id === item.authorId);
    const authorName = author ? author.name : 'Unknown Author';
    return (
      <CommentCard
        authorName={authorName}
        commentText={item.text}
      />
    );
  };

  return (
    <View style={styles.container}>
      {story.comments && story.comments.length > 0 ? (
        <FlatList
          data={story.comments}
          renderItem={renderComment}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text>No comments</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ViewComments;
