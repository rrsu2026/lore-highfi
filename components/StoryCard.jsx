import { Background } from "@react-navigation/elements";
import React, { useContext } from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { format } from "date-fns";
import { FontAwesome } from "@expo/vector-icons";

import theme from "../Theme";

const StoryCard = ({ navigation, story }) => {
  const [db, setDb] = useContext(FakeDatabaseContext);
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
        {story.text && <Text style={styles.locationText}>
          <FontAwesome name="pencil" size={16} color="black" />{" "}
          Text
        </Text>}
        {story.audio && <Text style={styles.locationText}>
          <FontAwesome name="microphone" size={16} color="black" />{" "}
          Audio
        </Text>}
        {story.video && <Text style={styles.locationText}>
          <FontAwesome name="video-camera" size={16} color="black" />{" "}
          Video
        </Text>}
      </View>
      <View style={styles.textCont}>
        <Text style={styles.text1} numberOfLines={1} ellipsizeMode="tail">
          {story.title}
        </Text>
        <Text style={styles.locationText}>
          <FontAwesome name="map-marker" size={14} color="#eb4634" />{" "}
          {story.location}
        </Text>
      </View>
      <View style={styles.textCont}>
        <Text style={styles.authorText} numberOfLines={1} ellipsizeMode="tail">
          {db.users.find((user) => user.id == story.authorId).name}
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
    padding: 10, // Optional padding for better spacing
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between", // Position elements to the left and right
    alignItems: "center", // Align items vertically
    marginBottom: 5, // Optional spacing below
  },
  textCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Align text vertically
  },
  text1: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: "2%",
    flex: 1, // Allow text to take available space
  },
  textYear: {
    fontSize: 16,
    fontWeight: "500",
  },
  locationText: {
    fontSize: 14,
    flex: 1,
    textAlign: "right", // Align text to the right
    marginLeft: 10, // Add space between the year and location
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
