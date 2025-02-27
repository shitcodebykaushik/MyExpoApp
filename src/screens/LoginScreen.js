import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_BASE_URL = "http://172.20.10.7:8000"; // Replace with your backend IP

const LoginScreen = () => {
  const { setToken } = useContext(AuthContext);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        registration_number: registrationNumber,
        password: password,
      });

      if (response.data.access_token) {
        setToken(response.data.access_token);
      } else {
        setError("Invalid Credentials");
      }
    } catch (err) {
      setError("Login Failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" },
  title: { fontSize: 24, fontWeight: "bold", color: "white", marginBottom: 20 },
  input: { width: "80%", padding: 10, backgroundColor: "#fff", marginBottom: 10, borderRadius: 5 },
  error: { color: "red", marginBottom: 10 },
  loginButton: { backgroundColor: "#FFA500", padding: 10, borderRadius: 5 },
  buttonText: { color: "black", fontSize: 16, fontWeight: "bold" },
});

export default LoginScreen;
