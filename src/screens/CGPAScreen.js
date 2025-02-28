import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView } from "react-native";
import { Circle, Svg } from "react-native-svg";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_BASE_URL = "http://172.20.10.7:8000";

const CGPAScreen = () => {
  const { token } = useContext(AuthContext);
  const [cgpaData, setCgpaData] = useState([]);
  const [overallPerformance, setOverallPerformance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCGPA = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${API_BASE_URL}/services/cgpa`, { headers });

        // Transform response to match UI structure
        const formattedCGPA = Object.entries(response.data.semesters).map(([semester, percentage]) => ({
          semester, // "Semester 1"
          percentage, // 70
        }));

        setCgpaData(formattedCGPA);
        setOverallPerformance(response.data.overall_performance || 0);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching CGPA:", error);
        setLoading(false);
      }
    };

    fetchCGPA();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFA500" />
          <Text style={styles.loadingText}>Loading CGPA Data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Overall Performance */}
        <View style={styles.overallPerformance}>
          <Text style={styles.performanceText}>Overall Performance</Text>
          <Text style={styles.performanceValue}>{overallPerformance.toFixed(2)} %</Text>
        </View>

        {/* Semester-wise CGPA */}
        <View style={styles.gridContainer}>
          {cgpaData.map((semester, index) => (
            <View key={index} style={styles.semesterCard}>
              <View style={styles.semesterHeader}>
                <Text style={styles.semesterTitle}>{semester.semester}</Text>
              </View>
              <View style={styles.circularProgress}>
                <Svg width={80} height={80} viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <Circle cx="50" cy="50" r="40" stroke="#2C2C2C" strokeWidth="8" fill="none" />
                  {/* Progress Circle */}
                  <Circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke={getProgressColor(semester.percentage)}
                    strokeWidth="8"
                    strokeDasharray={`${(semester.percentage / 100) * 251}, 251`}
                    strokeLinecap="round"
                    fill="none"
                    transform="rotate(-90,50,50)"
                  />
                </Svg>
                <Text style={styles.percentageText}>{semester.percentage} %</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Function to determine the progress color
const getProgressColor = (percentage) => {
  if (percentage >= 75) return "#32CD32"; // Green for Good Performance
  if (percentage >= 60) return "#FFA500"; // Orange for Moderate Performance
  return "#FF4500"; // Red for Low Performance
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { color: "white", marginTop: 10 },

  overallPerformance: { backgroundColor: "#1E1E1E", padding: 20, borderRadius: 10, alignItems: "center", marginBottom: 20 },
  performanceText: { fontSize: 18, fontWeight: "bold", color: "white" },
  performanceValue: { fontSize: 22, fontWeight: "bold", color: "#FFA500", marginTop: 5 },

  gridContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  semesterCard: { backgroundColor: "#1E1E1E", width: "48%", borderRadius: 10, marginBottom: 15, paddingBottom: 15, alignItems: "center" },
  semesterHeader: { backgroundColor: "#333333", width: "100%", padding: 8, borderTopLeftRadius: 10, borderTopRightRadius: 10, alignItems: "center" },
  semesterTitle: { color: "white", fontSize: 14, fontWeight: "bold" },

  circularProgress: { justifyContent: "center", alignItems: "center", marginTop: 15 },
  percentageText: { fontSize: 16, fontWeight: "bold", color: "white", position: "absolute" },
});

export default CGPAScreen;
