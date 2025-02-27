import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

const HomeScreen = () => {
  const { setToken } = useContext(AuthContext);

  const handleLogout = () => {
    setToken(null); // This will send user back to Login screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Home Screen</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" },
  text: { fontSize: 22, fontWeight: "bold", color: "white" },
  logoutButton: { backgroundColor: "red", padding: 10, marginTop: 20, borderRadius: 5 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default HomeScreen;
