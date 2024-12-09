import React, { useRef} from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import StoryCard from "./StoryCard";
import theme from "../Theme.js";

const StoriesDisplayRecent = ({ navigation, stories }) => {
  const scrollViewRef = useRef();
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 300 }}>
        {stories.map((story) => (
          <View style={styles.cardContainer} key={story.id || story.title}>
            <StoryCard key={story.id} navigation={navigation} story={story} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollCont: {
    paddingBottom: "30%",
  },
  cardContainer: {
    borderWidth: 3,
    borderColor: theme.colors.chineseBlack,
    borderRadius: 10,
    padding: 10,
    backgroundColor: theme.colors.primaryColorBg,
    margin: 10,
  },
});

export default StoriesDisplayRecent;
