import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfileCard = ({ user }) => {
  if (!user) {
    return <Text>Loading...</Text>;
  }

  const imageSource = user.pfp ? user.pfp : require('../assets/default_pfp.jpg');

  return (
    <View style={styles.card}>
      <Image
        source={imageSource}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.location}>{user.location}</Text>
      <Text style={styles.age}>Age: {user.age}</Text>
      <Text style={styles.about}>{user.about}</Text>
      <View style={styles.tagsContainer}>
        {user.tags.map((tag, index) => (
          <Text key={index} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    borderWidth: 2.5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  age: {
    fontSize: 14,
    color: '#666',
  },
  about: {
    fontSize: 14,
    marginVertical: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginTop: 4,
    fontSize: 12,
  },
});

export default ProfileCard;
