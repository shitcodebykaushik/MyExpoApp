import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_BASE_URL = "http://172.20.10.7:8000";

const AnnouncementsScreen = () => {
  const { token } = useContext(AuthContext);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${API_BASE_URL}/services/announcements`, { headers });

        // ✅ Extracting announcements correctly from response
        setAnnouncements(response.data.announcements || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching announcements:", error);
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFA500" />
        <Text style={styles.loadingText}>Loading Announcements...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Announcements</Text>

      {announcements.length > 0 ? (
        announcements.map((announcement, index) => (
          <View key={index} style={styles.announcementCard}>
            <Text style={styles.date}>{announcement.date || "No Date"}</Text>
            <Text style={styles.text}>{announcement.message || "No announcement available."}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noData}>No announcements available.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  heading: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 10 },
  noData: { fontSize: 18, color: "gray", textAlign: "center", marginTop: 20 },

  announcementCard: { backgroundColor: "#1E1E1E", padding: 15, borderRadius: 8, marginBottom: 10 },
  date: { fontSize: 16, color: "#FFA500", fontWeight: "bold", marginBottom: 5 },
  text: { fontSize: 18, color: "white" },

  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { color: "white", marginTop: 10 },
});

export default AnnouncementsScreen;
