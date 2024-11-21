import React, { useContext } from "react";
import { View, SafeAreaView, Pressable, StyleSheet, Text } from "react-native";
import StoriesDisplayTimeline from "./StoriesDisplayTimeline";
import FakeDatabaseContext from "./FakeDatabaseContext";
import AntDesign from "@expo/vector-icons/AntDesign";

import theme from "../Theme";

const HomePage = ({ navigation }) => {
  const db = useContext(FakeDatabaseContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerCont}>
        <Pressable
          style={styles.shareStoryButton}
          onPress={() => navigation.navigate("StoryFormatChoice")}
        >
          <AntDesign
            name="addfile"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.shareStoryText}>Share Your Story</Text>
        </Pressable>
      </View>
      <Text style={styles.subAuthorText}>Subscribed Authors:</Text>

      <View style={styles.contentCont}>
        <View style={styles.yellowLine} />
        <StoriesDisplayTimeline navigation={navigation} stories={db.stories} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentCont: {
    flex: 1,
    flexDirection: "row",
  },
  headerCont: {
    justifyContent: "center",
    alignItems: "center",
  },
  yellowLine: {
    width: 15,
    backgroundColor: theme.colors.complementColor2,
    marginLeft: 20,
    borderRadius: 2,
    borderColor: theme.colors.chineseBlack,
    borderWidth: 2.5,
  },
  shareStoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.complementColor2,
    width: "60%",
    borderRadius: 10,
    marginVertical: "5%",
    paddingVertical: "4%",
    paddingHorizontal: 20,
    borderWidth: 3,
    borderColor: "#000",
  },
  shareStoryText: {
    fontSize: 16,
    color: "black",
    fontWeight: "semibold",
  },
  subAuthorText: {
    fontSize: 16,
    color: "black",
    fontWeight: "500",
    textAlign: "left",
    marginLeft: "5%",
    marginBottom: "3%",
  },
  icon: {
    marginRight: 10,
  },
});

export default HomePage;
