import React, { useEffect, useState, useContext } from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, FlatList, 
  ScrollView, SafeAreaView, Image, Modal, ActivityIndicator, Animated 
} from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_BASE_URL = "http://172.20.10.7:8000";

const HomeScreen = ({ navigation }) => {
  const { token, logout } = useContext(AuthContext); // ✅ Logout function added
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnimation = new Animated.Value(1000);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`${API_BASE_URL}/user/details`, { headers });
        setUserDetails(response.data || {});
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [token]);

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnimation, {
      toValue: 1000,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header with User Profile Icon */}
        <View style={styles.header}>
          <Text style={styles.logo}>LPU Touch</Text>
          <TouchableOpacity onPress={openModal}>
            <Image 
              source={{ uri: "https://img.icons8.com/ios-filled/50/f58220/user-male-circle.png" }} 
              style={styles.userIcon} 
            />
          </TouchableOpacity>
        </View>

        {/* Grid of Services */}
        <FlatList
          data={[
            { id: "1", name: "Attendance", icon: "checked-checkbox", value: "90%", screen: "AttendanceScreen" },
            { id: "2", name: "CGPA", icon: "combo-chart", value: "7.5", screen: "CGPAScreen" },
            { id: "3", name: "Exams", icon: "exam", value: "2", screen: "ExamScreen" },
            { id: "4", name: "Study Material", icon: "books", value: "10", screen: "StudyMaterialScreen" },
            { id: "5", name: "Timetable", icon: "timetable", value: "7", screen: "TimetableScreen" },
            { id: "6", name: "Announcements", icon: "appointment-reminders", value: "2", screen: "AnnouncementsScreen" },
          ]}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.serviceCard} 
              onPress={() => navigation.navigate(item.screen)}
            >
              {/* Yellow Badge at the Top Right */}
              <View style={styles.yellowBadge}>
                <Text style={styles.badgeText}>{item.value}</Text>
              </View>

              {/* Custom Icon from Icons8 */}
              <Image 
                source={{ uri: `https://img.icons8.com/ios/100/f58220/${item.icon}.png` }} 
                style={styles.iconImage} 
              />

              <Text style={styles.serviceText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        {/* User Profile Full-Screen Modal */}
        {modalVisible && (
          <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnimation }] }]}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>✖</Text>
              </TouchableOpacity>
            </View>

            <Image 
              source={{ uri: "https://img.icons8.com/ios-filled/100/f58220/user-male-circle.png" }} 
              style={styles.profileIcon} 
            />
            
            {loading ? (
              <ActivityIndicator size="large" color="#F58220" />
            ) : (
              <>
                <Text style={styles.profileName}>{userDetails?.name || "N/A"}</Text>

                {/* User Details in Line-by-Line Layout */}
                <View style={styles.profileDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>📌 Registration No:</Text>
                    <Text style={styles.value}>{userDetails?.registration_number || "N/A"}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>🎓 Course:</Text>
                    <Text style={styles.value}>{userDetails?.course || "N/A"}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>📞 Phone:</Text>
                    <Text style={styles.value}>{userDetails?.phone || "N/A"}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>🏠 Residence:</Text>
                    <Text style={styles.value}>{userDetails?.residence || "N/A"}</Text>
                  </View>
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// ============================ STYLES ============================

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
  container: { flexGrow: 1, padding: 20 },

  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  logo: { fontSize: 22, fontWeight: "bold", color: "white" },
  userIcon: { width: 40, height: 40 },

  serviceCard: { flex: 1, backgroundColor: "#1E1E1E", padding: 20, margin: 5, alignItems: "center", borderRadius: 10 },
  
  yellowBadge: { position: "absolute", top: -10, right: -10, backgroundColor: "#FFD700", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 12 },
  badgeText: { color: "black", fontSize: 14, fontWeight: "bold" },

  iconImage: { width: 50, height: 50, marginBottom: 5 },
  serviceText: { color: "#F58220", marginTop: 5, fontSize: 16 },

  modalContainer: { position: "absolute", width: "100%", height: "100%", backgroundColor: "#1E1E1E", alignItems: "center", paddingTop: 80 },
  modalHeader: { position: "absolute", top: 20, right: 20 },
  closeButton: { fontSize: 24, color: "#F58220", fontWeight: "bold" },

  profileIcon: { width: 100, height: 100, marginBottom: 15 },
  profileName: { fontSize: 24, fontWeight: "bold", color: "#F58220", marginBottom: 10 },

  profileDetails: { width: "90%" },
  detailRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#333" },

  logoutButton: { backgroundColor: "#FF3B30", padding: 15, borderRadius: 10, marginTop: 20 },
  logoutText: { fontSize: 16, fontWeight: "bold", color: "white" },
});

export default HomeScreen;
