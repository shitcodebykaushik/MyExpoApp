import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_BASE_URL = "http://172.20.10.7:8000";

const AttendanceScreen = () => {
  const { token } = useContext(AuthContext);
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${API_BASE_URL}/services/attendance`, { headers });
        setAttendance(response.data || {});
        setLoading(false);
      } catch (error) {
        console.error("Error fetching attendance:", error);
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFA500" />
          <Text style={styles.loadingText}>Loading Attendance...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.backText}>{"< Back"}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Attendance</Text>
        </View>

        {/* Faculty & Student Details */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>Faculty: {attendance.faculty_name || "N/A"}</Text>
          <Text style={styles.infoText}>Section: {attendance.section || "N/A"}</Text>
          <Text style={styles.infoText}>Roll No: {attendance.roll_number || "N/A"}</Text>
        </View>

        {/* Aggregate Attendance */}
        <View style={styles.aggregateContainer}>
          <Text style={styles.aggregateText}>Overall Attendance</Text>
          <View style={styles.aggregateBadge}>
            <Text style={styles.aggregateBadgeText}>{attendance?.overall_percentage || "--"}%</Text>
          </View>
        </View>

        {/* Subject-Wise Attendance */}
        <Text style={styles.sectionTitle}>Subject-wise Attendance</Text>

        <FlatList
          data={attendance.subjects || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.subjectCard}>
              <Text style={styles.subjectTitle}>{item.subject}</Text>
              <Text style={styles.subjectDetail}>Last Class: {item.last_class_attended}</Text>
              <Text style={styles.subjectDetail}>Duty Leaves: {item.duty_leaves}</Text>
              <View style={[styles.subjectAttendance, { backgroundColor: getAttendanceColor(item.attendance_percentage) }]}>
                <Text style={styles.attendanceText}>{item.attendance_percentage}%</Text>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// Function to color attendance based on percentage
const getAttendanceColor = (percentage) => {
  if (percentage >= 90) return "#32CD32"; // Green for High Attendance
  if (percentage >= 75) return "#FFA500"; // Orange for Moderate Attendance
  return "#FF4500"; // Red for Low Attendance
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
  container: { flex: 1, padding: 20 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { color: "white", marginTop: 10 },

  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
  backText: { fontSize: 18, color: "#FFA500", fontWeight: "bold" },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "white" },

  infoCard: { backgroundColor: "#1E1E1E", padding: 15, borderRadius: 10, marginBottom: 15 },
  infoText: { fontSize: 16, color: "white", marginBottom: 5 },

  aggregateContainer: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "white", padding: 15, borderRadius: 10, alignItems: "center", marginBottom: 20 },
  aggregateText: { fontSize: 18, fontWeight: "bold", color: "black" },
  aggregateBadge: { backgroundColor: "#FFA500", padding: 8, borderRadius: 5 },
  aggregateBadgeText: { color: "white", fontSize: 16, fontWeight: "bold" },

  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "white", marginBottom: 10 },

  subjectCard: { backgroundColor: "#1E1E1E", padding: 15, borderRadius: 10, marginBottom: 10 },
  subjectTitle: { fontSize: 18, fontWeight: "bold", color: "#FFA500" },
  subjectDetail: { fontSize: 14, color: "white", marginTop: 5 },
  
  subjectAttendance: { marginTop: 10, padding: 10, borderRadius: 8, alignItems: "center" },
  attendanceText: { fontSize: 16, fontWeight: "bold", color: "white" },
});

export default AttendanceScreen;
