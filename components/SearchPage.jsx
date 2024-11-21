import React from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";

const SearchPage = ({ navigation }) => {
  const [query, setQuery] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search</Text>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={() => navigation.navigate("SearchResults", { query })}
        placeholder="Type something..."
      />
      <Button
        title="🔎"
        onPress={() => navigation.navigate("SearchResults", { query })}
      />

      <Text style={styles.suggestionsHeader}>Suggestions</Text>
      <Button
        title="Chinese-American"
        onPress={() =>
          navigation.navigate("SearchResults", { query: "Chinese-American" })
        }
      />
      <Button
        title="Women"
        onPress={() => navigation.navigate("SearchResults", { query: "Women" })}
      />
      <Button
        title="Military"
        onPress={() =>
          navigation.navigate("SearchResults", { query: "Military" })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  suggestionsHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 16,
  },
});

export default SearchPage;
