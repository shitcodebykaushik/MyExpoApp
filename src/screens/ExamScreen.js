import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_BASE_URL = "http://172.20.10.7:8000";

const ExamScreen = () => {
  const { token } = useContext(AuthContext);
  const [examDetails, setExamDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${API_BASE_URL}/services/exams`, { headers });

        // ✅ Ensure correct data structure
        setExamDetails(response.data.exams || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exam details:", error);
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, [token]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFA500" />
          <Text style={styles.loadingText}>Loading exam details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Exam Details</Text>

        {examDetails.length === 0 ? (
          <Text style={styles.noDataText}>No upcoming exams.</Text>
        ) : (
          examDetails.map((exam, index) => (
            <View key={index} style={styles.examCard}>
              <Text style={styles.subjectText}>{exam.subject}</Text>
              <Text style={styles.dateText}>Date: {exam.date}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 10 },
  noDataText: { fontSize: 18, color: "gray", textAlign: "center", marginTop: 20 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { color: "white", marginTop: 10 },

  examCard: { backgroundColor: "#1E1E1E", padding: 15, borderRadius: 8, marginBottom: 10 },
  subjectText: { fontSize: 18, fontWeight: "bold", color: "white" },
  dateText: { fontSize: 16, color: "#FFA500" },
});

export default ExamScreen;
