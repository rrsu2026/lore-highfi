import React, { useContext } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Image,
} from "react-native";
import AuthenticationContext from "./AuthenticationContext";
import { FontAwesome } from "@expo/vector-icons";
import Tag from "./Tag.jsx";
import theme from "../Theme";


const MyProfile = ({ navigation }) => {
  const [user, setUser] = useContext(AuthenticationContext);

  const signOut = () => {
    Alert.alert(
      "Confirm Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
            Alert.alert("Signed Out", "You have been successfully signed out.");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
        <FontAwesome name="cog" size={24} color="black" />
      </View>

      <View style={styles.profileSection}>
      <View style={styles.avatar}>
  <Image
    source={require('../assets/fakerennold.jpg')}
    style={styles.avatarImage} // Add this style to keep the image dimensions consistent
  />
</View>        
<View>
          <Text style={styles.nameText}>{user.name}</Text>
          <Text style={styles.locationText}>
            <FontAwesome name="map-marker" size={14} color="#eb4634" />{" "}
            {user.location}
          </Text>
          <Text style={styles.ageText}>Age: {user.age}</Text>
        </View>
      </View>

      <View style={styles.tagsContainer}>
        {user.tags.map((tag, index) => (
          <Tag key={index} navigation={navigation} title={tag} />
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

      <Pressable style={styles.signOutButton} onPress={signOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </Pressable>
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
    overflow: "hidden", 
    alignItems: "center", 
    justifyContent: "center", 
  },  
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
    borderWidth: 2.5,
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
  signOutButton: {
    backgroundColor: theme.colors.complementColor2,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderWidth: 2.5
  },
  signOutButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
});

export default MyProfile;
