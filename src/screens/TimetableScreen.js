import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_BASE_URL = "http://172.20.10.7:8000";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const TimetableScreen = () => {
  const { token } = useContext(AuthContext);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [timetable, setTimetable] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${API_BASE_URL}/services/timetable`, { headers });
        setTimetable(response.data || {}); // ✅ Ensures data exists
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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFA500" />
          <Text style={styles.loadingText}>Loading Timetable...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Day Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daySelector}>
          {days.map((day) => (
            <TouchableOpacity 
              key={day} 
              onPress={() => setSelectedDay(day)} 
              style={[styles.dayButton, selectedDay === day && styles.activeDay]}
            >
              <Text style={[styles.dayText, selectedDay === day && styles.activeDayText]}>{day}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Timetable for Selected Day */}
        <Text style={styles.dayHeading}>{selectedDay}</Text>

        <FlatList
          data={timetable[selectedDay] || []} // ✅ Ensures safe access
          keyExtractor={(item, index) => index.toString()}
          numColumns={2} // ✅ Ensures 2 columns per row
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
              <Text style={styles.detailsText}>Lecture: {item.lecture || "TBD"}</Text>
              <Text style={styles.detailsText}>Course: {item.subject}</Text>
              <Text style={styles.detailsText}>Room: {item.room || "TBD"}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" }, 
  container: { flex: 1, padding: 20 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { color: "white", marginTop: 10 },

  daySelector: { flexDirection: "row", marginBottom: 15 },
  dayButton: { padding: 12, marginHorizontal: 5, backgroundColor: "#333", borderRadius: 8 },
  activeDay: { backgroundColor: "#FFA500" },
  dayText: { color: "white", fontSize: 16 },
  activeDayText: { color: "black", fontWeight: "bold" },

  dayHeading: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 15, textAlign: "center" },

  card: { flex: 1, backgroundColor: "#1E1E1E", padding: 15, margin: 8, borderRadius: 10, alignItems: "center", width: "48%" },
  cardHeader: { backgroundColor: "black", padding: 8, borderRadius: 5, width: "100%", alignItems: "center" },
  timeText: { color: "white", fontSize: 16, fontWeight: "bold" },
  detailsText: { color: "#FFA500", fontSize: 14, marginTop: 5, textAlign: "center" },
});

export default TimetableScreen;
