import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_BASE_URL = "http://172.20.10.7:8000"; // Update with your machine's IP

const LoginScreen = ({ navigation }) => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!registrationNumber || !password) {
      Alert.alert("Error", "Please enter your credentials.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        registration_number: registrationNumber,
        password: password,
      });

      if (response.data.access_token) {
        login(response.data.access_token); // Store token in context
        navigation.replace("Home"); // Navigate to Home screen
      }
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Login Failed", "Invalid registration number or password.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Registration Number"
        value={registrationNumber}
        onChangeText={setRegistrationNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});

export default LoginScreen;
