import React, { useContext } from "react";
import { View, SafeAreaView, Text, StyleSheet, Pressable } from "react-native";
import AuthenticationContext from "./AuthenticationContext";
import { FontAwesome } from "@expo/vector-icons";

const MyProfile = ({ navigation }) => {
  const user = useContext(AuthenticationContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
        <FontAwesome name="cog" size={24} color="black" />
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.nameText}>{user.name}</Text>
          <Text style={styles.locationText}>
            {" "}
            <FontAwesome name="map-marker" size={14} color="red" />
            {user.location}
          </Text>
          <Text style={styles.ageText}>Age: {user.age}</Text>
        </View>
      </View>

      <View style={styles.tagsContainer}>
        {user.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.sectionHeader}>About Me</Text>
      <Text style={styles.aboutText}>{user.about}</Text>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("MyStories")}
        >
          <Text style={styles.buttonText}>My Stories</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("SavedStories")}
        >
          <Text style={styles.buttonText}>Saved Stories</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("MyCircle")}
        >
          <Text style={styles.buttonText}>My Circle</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("MySubscribers")}
        >
          <Text style={styles.buttonText}>My Subscribers</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("SubscribedAuthors")}
        >
          <Text style={styles.buttonText}>Subscribed Authors</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: "3%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#CCC",
    marginRight: 20,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  locationText: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  ageText: {
    fontSize: 16,
    color: "#000",
  },
  tagsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tag: {
    backgroundColor: "#FCD385",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#000",
  },
  tagText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  button: {
    backgroundColor: "#FCD385",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: "1%",
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
});

export default MyProfile;
