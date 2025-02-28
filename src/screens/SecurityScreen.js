import React, { useEffect, useState, useContext } from "react";
import { 
  View, Text, StyleSheet, FlatList, Image, ActivityIndicator, SafeAreaView, ScrollView 
} from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_BASE_URL = "http://172.20.10.7:8000";

const SecurityHospitalScreen = () => {
  const { token } = useContext(AuthContext);
  const [securityOfficers, setSecurityOfficers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🏥 Hardcoded Hospital Data
  const hospitals = [
    {
      name: "City Hospital",
      type: "Emergency 24/7",
      contact: "+91 9876543210",
      image_url: "https://img.icons8.com/ios-filled/100/f58220/hospital-room.png",
    },
    {
      name: "MediCare Clinic",
      type: "General Checkups",
      contact: "+91 8765432109",
      image_url: "https://img.icons8.com/ios-filled/100/f58220/stethoscope.png",
    },
    {
      name: "Red Cross Medical",
      type: "First Aid & Ambulance",
      contact: "+91 7654321098",
      image_url: "https://img.icons8.com/ios-filled/100/f58220/ambulance.png",
    },
    {
      name: "Apollo Hospital",
      type: "Specialist Doctors",
      contact: "+91 8543210987",
      image_url: "https://img.icons8.com/ios-filled/100/f58220/hospital-3.png",
    },
  ];

  // 👮‍♂️ Random Security Officer Images
  const randomImages = [
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/women/45.jpg",
    "https://randomuser.me/api/portraits/men/51.jpg",
    "https://randomuser.me/api/portraits/women/29.jpg",
    "https://randomuser.me/api/portraits/men/64.jpg",
    "https://randomuser.me/api/portraits/women/35.jpg",
  ];

  useEffect(() => {
    const fetchSecurityOfficers = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${API_BASE_URL}/services/security`, { headers });

        // Assign Random Image if Image Not Available
        const officersWithImages = response.data.security_officers.map((officer, index) => ({
          ...officer,
          image_url: officer.image_url || randomImages[index % randomImages.length], 
        }));

        setSecurityOfficers(officersWithImages || []);
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
          <ActivityIndicator size="large" color="#F58220" />
          <Text style={styles.loadingText}>Loading Data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* 🚔 Security Officers Section */}
        <Text style={styles.header}>🚔 Security Officers</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {securityOfficers.map((officer, index) => (
            <View key={index} style={styles.box}>
              <Image 
                source={{ uri: "https://img.icons8.com/ios-filled/50/f58220/policeman-male.png" }} 
                style={styles.icon} 
              />
              <Image source={{ uri: officer.image_url }} style={styles.image} />
              <Text numberOfLines={1} style={styles.name}>{officer.name}</Text>
              <Text numberOfLines={1} style={styles.position}>{officer.position}</Text>
              <Text numberOfLines={1} style={styles.contact}>📞 {officer.emergency_contact}</Text>
            </View>
          ))}
        </ScrollView>

        {/* 🏥 Hospital & Medical Assistance Section */}
        <Text style={styles.header}>🏥 Emergency & Medical Assistance</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {hospitals.map((hospital, index) => (
            <View key={index} style={styles.box}>
              <Image 
                source={{ uri: hospital.image_url }} 
                style={styles.icon} 
              />
              <Text numberOfLines={1} style={styles.name}>{hospital.name}</Text>
              <Text numberOfLines={1} style={styles.position}>{hospital.type}</Text>
              <Text numberOfLines={1} style={styles.contact}>📞 {hospital.contact}</Text>
            </View>
          ))}
        </ScrollView>

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

  header: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 15, textAlign: "center" },

  horizontalScroll: { marginTop: 10 },

  box: { 
    backgroundColor: "#1E1E1E", 
    padding: 12, 
    borderRadius: 10, 
    marginRight: 12, 
    width: 150, 
    height: 170,
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },

  icon: { width: 30, height: 30, marginBottom: 5 },

  image: { width: 50, height: 50, borderRadius: 25, marginBottom: 5 },

  name: { fontSize: 14, fontWeight: "bold", color: "#F58220", marginBottom: 3, textAlign: "center" },
  position: { fontSize: 12, color: "#F58220", marginBottom: 3, textAlign: "center" },
  contact: { fontSize: 10, color: "#F58220", textAlign: "center" },
});

export default SecurityHospitalScreen;
