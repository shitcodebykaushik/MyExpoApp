import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#FFA500", marginBottom: 20 },
  input: { width: "100%", padding: 10, backgroundColor: "#1E1E1E", borderRadius: 5, color: "white", marginBottom: 10 },
  button: { backgroundColor: "#FFA500", padding: 10, borderRadius: 5, width: "100%", alignItems: "center" },
  buttonText: { color: "black", fontSize: 16, fontWeight: "bold" },
});

export default LoginScreen;
