import { Background } from "@react-navigation/elements";
import React, { useContext } from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { format } from "date-fns";

import theme from "../Theme";

const StoryCard = ({ navigation, story }) => {
  const db = useContext(FakeDatabaseContext);
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate("ViewStory", { story: story })}
      accessible={true}
      accessibilityLabel={`View story titled ${story.title}`}
    >
      {story.occurrencedAt &&
        <Text style={styles.textYear}>
          {format(new Date(story.occurrencedAt), "yyyy")}
        </Text>
      }
      <View style={styles.textCont}>
        <Text style={styles.text1}>{story.title}</Text>
        {/*<Text>
        {(story.text && "Text") ||
          (story.audio && "Audio") ||
          (story.video && "Video")}
      </Text> */}
        <Text>{story.location}</Text>
      </View>
      <View style={styles.textCont}>
        <Text>{db.users.find((user) => user.id == story.author).name}</Text>
        <Text>{format(new Date(story.postedAt), "MMM d, yyyy")}</Text>
      </View>
      {/* TODO: Find a way to make this whole element clickable without breaking a11y */}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primaryColorBg,
    marginBottom: "3%",
  },
  textCont: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text1: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: "2%",
  },
  textYear: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: "2%",
  },
});

export default StoryCard;
