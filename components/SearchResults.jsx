import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import TabbedCardList from "./TabbedCardList";
import FakeDatabaseContext from "./FakeDatabaseContext";

const SearchResults = ({ navigation, route }) => {
  const [db, setDb] = useContext(FakeDatabaseContext);
  const getSearchResults = (query) => {
    return db.stories.filter((story) => {
      const queryLower = query.toLowerCase();
      return (
        story.title?.toLowerCase().includes(queryLower) ||
        db.users
          .find((user) => user.id == story.author)
          .name?.toLowerCase()
          .includes(queryLower) ||
        story.tags?.map((tag) => tag.toLowerCase()).includes(queryLower) ||
        story.text.toLowerCase().includes(queryLower)
      );
    });
  };
  return (
    <View>
      <Text>Results for "{route.params.query}"</Text>
      <TabbedCardList
        style={styles.container}
        navigation={navigation}
        stories={getSearchResults(route.params.query)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: "red",
  },
});

export default SearchResults;
