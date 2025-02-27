import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = "http://172.20.10.7:8000"; // Update with your backend IP

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      setIsLoading(true);
      const savedToken = await AsyncStorage.getItem("userToken");

      if (savedToken) {
        try {
          const headers = { Authorization: `Bearer ${savedToken}` };
          const response = await axios.get(`${API_BASE_URL}/auth/validate`, { headers });

          if (response.data.valid) {
            setToken(savedToken);
          } else {
            await AsyncStorage.removeItem("userToken");
            setToken(null);
          }
        } catch (error) {
          console.error("Token validation failed:", error);
          await AsyncStorage.removeItem("userToken");
          setToken(null);
        }
      }

      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  const login = async (registration_number, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        registration_number,
        password,
      });

      if (response.data.access_token) {
        await AsyncStorage.setItem("userToken", response.data.access_token);
        setToken(response.data.access_token);
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Check your credentials!");
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("userToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
