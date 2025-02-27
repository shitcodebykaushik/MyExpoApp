import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_BASE_URL = "http://172.20.10.7:8000";

const StudyMaterialScreen = () => {
  const { token } = useContext(AuthContext);
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudyMaterials = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${API_BASE_URL}/student/study-material`, { headers });

        setStudyMaterials(response.data.study_materials);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching study materials:", error);
      }
    };

    fetchStudyMaterials();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
        <Text style={styles.loadingText}>Loading Study Materials...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Study Materials</Text>
      {studyMaterials.length === 0 ? (
        <Text style={styles.text}>No study materials available.</Text>
      ) : (
        studyMaterials.map((material, index) => (
          <Text key={index} style={styles.text}>{material}</Text>
        ))
      )}
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

export default StudyMaterialScreen;
