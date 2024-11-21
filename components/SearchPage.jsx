import React from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";

const SearchPage = ({ navigation }) => {
  const [query, setQuery] = React.useState("");
  return (
    <View>
      <label htmlFor="search">
        Search{" "}
        <TextInput
          id="search"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() =>
            navigation.navigate("SearchResults", { query })
          }
        />
      </label>
      <Button
        title="🔎"
        onPress={() => navigation.navigate("SearchResults", { query })}
      />
      <Text>Suggestions</Text>
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
      <Button
        title="Peru"
        onPress={() => navigation.navigate("SearchResults", { query: "Peru" })}
      />
      <Button
        title="1980s"
        onPress={() => navigation.navigate("SearchResults", { query: "1980s" })}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchPage;
