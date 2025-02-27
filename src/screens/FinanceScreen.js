import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FinanceScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Finance Screen - Coming Soon!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" },
  text: { fontSize: 22, fontWeight: "bold", color: "white" },
});

export default FinanceScreen;
