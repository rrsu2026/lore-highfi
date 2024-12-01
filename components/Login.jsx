import React, { useState } from "react";
import {
  Text,
  Alert,
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import db from "../database/db";
import Theme from "../Theme";

const Login = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const { data, error } = await db.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
        options: { shouldCreateUser: false },
      });

      setLoading(false);

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      // Navigate to Home screen on success
      navigation.navigate("HomePage"); // Replace "Home" with the name of your home screen
    } catch (err) {
      setLoading(false);
      console.error(err);
      Alert.alert(
        "Unexpected Error",
        "Something went wrong. Please try again."
      );
    }
  };

  const isSignInDisabled = loading || !email.trim() || !password.trim();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.splash}>
        <MaterialCommunityIcons
          size={64}
          name="apple-icloud"
          color={Theme.colors.iconHighlighted}
        />
        <Text style={styles.splashText}>Lore</Text>
      </View>
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="email@address.com"
        placeholderTextColor={Theme.colors.textSecondary}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        placeholderTextColor={Theme.colors.textSecondary}
        secureTextEntry={true}
        autoCapitalize="none"
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignIn} disabled={isSignInDisabled}>
          <Text
            style={[
              styles.button,
              isSignInDisabled ? styles.buttonDisabled : undefined,
            ]}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    marginTop: "20%",
    width: "100%",
  },
  splash: {
    alignItems: "center",
    marginBottom: 12,
  },
  splashText: {
    fontWeight: "bold",
    color: Theme.colors.textPrimary,
    fontSize: 40,
  },
  buttonContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  input: {
    color: Theme.colors.textPrimary,
    backgroundColor: Theme.colors.backgroundPrimary,
    width: "90%",
    padding: 16,
    height: 50,
    borderRadius: 8,
    marginVertical: 10,
  },
  button: {
    color: Theme.colors.textHighlighted,
    fontSize: 18,
    fontWeight: "bold",
    padding: 8,
  },
  buttonDisabled: {
    color: Theme.colors.textSecondary,
  },
});

export default Login;
