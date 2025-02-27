import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import * as Linking from "expo-linking";

const API_BASE_URL = "http://172.20.10.7:8000";

const StudyMaterialScreen = () => {
  const { token } = useContext(AuthContext);
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudyMaterials = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${API_BASE_URL}/services/materials`, { headers });

        // ✅ Ensure the correct structure is used and handle potential missing data
        setStudyMaterials(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching study materials:", error);
        setLoading(false);
      }
    };

    fetchStudyMaterials();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFA500" />
          <Text style={styles.loadingText}>Fetching Study Materials...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Study Materials</Text>

        {studyMaterials.length === 0 ? (
          <Text style={styles.noData}>No study materials available.</Text>
        ) : (
          <FlatList
            data={studyMaterials}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.card} 
                onPress={() => item.pdf_link ? Linking.openURL(item.pdf_link) : alert("No link available")}
              >
                <Text style={styles.title}>{item.title || "No Title"}</Text>
                <Text style={styles.link}>{item.pdf_link || "No Link Available"}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
  container: { flex: 1, padding: 20 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { color: "white", marginTop: 10 },
  noData: { color: "gray", fontSize: 18, textAlign: "center", marginTop: 20 },
  header: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 10 },
  card: { backgroundColor: "#1E1E1E", padding: 15, marginBottom: 10, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: "bold", color: "white" },
  link: { fontSize: 16, color: "#FFA500" },
});

export default StudyMaterialScreen;
