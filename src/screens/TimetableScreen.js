import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_BASE_URL = "http://172.20.10.7:8000";

const TimetableScreen = () => {
  const { token } = useContext(AuthContext);
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${API_BASE_URL}/student/timetable`, { headers });

        setTimetable(response.data.timetable);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching timetable:", error);
      }
    };

    fetchTimetable();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
        <Text style={styles.loadingText}>Loading Timetable...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Class Timetable</Text>
      {timetable.map((subject, index) => (
        <Text key={index} style={styles.text}>
          {subject.time} - {subject.subject}
        </Text>
      ))}
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

export default TimetableScreen;
