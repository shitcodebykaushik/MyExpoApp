import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_BASE_URL = "http://172.20.10.7:8000";

const TimetableScreen = () => {
  const { token } = useContext(AuthContext);
  const [timetable, setTimetable] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${API_BASE_URL}/student/timetable`, { headers });

        // ✅ Extracting the nested timetable object
        setTimetable(response.data?.timetable || {});
        setLoading(false);
      } catch (error) {
        console.error("Error fetching timetable:", error);
        setLoading(false);
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

      {Object.keys(timetable).length === 0 ? (
        <Text style={styles.noData}>No timetable available.</Text>
      ) : (
        Object.entries(timetable).map(([day, subjects]) => (
          <View key={day} style={styles.dayContainer}>
            <Text style={styles.dayHeader}>{day}</Text>
            {subjects.map((subject, index) => (
              <View key={index} style={styles.subjectCard}>
                <Text style={styles.subjectTime}>{subject.time}</Text>
                <Text style={styles.subjectName}>{subject.subject}</Text>
              </View>
            ))}
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  heading: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 10 },
  noData: { fontSize: 18, color: "gray", textAlign: "center", marginTop: 20 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { color: "white", marginTop: 10 },

  dayContainer: { marginBottom: 15 },
  dayHeader: { fontSize: 20, fontWeight: "bold", color: "#FFA500", marginBottom: 5 },

  subjectCard: { backgroundColor: "#1E1E1E", padding: 10, borderRadius: 8, marginBottom: 5 },
  subjectTime: { fontSize: 16, color: "#FFA500", fontWeight: "bold" },
  subjectName: { fontSize: 16, color: "white" },
});

export default TimetableScreen;
