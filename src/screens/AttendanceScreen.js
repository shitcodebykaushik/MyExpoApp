import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, FlatList, SafeAreaView } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Circle, Svg } from "react-native-svg";

const API_BASE_URL = "http://172.20.10.7:8000";

const AttendanceScreen = ({ navigation }) => {
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
          <Text onPress={() => navigation.goBack()} style={styles.backText}>{""}</Text>
          <Text style={styles.headerTitle}></Text>
          <View style={{ width: 50 }} /> {/* Empty space for balance */}
        </View>

        {/* Aggregate Attendance */}
        <View style={styles.aggregateContainer}>
          <Text style={styles.aggregateText}>AGGREGATE ATTENDANCE</Text>
          <View style={styles.aggregateBadge}>
            <Text style={styles.aggregateBadgeText}>{attendance?.overall_percentage || "--"}%</Text>
          </View>
        </View>

        {/* Subject-Wise Attendance */}
        <FlatList
          data={attendance.subjects || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.subjectCard}>
              {/* Attendance Percentage in Corner */}
              <View style={styles.circularProgressContainer}>
                <Svg width={55} height={55} viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <Circle cx="50" cy="50" r="40" stroke="#2C2C2C" strokeWidth="8" fill="none" />
                  {/* Progress Circle */}
                  <Circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke={getAttendanceColor(item.attendance_percentage)}
                    strokeWidth="8"
                    strokeDasharray={`${(item.attendance_percentage / 100) * 251}, 251`}
                    strokeLinecap="round"
                    fill="none"
                    transform="rotate(-90,50,50)"
                  />
                </Svg>
                <Text style={styles.percentageText}>{item.attendance_percentage}%</Text>
              </View>

              {/* Subject Title & Group */}
              <View style={styles.subjectHeader}>
                <Text style={styles.subjectTitle}>{item.subject}</Text>
                <View style={styles.groupBadge}>
                  <Text style={styles.groupText}>Group:1</Text>
                </View>
              </View>

              {/* Faculty Details */}
              <Text style={styles.facultyText}>Faculty: {item.faculty || "N/A"}</Text>
              <Text style={styles.facultyText}>Faculty Seating: {item.faculty_seating || "N/A"}</Text>
              <Text style={styles.facultyText}>Last Attended: {item.last_class_attended || "N/A"}</Text>
              <Text style={styles.facultyText}>Attended/Delivered: {item.attended}/{item.delivered}</Text>
              <Text style={styles.facultyText}>Duty Leaves: {item.duty_leaves}</Text>

              {/* Section & Roll Number */}
              <View style={styles.sectionRoll}>
                <Text style={styles.sectionText}>Section: <Text style={styles.highlightedText}>{item.section || "N/A"}</Text></Text>
                <Text style={styles.sectionText}>Roll No: <Text style={styles.highlightedText}>{item.roll_number || "N/A"}</Text></Text>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// Function to determine the progress color
const getAttendanceColor = (percentage) => {
  if (percentage >= 90) return "#32CD32"; // Green
  if (percentage >= 75) return "#FFA500"; // Orange
  return "#FF4500"; // Red
};

// ============================ STYLES ============================

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
  container: { flex: 1, padding: 20 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { color: "white", marginTop: 10 },

  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
  backText: { fontSize: 18, color: "#FFA500", fontWeight: "bold" },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "white" },

  aggregateContainer: { backgroundColor: "#1E1E1E", padding: 15, borderRadius: 10, alignItems: "center", marginBottom: 20 },
  aggregateText: { fontSize: 18, fontWeight: "bold", color: "white" },
  aggregateBadge: { backgroundColor: "#FFA500", padding: 8, borderRadius: 5, marginTop: 5 },
  aggregateBadgeText: { color: "white", fontSize: 16, fontWeight: "bold" },

  subjectCard: { backgroundColor: "#1E1E1E", padding: 15, borderRadius: 10, marginBottom: 15, position: "relative" },
  subjectHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  subjectTitle: { fontSize: 18, fontWeight: "bold", color: "white" },

  facultyText: { fontSize: 14, color: "white", marginBottom: 5 },

  groupBadge: { backgroundColor: "#FF6347", padding: 5, borderRadius: 5 },
  groupText: { fontSize: 14, color: "white", fontWeight: "bold" },

  circularProgressContainer: { position: "absolute", top: 50, right: 10 },
  percentageText: { fontSize: 14, fontWeight: "bold", color: "white", position: "absolute", top: 22, left: 10 },

  sectionRoll: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  sectionText: { fontSize: 14, color: "white" },
  highlightedText: { fontWeight: "bold", color: "#FFA500" },
});

export default AttendanceScreen;
