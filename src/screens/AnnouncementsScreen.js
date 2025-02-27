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
        const response = await axios.get(`${API_BASE_URL}/student/announcements`, { headers });

        setAnnouncements(response.data.announcements);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching announcements:", error);
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
      {announcements.length === 0 ? (
        <Text style={styles.text}>No announcements available.</Text>
      ) : (
        announcements.map((announcement, index) => (
          <Text key={index} style={styles.text}>{announcement}</Text>
        ))
      )}
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

export default AnnouncementsScreen;
