import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CommentCard = ({ authorName, commentText }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.author}>{authorName}</Text>
      <Text style={styles.comment}>{commentText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  comment: {
    fontSize: 16,
    color: '#333',
  },
});

export default CommentCard;
