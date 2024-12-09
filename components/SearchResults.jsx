import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import TabbedCardList from "./TabbedCardList";
import FakeDatabaseContext from "./FakeDatabaseContext";
import theme from "../Theme.js";

const SearchResults = ({ navigation, route }) => {
  const [db] = useContext(FakeDatabaseContext);
  const query = route.params.query?.trim().toLowerCase();

  const getSearchResults = (query) => {
    if (!query) return [];
    return db.stories.filter((story) => {
      const author = db.users.find((user) => user.id === story.authorId);
      return (
        story.title?.toLowerCase().includes(query) ||
        author?.name?.toLowerCase().includes(query) ||
        story.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
        story.text?.toLowerCase().includes(query.toLowerCase())
      );
    });
  };

  const searchResults = getSearchResults(query);

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>
        {query ? `Results for "${route.params.query}"` : "No search term entered."}
      </Text>
      {query && searchResults.length === 0 ? (
        <Text style={styles.noResultsText}>No results found.</Text>
      ) : (
        <TabbedCardList
          style={styles.container}
          navigation={navigation}
          stories={searchResults}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primaryColor1,
  },
  resultText: {
    fontSize: 20,
    color: "black",
    fontWeight: "500",
    textAlign: "left",
    marginLeft: "2%",
    marginBottom: "3%",
    marginTop: "5%",
  },
  noResultsText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginTop: "5%",
  },
});

export default SearchResults;
