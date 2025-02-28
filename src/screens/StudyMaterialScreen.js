import React, { useContext, useEffect, useState } from "react";
import { 
  View, Text, ActivityIndicator, SafeAreaView, 
  TouchableOpacity, ScrollView, Image, StyleSheet
} from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import * as Linking from "expo-linking";
import { MaterialIcons } from "@expo/vector-icons";

const API_BASE_URL = "http://172.20.10.7:8000";

const StudyMaterialScreen = () => {
  const { token } = useContext(AuthContext);
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudyMaterials = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${API_BASE_URL}/services/materials`, { headers });

        // ✅ Ensure the correct structure is used and handle potential missing data
        setStudyMaterials(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching study materials:", error);
        setLoading(false);
      }
    };

    fetchStudyMaterials();
  }, [token]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFA500" />
          <Text style={styles.loadingText}>Fetching Study Materials...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>📚 Study Materials</Text>

        {studyMaterials.length === 0 ? (
          <Text style={styles.noData}>No study materials available.</Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {studyMaterials.map((item, index) => (
              <View key={index} style={styles.materialBox}>
                {/* Icon */}
                <Image 
                  source={{ uri: "https://img.icons8.com/ios-filled/100/ffa500/book.png" }} 
                  style={styles.iconImage} 
                />

                {/* Title */}
                <Text style={styles.title}>{item.title || "No Title Available"}</Text>
                
                {/* Download Button */}
                <TouchableOpacity 
                  style={styles.downloadButton} 
                  onPress={() => item.pdf_link ? Linking.openURL(item.pdf_link) : alert("No link available")}
                >
                  <MaterialIcons name="file-download" size={22} color="white" />
                  <Text style={styles.downloadText}>Download PDF</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// ============================ STYLES ============================

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
  container: { flexGrow: 1, padding: 20 },

  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { color: "white", marginTop: 10 },
  noData: { color: "gray", fontSize: 18, textAlign: "center", marginTop: 20 },

  header: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 10 },

  horizontalScroll: { marginTop: 10 },

  materialBox: { 
    backgroundColor: "#1E1E1E", 
    padding: 20, 
    borderRadius: 10, 
    marginRight: 15, 
    width: 300, 
    height: 180,
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconImage: { width: 50, height: 50, marginBottom: 10 },

  title: { fontSize: 18, fontWeight: "bold", color: "#FFA500", marginBottom: 10, textAlign: "center" },

  downloadButton: { 
    flexDirection: "row", 
    backgroundColor: "#FFA500", 
    padding: 10, 
    borderRadius: 5, 
    alignItems: "center", 
    justifyContent: "center", 
    width: "90%",
  },

  downloadText: { color: "white", fontSize: 16, marginLeft: 5, fontWeight: "bold" },
});

export default StudyMaterialScreen;
