import React, { useContext } from "react";
import { View, Text, StyleSheet, Button, Pressable, Image } from "react-native";
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
        <View style={styles.row}>
          {user.id === route.params.story.authorId && (
            <Pressable
              style={styles.button}
              onPress={() =>
                navigation.navigate("EditMetadata", {
                  partialWrittenStory: route.params.story,
                  partialAudioStory: route.params.story,
                  partialVideoStory: route.params.story,
                })
              }
            >
              <Text style={styles.buttonText}>Edit</Text>
            </Pressable>
          )}
          {user.id === route.params.story.authorId && (
            <Pressable
              style={styles.button}
              onPress={() =>
                navigation.navigate("ViewComments", { story: route.params.story })
              }
            >
              <Text style={styles.buttonText}>View Responses</Text>
            </Pressable>
          )}

          <Pressable style={styles.button} onPress={() => navigation.navigate("NewComment", { story: route.params.story })} >
            <Text style={styles.buttonText}>Comment</Text>
          </Pressable>
        </View>
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
          <View style={styles.responseNotif}>
            <Text>Response sent!</Text>
            <Pressable
              style={styles.button}
              onPress={() =>
                navigation.navigate("ViewComment", { story: route.params.story })
              }
            >
              <Text style={styles.buttonText}>View your response</Text>
            </Pressable>
          </View>
        }
      </View>
      {route.params.story.image && <Image source={{ uri: route.params.story.image }} style={styles.image} />}
      {route.params.story.text || route.params.story.image && <StoryText text={route.params.story.text} />}
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
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    resizeMode: "contain",
    marginVertical: "1rem",
  },
  responseNotif: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    justifyContent: "space-between",
    backgroundColor: theme.colors.primaryColor1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
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
  row: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
  },
  tagsContainer: {
    flexDirection: "row",
    marginTop: 15,
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "#FCD385",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 8,
    marginHorizontal: 5,
    borderWidth: 2.5,
    width: "fit-content",
  },
  buttonText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "400",
  },
});

export default ViewStory;
