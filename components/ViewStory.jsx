import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { format } from "date-fns";
import StoryText from "./StoryText";
import StoryAudio from "./StoryAudio";
import theme from "../Theme";
import AuthenticationContext from "./AuthenticationContext";
import Tag from "./Tag.jsx";

const ViewStory = ({ navigation, route }) => {
  const [db, setDb] = useContext(FakeDatabaseContext);
  const user = useContext(AuthenticationContext);
  return (
    <View style={styles.container}>
      <View style={styles.headerCont}>
        <Text style={styles.titleText}>{route.params.story.title}</Text>
        <Text style={styles.infoText}>
          By{" "}
          {db.users.find((user) => user.id == route.params.story.authorId).name}
        </Text>
        {user.id === route.params.story.authorId && (
          <View>
            <Button
              title="Edit"
              onPress={() =>
                navigation.navigate("EditMetadata", {
                  partialWrittenStory: route.params.story,
                  partialAudioStory: route.params.story,
                  partialVideoStory: route.params.story,
                })
              }
            />
            <Button
              title="View Responses"
              onPress={() =>
                navigation.navigate("ViewComments", { story: route.params.story })
              }
            />
          </View>
        )}
        <View style={styles.spaceSaveCont}>
          <Text style={styles.infoText}>
            {route.params.story.startDate
              ? format(new Date(route.params.story.startDate), "yyyy")
              : `Invalid date: ${route.params.story.startDate}`}
          </Text>
          <Text style={styles.infoText}> {route.params.story.location}</Text>
        </View>
        <View style={styles.tagsContainer}>
          {route.params.story.tags?.map((tag, index) => (
            <Tag key={index} navigation={navigation} title={tag} />
          ))}
        </View>
        {route.params.justCommented &&
          <View>
            <Text>Response sent!</Text>
            <Button
              title="View your response"
              onPress={() =>
                navigation.navigate("ViewComment", { story: route.params.story })
              }
            />
          </View>
        }
      </View>
      {route.params.story.text && <StoryText text={route.params.story.text} />}
      {route.params.story.audio && (
        <StoryAudio audio={route.params.story.audio} />
      )}
      {route.params.story.video && (
        <StoryVideo video={route.params.story.video} />
      )}
      <Button title="Comment" onPress={() => navigation.navigate("NewComment", { story: route.params.story })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "3%",
    paddingBottom: "60%",
  },
  headerCont: {
    paddingBottom: "1%",
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
  tagsContainer: {
    flexDirection: "row",
    marginTop: 15,
    flexWrap: "wrap",
  },
});

export default ViewStory;
