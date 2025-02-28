import React, { useEffect, useState, useContext } from "react";
import { 
  View, Text, StyleSheet, ScrollView, ActivityIndicator, 
  SafeAreaView 
} from "react-native";
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
        <Text style={styles.heading}>Upcoming Exams</Text>

        {examDetails.length === 0 ? (
          <Text style={styles.noDataText}>No upcoming exams.</Text>
        ) : (
          <>
            {/* Horizontal Scrollable Exam Cards */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalContainer}>
              {examDetails.map((exam, index) => (
                <View key={index} style={styles.examCard}>
                  <Text style={styles.subjectText}>{exam.subject}</Text>
                  <Text style={styles.dateText}>📅 {exam.date}</Text>
                  <View style={styles.examInfo}>
                    <Text style={styles.infoText}>Duration: 3 hrs</Text>
                    <Text style={styles.infoText}>Room: CAP 512</Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Horizontal Scrollable Additional Info Boxes */}
            <Text style={styles.heading}>Exam Information</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalContainer}>
              <View style={styles.infoCard}>
                <Text style={styles.boxTitle}>📖 Exam Guidelines</Text>
                <Text style={styles.boxText}>Follow university guidelines strictly. Carry your ID card.</Text>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.boxTitle}>⏳ Exam Timings</Text>
                <Text style={styles.boxText}>Morning Shift: 9 AM - 12 PM {"\n"}Evening Shift: 2 PM - 5 PM</Text>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.boxTitle}>📍 Exam Centers</Text>
                <Text style={styles.boxText}>Check your assigned center in your student portal.</Text>
              </View>

              <View style={styles.infoCard}>
                <Text style={styles.boxTitle}>📝 Exam Materials</Text>
                <Text style={styles.boxText}>Allowed: ID card, Stationery, Hall Ticket. Not Allowed: Electronic devices.</Text>
              </View>
            </ScrollView>

            {/* 🔒 Security Section */}
            <Text style={styles.heading}>Security Measures</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalContainer}>
              <View style={styles.securityCard}>
                <Text style={styles.boxTitle}>🚔 Security Checkpoints</Text>
                <Text style={styles.boxText}>Metal detectors & bag checking at all exam halls.</Text>
              </View>

              <View style={styles.securityCard}>
                <Text style={styles.boxTitle}>🎥 Surveillance</Text>
                <Text style={styles.boxText}>CCTV cameras monitoring all exam rooms.</Text>
              </View>

              <View style={styles.securityCard}>
                <Text style={styles.boxTitle}>🚫 Prohibited Items</Text>
                <Text style={styles.boxText}>No smartwatches, mobile phones, or notes allowed.</Text>
              </View>

              <View style={styles.securityCard}>
                <Text style={styles.boxTitle}>🔍 ID Verification</Text>
                <Text style={styles.boxText}>Every student must present a valid university ID before entry.</Text>
              </View>
            </ScrollView>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// ============================ STYLES ============================

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 10 },
  noDataText: { fontSize: 18, color: "gray", textAlign: "center", marginTop: 20 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { color: "white", marginTop: 10 },

  horizontalContainer: { marginBottom: 20 },

  examCard: { 
    backgroundColor: "#1E1E1E", 
    padding: 20, 
    borderRadius: 10, 
    marginRight: 10, 
    width: 180, 
    justifyContent: "space-between",
  },

  subjectText: { fontSize: 18, fontWeight: "bold", color: "#FFA500", marginBottom: 5 },
  dateText: { fontSize: 16, color: "white", marginBottom: 5 },

  examInfo: { marginTop: 10, borderTopWidth: 1, borderTopColor: "#333", paddingTop: 10 },
  infoText: { fontSize: 14, color: "gray", marginTop: 5 },

  infoCard: { 
    backgroundColor: "#1E1E1E", 
    padding: 20, 
    borderRadius: 10, 
    marginRight: 10, 
    width: 200, 
    justifyContent: "center",
  },

  securityCard: { 
    backgroundColor: "#2C2C2C", 
    padding: 20, 
    borderRadius: 10, 
    marginRight: 10, 
    width: 200, 
    justifyContent: "center",
  },

  boxTitle: { fontSize: 18, fontWeight: "bold", color: "#FFA500", marginBottom: 5 },
  boxText: { fontSize: 16, color: "white" },
});

export default ExamScreen;
