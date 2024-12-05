import React, { useState } from "react";
import {
  Text,
  Alert,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Import your theme or define colors directly
import Theme from "../Theme";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    setLoading(true);

    // Simulated login validation
    setTimeout(() => {
      setLoading(false);
      if (
        email.trim().toLowerCase() === "rennold@gmail.com" &&
        password === "password"
      ) {
        // Navigate to HomePage
        navigation.reset({
          index: 0,
          routes: [{ name: "HomePage" }],
        });
      } else {
        Alert.alert("Error", "Invalid email or password.");
      }
    }, 1000);
  };

  const isSignInDisabled = loading || !email.trim() || !password.trim();

  const handleForgotPassword = () => {
    Alert.alert(
      "Info",
      "Forgot Password functionality is not implemented yet."
    );
  };

  const handleForgotUsername = () => {
    Alert.alert(
      "Info",
      "Forgot Username functionality is not implemented yet."
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.splash}>
          {/* Replace with your logo or remove if not needed */}
          <Image
            source={require("../assets/full-logo.png")} // Ensure this path is correct
            style={styles.logo}
          />
          <Text style={styles.slogan}>Unpack Your Memories</Text>
        </View>

        {/* Email Input with Label */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            onChangeText={setEmail}
            value={email}
            placeholder="Enter your email"
            placeholderTextColor={Theme.colors.textSecondary}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
          {/* Forgot Username Link */}
          <TouchableOpacity onPress={handleForgotUsername}>
            <Text style={styles.forgotText}>Forgot Username?</Text>
          </TouchableOpacity>
        </View>

        {/* Password Input with Label */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              onChangeText={setPassword}
              value={password}
              placeholder="Enter your password"
              placeholderTextColor={Theme.colors.textSecondary}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              style={styles.passwordInput}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color={Theme.colors.textSecondary}
              />
            </TouchableOpacity>
          </View>
          {/* Forgot Password Link */}
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleSignIn}
            disabled={isSignInDisabled}
            style={[
              styles.button,
              isSignInDisabled ? styles.buttonDisabled : null,
            ]}
          >
            <Text style={styles.buttonText}>
              {loading ? "Signing in..." : "Sign In"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Optional Sign Up Link */}
        <TouchableOpacity
          onPress={() => Alert.alert("Info", "Sign Up not implemented.")}
          style={styles.signUpContainer}
        >
          <Text style={styles.signUpText}>
            Don't have an account?{" "}
            <Text style={styles.signUpLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
  scrollContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  splash: {
    alignItems: "center",
    marginBottom: 24,
    marginTop: 60, 
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: "contain",
    marginTop: 70,
  },
  slogan: {
    fontSize: 18,
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 8,
  },
  inputContainer: {
    width: "90%",
    marginVertical: 8,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: 12,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc", 
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 12,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc", 
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  forgotText: {
    fontSize: 14,
    textDecorationLine: "underline",
    marginTop: 4, 
  },
  buttonContainer: {
    marginTop: 16,
    width: "60%",
  },
  button: {
    backgroundColor: Theme.colors.complementColor3, 
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1.5, 
    borderColor: Theme.colors.chineseBlack, 
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpContainer: {
    marginTop: 24,
    width: "90%",
    alignItems: "center",
  },
  signUpText: {
    fontSize: 16,
    textAlign: "center",
  },
  signUpLink: {
    textDecorationLine: "underline",
  },
});

export default Login;