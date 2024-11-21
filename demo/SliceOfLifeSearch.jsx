import React, { useContext } from "react";
import { View, SafeAreaView, Pressable, StyleSheet, Text } from "react-native";
import StoriesDisplayTimeline from "../components/StoriesDisplayTimeline";
import FakeDatabaseContext from "../components/FakeDatabaseContext";
import theme from "../Theme";

const SliceOfLifeSearch = ({ navigation }) => {
  const db = useContext(FakeDatabaseContext);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerCont}>
        <Text style={styles.subAuthorText}>Results for "Slice of Life"</Text>

        {/* Button Section */}
        <View style={styles.buttonContainer}>
          <Pressable style={styles.buttonSelect}>
            <Text style={styles.buttonText}>Timeline</Text>
          </Pressable>
          <Pressable style={styles.button}>
            <Text style={styles.buttonUnselect}>Recent</Text>
          </Pressable>
        </View>
      </View>
      {/* Stories Display */}
      <View style={styles.contentCont}>
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
    alignItems: "flex-start",
    backgroundColor: theme.colors.primaryColor1,
    paddingTop: "10%",
    marginBottom: "3%",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  subAuthorText: {
    fontSize: 20,
    color: "black",
    fontWeight: "500",
    textAlign: "left",
    marginLeft: "5%",
    marginBottom: "3%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    gap: "2%",
  },
  buttonSelect: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "#000",
    borderBottomColor: "white",
    alignItems: "center",
    zIndex: 1,
  },
  buttonUnselect: {
    backgroundColor: "#FCD385", // Light yellow background
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
  },
});

export default SliceOfLifeSearch;
