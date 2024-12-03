import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { format } from "date-fns";
import StoryText from "./StoryText";
import StoryAudio from "./StoryAudio";
import theme from "../Theme";

const ViewStory = ({ navigation, route }) => {
  const db = useContext(FakeDatabaseContext);
  return (
    <View style={styles.container}>
      <View style={styles.headerCont}>
        <Text style={styles.titleText}>{route.params.story.title}</Text>
        <Text style={styles.infoText}>
          By{" "}
          {db.users.find((user) => user.id == route.params.story.author).name}
        </Text>
        <Button title="Edit" onPress={() => navigation.navigate("EditMetadata", {
          partialWrittenStory: route.params.story,
          partialAudioStory: route.params.story,
          partialVideoStory: route.params.story,
        })} />
        <View style={styles.spaceSaveCont}>
          <Text style={styles.infoText}>
            {format(new Date(route.params.story.occurrencedAt), "yyyy")}
          </Text>
          <Text style={styles.infoText}> {route.params.story.location}</Text>
        </View>
      </View>
      {route.params.story.text && <StoryText text={route.params.story.text} />}
      {route.params.story.audio && (
        <StoryAudio audio={route.params.story.audio} />
      )}
      {route.params.story.video && (
        <StoryVideo video={route.params.story.video} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "3%",
  },
  headerCont: {
    paddingBottom: "4%",
    borderBottomColor: theme.colors.primaryColor5,
    borderBottomWidth: 3,
  },
  spaceSaveCont: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "500",
  },
  infoText: {
    fontSize: 14,
    padding: 1,
  },
});

export default ViewStory;
