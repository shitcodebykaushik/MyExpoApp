import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SecurityScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Security Screen - Coming Soon!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" },
  text: { fontSize: 22, fontWeight: "bold", color: "white" },
});

export default SecurityScreen;
