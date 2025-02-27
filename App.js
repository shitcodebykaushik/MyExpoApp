import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthContext } from "./src/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [token, setToken] = useState(null);

  // Check for saved login token (persistent login)
  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem("userToken");
      if (savedToken) {
        setToken(savedToken);
      }
    };
    loadToken();
  }, []);

  // Function to update token (login/logout)
  const updateToken = async (newToken) => {
    if (newToken) {
      await AsyncStorage.setItem("userToken", newToken);
      setToken(newToken);
    } else {
      await AsyncStorage.removeItem("userToken");
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken: updateToken }}>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </AuthContext.Provider>
  );
}
