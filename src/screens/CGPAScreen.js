import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_BASE_URL = "http://172.20.10.7:8000";

const CGPAScreen = () => {
  const { token } = useContext(AuthContext);
  const [cgpa, setCgpa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCGPA = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${API_BASE_URL}/student/cgpa`, { headers });

        setCgpa(response.data.cgpa);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching CGPA:", error);
      }
    };

    fetchCGPA();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
        <Text style={styles.loadingText}>Loading CGPA...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>CGPA Details</Text>
      <Text style={styles.text}>Your CGPA: {cgpa || "--"}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  heading: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 10 },
  text: { fontSize: 18, color: "white", marginBottom: 10 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { color: "white", marginTop: 10 },
});

export default CGPAScreen;
