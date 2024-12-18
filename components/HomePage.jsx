import React, { useContext } from "react";
import { View, SafeAreaView, Pressable, StyleSheet, Text } from "react-native";
import StoriesDisplayTimeline from "./StoriesDisplayTimeline";
import FakeDatabaseContext from "./FakeDatabaseContext";
import AntDesign from "@expo/vector-icons/AntDesign";

import theme from "../Theme";
import TabbedCardList from "./TabbedCardList";

const HomePage = ({ navigation }) => {
  const [db, setDb] = useContext(FakeDatabaseContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerCont}>
      </View>
      <Text style={styles.subAuthorText}>Stories From Subscribed Authors:</Text>

      <TabbedCardList
        style={styles.container}
        navigation={navigation}
        stories={db.stories}
      />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primaryColor1,
  },
  contentCont: {
    flex: 1,
    flexDirection: "row",
  },
  headerCont: {
    justifyContent: "center",
    alignItems: "center",
  },
shareStoryButton: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.complementColor2,
    width: "60%",
    borderRadius: 10,
    paddingVertical: "4%",
    paddingHorizontal: 20,
    borderWidth: 3,
    borderColor: "#000",
    zIndex: 1,
  },
  shareStoryText: {
    fontSize: 16,
    color: "black",
    fontWeight: "semibold",
  },
  subAuthorText: {
    fontSize: 18,
    color: "black",
    fontWeight: "500",
    textAlign: "left",
    marginLeft: "5%",
    marginVertical: "5%",
  },
  icon: {
    marginRight: 10,
  },
});

export default HomePage;
