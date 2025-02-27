import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, SafeAreaView } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_BASE_URL = "http://172.20.10.7:8000";

const SecurityScreen = () => {
  const { token } = useContext(AuthContext);
  const [securityOfficers, setSecurityOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSecurityOfficers = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${API_BASE_URL}/services/security`, { headers });

        setSecurityOfficers(response.data.security_officers || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching security officers:", error);
        setLoading(false);
      }
    };

    fetchSecurityOfficers();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFA500" />
          <Text style={styles.loadingText}>Loading Security Officers...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Security Officers</Text>

        <FlatList
          data={securityOfficers}
          keyExtractor={(item) => item.uid_number}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image_url }} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.position}>{item.position}</Text>
                <Text style={styles.contact}>📞 {item.emergency_contact}</Text>
              </View>
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

  header: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 15, textAlign: "center" },

  card: { flexDirection: "row", backgroundColor: "#1E1E1E", padding: 15, borderRadius: 10, marginBottom: 10, alignItems: "center" },
  image: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  details: { flex: 1 },
  name: { fontSize: 18, fontWeight: "bold", color: "#FFA500" },
  position: { fontSize: 16, color: "white" },
  contact: { fontSize: 14, color: "#FFD700", marginTop: 5 },
});

export default SecurityScreen;
