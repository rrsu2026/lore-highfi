import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { format } from "date-fns";
import { FontAwesome } from "@expo/vector-icons";
import theme from "../Theme";

const StoryCard = ({ navigation, story }) => {
  const [db, setDb] = useContext(FakeDatabaseContext);

  const author = db.users.find((user) => user.id == story.authorId);
  const authorName = author ? author.name : 'Unknown Author';

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate("ViewStory", { story: story })}
      accessible={true}
      accessibilityLabel={`View story titled ${story.title}`}
    >
      <View style={styles.topRow}>
        {story.startDate && (
          <Text style={styles.textYear}>
            {format(new Date(story.startDate), "yyyy")}
          </Text>
        )}
        <View>
        {story.text && (
          <Text style={styles.locationText}>
            <FontAwesome name="pencil" size={16} color="black" /> Text
          </Text>
        )}
        {story.audio && (
          <Text style={styles.locationText}>
            <FontAwesome name="microphone" size={16} color="black" /> Audio
          </Text>
        )}
        {story.video && (
          <Text style={styles.locationText}>
            <FontAwesome name="video-camera" size={16} color="black" /> Video
          </Text>
        )}
          <Text style={styles.locationText}>
            <FontAwesome name="map-marker" size={14} color="#eb4634" />{" "}
                {story.location}
          </Text>
          </View>
      </View>
      <View style={styles.textCont}>
        <Text style={styles.text1} numberOfLines={1} ellipsizeMode="tail">
          {story.title}
        </Text>
      </View>
      <View style={styles.textCont}>
        <Text style={styles.authorText} numberOfLines={1} ellipsizeMode="tail">
          {authorName}
        </Text>
        <Text style={styles.dateText}>
          {story.postedAt
            ? format(new Date(story.postedAt), "MMM d, yyyy")
            : `Invalid date: ${story.postedAt}`}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primaryColorBg,
    marginBottom: "3%",
    padding: 10,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  textCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text1: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: "2%",
    flex: 1,
  },
  textYear: {
    fontSize: 16,
    fontWeight: "500",
  },
  locationText: {
    fontSize: 14,
    flex: 1,
    textAlign: "right",
    marginLeft: 10,
  },
  authorText: {
    fontSize: 14,
    flex: 1,
  },
  dateText: {
    fontSize: 14,
    color: "#888",
  },
});

export default StoryCard;
