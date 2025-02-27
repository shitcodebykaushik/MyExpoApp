import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
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
        const response = await axios.get(`${API_BASE_URL}/student/attendance`, { headers });

        setAttendance(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
        <Text style={styles.loadingText}>Loading attendance...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Attendance Details</Text>
      <Text style={styles.text}>Total Attendance: {attendance?.percentage || "--"}%</Text>
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

export default AttendanceScreen;
