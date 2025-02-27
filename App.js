import React from "react";
import { StatusBar, ActivityIndicator, View } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </AuthProvider>
  );
}
