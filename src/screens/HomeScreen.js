import React, { useEffect, useState } from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, 
  ScrollView, SafeAreaView, Modal 
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const services = [
    { id: "1", name: "Attendance", icon: "calendar-check", value: "90%", screen: "AttendanceScreen" },
    { id: "2", name: "CGPA", icon: "chart-line", value: "7.5", screen: "CGPAScreen" },
    { id: "3", name: "Exams", icon: "file-document", value: "2", screen: "ExamScreen" },
    { id: "4", name: "Study Material", icon: "book-open", value: "10", screen: "StudyMaterialScreen" },
    { id: "5", name: "Timetable", icon: "clock-outline", value: "7", screen: "TimetableScreen" },
    { id: "6", name: "Announcements", icon: "bell-outline", value: "2", screen: "AnnouncementsScreen" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>LPU Touch</Text>
        </View>

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
                  navigation.navigate(item.screen);
                } else {
                  console.log("Navigation error: screen not found");
                }
              }}
            >
              {/* Yellow Badge at the Top Right */}
              <View style={styles.yellowBadge}>
                <Text style={styles.badgeText}>{item.value}</Text>
              </View>

              {/* Icon */}
              <MaterialCommunityIcons name={item.icon} size={30} color="#FFA500" />
              <Text style={styles.serviceText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#121212" },
  container: { flexGrow: 1, padding: 20, justifyContent: "center" },

  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  logo: { fontSize: 22, fontWeight: "bold", color: "white" },

  serviceCard: { 
    flex: 1, backgroundColor: "#1E1E1E", padding: 20, margin: 5, 
    alignItems: "center", borderRadius: 10, position: "relative"
  },
  
  yellowBadge: { 
    position: "absolute", top: -10, right: -10, backgroundColor: "#FFD700", paddingVertical: 5, paddingHorizontal: 10, 
    borderRadius: 12, minWidth: 40, justifyContent: "center", alignItems: "center" 
  },
  badgeText: { color: "black", fontSize: 14, fontWeight: "bold" },
  serviceText: { color: "white", marginTop: 5, fontSize: 16 },
});

export default HomeScreen;
