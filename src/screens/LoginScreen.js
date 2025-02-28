import React, { useState, useContext } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, 
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard 
} from "react-native";
import { AuthContext } from "../context/AuthContext";

// Import Local Asset (Ensure the logo exists in `assets/` folder)
import logoImage from "../assets/Lovely Professional University-04.png"; 

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          {/* Circular Logo */}
          <View style={styles.logoContainer}>
            <Image source={logoImage} style={styles.logo} />
          </View>

          <Text style={styles.title}>Student Login</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Registration Number"
            placeholderTextColor="#aaa"
            value={registrationNumber}
            onChangeText={setRegistrationNumber}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => login(registrationNumber, password)}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// ============================ STYLES ============================

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  inner: { flex: 1, justifyContent: "center", alignItems: "center" },

  // Circular Logo Container
  logoContainer: { 
    width: 100, height: 100, borderRadius: 50, backgroundColor: "#1E1E1E", 
    justifyContent: "center", alignItems: "center", marginBottom: 20 
  },
  logo: { width: 60, height: 60, resizeMode: "contain" },

  title: { fontSize: 24, fontWeight: "bold", color: "#F58220", marginBottom: 20 },

  input: { 
    width: "100%", padding: 12, backgroundColor: "#1E1E1E", 
    borderRadius: 8, color: "white", marginBottom: 15, fontSize: 16 
  },

  button: { 
    backgroundColor: "#F58220", padding: 12, borderRadius: 8, 
    width: "100%", alignItems: "center", marginTop: 10 
  },
  buttonText: { color: "black", fontSize: 16, fontWeight: "bold" },
});

export default LoginScreen;
