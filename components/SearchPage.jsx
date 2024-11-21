import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import theme from "../Theme";

const SearchPage = ({ navigation }) => {
  const [query, setQuery] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Search</Text>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() =>
            navigation.navigate("SearchResults", { query })
          }
          placeholder="Type something..."
        />

        {/* Search Button */}
        <Pressable
          style={styles.searchButton}
          onPress={() => navigation.navigate("SearchResults", { query })}
        >
          <Text style={styles.buttonText}>🔎</Text>
        </Pressable>
      </View>

      <Text style={styles.suggestionsHeader}>Suggestions</Text>

      {/* Suggestions */}
      <View style={styles.suggestionsContainer}>
        <Pressable
          style={styles.suggestionButton}
          onPress={() => navigation.navigate("SliceOfLifeSearch")}
        >
          <Text style={styles.buttonText}>Slice of Life</Text>
        </Pressable>
        <Pressable
          style={styles.suggestionButton}
          onPress={() =>
            navigation.navigate("SearchResults", { query: "Chinese-American" })
          }
        >
          <Text style={styles.buttonText}>Chinese-American</Text>
        </Pressable>
        <Pressable
          style={styles.suggestionButton}
          onPress={() =>
            navigation.navigate("SearchResults", { query: "Wisdom-And-Advice" })
          }
        >
          <Text style={styles.buttonText}>Wisdom and Advice</Text>
        </Pressable>
        <Pressable
          style={styles.suggestionButton}
          onPress={() =>
            navigation.navigate("SearchResults", { query: "Women" })
          }
        >
          <Text style={styles.buttonText}>Women</Text>
        </Pressable>
        <Pressable
          style={styles.suggestionButton}
          onPress={() =>
            navigation.navigate("SearchResults", { query: "Military" })
          }
        >
          <Text style={styles.buttonText}>Military</Text>
        </Pressable>
        <Pressable
          style={styles.suggestionButton}
          onPress={() =>
            navigation.navigate("SearchResults", { query: "1970s" })
          }
        >
          <Text style={styles.buttonText}>1970s</Text>
        </Pressable>
        <Pressable
          style={styles.suggestionButton}
          onPress={() =>
            navigation.navigate("SearchResults", { query: "Love-Stories" })
          }
        >
          <Text style={styles.buttonText}>Love Stories</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "3%",
    marginTop: "30%",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  searchBox: {
    flexDirection: "row",
  },
  input: {
    height: 55,
    borderColor: theme.colors.chineseBlack,
    borderWidth: 3,
    width: "85%",
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  searchButton: {
    backgroundColor: theme.colors.x11Gray,
    height: 55,
    borderWidth: 3,
    borderLeftColor: theme.colors.x11Gray,
    padding: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  suggestionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  suggestionButton: {
    backgroundColor: "#FCD385",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "400",
  },
  suggestionsHeader: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 16,
  },
});

export default SearchPage;
