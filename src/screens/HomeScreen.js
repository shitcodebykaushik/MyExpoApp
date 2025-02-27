import React, { useEffect, useState, useContext } from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, 
  ScrollView, SafeAreaView, Modal 
} from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const API_BASE_URL = "http://172.20.10.7:8000"; // Ensure this is correct

const HomeScreen = ({ navigation }) => {
  const { token } = useContext(AuthContext);
  
  // State to store API data
  const [attendance, setAttendance] = useState(null);
  const [cgpa, setCgpa] = useState(null);
  const [examCount, setExamCount] = useState(0);
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [announcementCount, setAnnouncementCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  // ✅ Fetch all student data after login
  useEffect(() => {
    if (!token) return; // Ensures requests only happen after login

    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [attendanceRes, cgpaRes, examRes, studyRes, timetableRes, annRes, userRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/student/attendance`, { headers }),
          axios.get(`${API_BASE_URL}/student/cgpa`, { headers }),
          axios.get(`${API_BASE_URL}/student/exam`, { headers }),
          axios.get(`${API_BASE_URL}/student/study-material`, { headers }),
          axios.get(`${API_BASE_URL}/student/timetable`, { headers }),
          axios.get(`${API_BASE_URL}/student/announcements`, { headers }),
          axios.get(`${API_BASE_URL}/student/profile`, { headers }), // ✅ Fetch user profile after login
        ]);

        setAttendance(attendanceRes.data);
        setCgpa(cgpaRes.data);
        setExamCount(examRes.data?.exam_count || 0);
        setStudyMaterials(studyRes.data?.study_materials || []);
        setTimetable(timetableRes.data?.timetable || []);
        setAnnouncementCount(annRes.data?.announcement_count || 0);
        setUserDetails(userRes.data || {}); // ✅ Store user details

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]); // ✅ Ensures API calls only happen after login

  const services = [
    { id: "1", name: "Attendance", icon: "calendar-check", value: attendance ? `${attendance.percentage}%` : "--", screen: "AttendanceScreen" },
    { id: "2", name: "CGPA", icon: "chart-line", value: cgpa ? `${cgpa.cgpa}` : "--", screen: "CGPAScreen" },
    { id: "3", name: "Exams", icon: "file-document", value: examCount, screen: "ExamScreen" },
    { id: "4", name: "Study Material", icon: "book-open", value: studyMaterials.length || 0, screen: "StudyMaterialScreen" },
    { id: "5", name: "Timetable", icon: "clock-outline", value: timetable.length ? "View" : "--", screen: "TimetableScreen" },
    { id: "6", name: "Announcements", icon: "bell-outline", value: announcementCount, screen: "AnnouncementsScreen" },
  ];

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFA500" />
          <Text style={styles.loadingText}>Fetching data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>LPU Touch</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons name="account-circle" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/* Welcome Section */}
        <Text style={styles.welcome}>Howdy, {userDetails?.name || "Student"}</Text>

        {/* Grid of Services */}
        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.serviceCard} 
              onPress={() => {
                if (item.screen) {
                  navigation.navigate(item.screen, { studyMaterials });
                } else {
                  console.log("Navigation error: screen not found");
                }
              }}
            >
              {/* Orange Badge at the Top Right */}
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.value}</Text>
              </View>

              {/* Icon */}
              <MaterialCommunityIcons name={item.icon} size={30} color="#FFA500" />
              <Text style={styles.serviceText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>

      {/* Profile Modal */}
      <Modal 
        visible={isModalVisible} 
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>User Details</Text>
            <Text style={styles.modalText}>Name: {userDetails?.name || "N/A"}</Text>
            <Text style={styles.modalText}>Reg. Number: {userDetails?.registration_number || "N/A"}</Text>
            <Text style={styles.modalText}>Course: {userDetails?.course || "N/A"}</Text>
            <Text style={styles.modalText}>Phone: {userDetails?.phone || "N/A"}</Text>
            <Text style={styles.modalText}>Residence: {userDetails?.residence || "N/A"}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
  container: { flex: 1, padding: 20 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { color: "white", marginTop: 10 },

  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  logo: { fontSize: 22, fontWeight: "bold", color: "white" },
  welcome: { fontSize: 18, color: "white", marginBottom: 10 },

  serviceCard: { 
    flex: 1, backgroundColor: "#1E1E1E", padding: 20, margin: 5, 
    alignItems: "center", borderRadius: 10, position: "relative"
  },
  
  badge: { position: "absolute", top: -10, right: -10, backgroundColor: "#FFA500", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 12, minWidth: 40, justifyContent: "center", alignItems: "center" },
  badgeText: { color: "black", fontSize: 14, fontWeight: "bold" },
  serviceText: { color: "white", marginTop: 5, fontSize: 16 },

  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.7)" },
  modalContent: { backgroundColor: "#1E1E1E", padding: 20, borderRadius: 10, width: 300 },
  modalTitle: { fontSize: 20, fontWeight: "bold", color: "#FFA500", marginBottom: 10 },
  modalText: { fontSize: 16, color: "white", marginBottom: 5 },
  closeButton: { backgroundColor: "#FFA500", padding: 10, borderRadius: 5, marginTop: 10, alignItems: "center" },
  closeButtonText: { fontSize: 16, fontWeight: "bold", color: "black" },
});

export default HomeScreen;
