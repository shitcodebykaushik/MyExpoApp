import React from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, FlatList, 
  ScrollView, SafeAreaView, Image 
} from "react-native";

const HomeScreen = ({ navigation }) => {
  const services = [
    { id: "1", name: "Attendance", icon: "checked-checkbox", value: "90%", screen: "AttendanceScreen" },
    { id: "2", name: "CGPA", icon: "combo-chart", value: "7.5", screen: "CGPAScreen" },
    { id: "3", name: "Exams", icon: "exam", value: "2", screen: "ExamScreen" },
    { id: "4", name: "Study Material", icon: "books", value: "10", screen: "StudyMaterialScreen" },
    { id: "5", name: "Timetable", icon: "timetable", value: "7", screen: "TimetableScreen" },
    { id: "6", name: "Announcements", icon: "appointment-reminders", value: "2", screen: "AnnouncementsScreen" },
  ];

  const bottomBoxes = [
    { id: "1", text: "Upcoming Holidays", icon: "holiday" },
    { id: "2", text: "Library Updates", icon: "book" },
    { id: "3", text: "New Courses", icon: "education" },
    { id: "4", text: "Events & Seminars", icon: "event" },
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

              {/* Custom Icon from Icons8 */}
              <Image 
                source={{ uri: `https://img.icons8.com/ios/100/ffffff/${item.icon}.png` }} 
                style={styles.iconImage} 
              />

              <Text style={styles.serviceText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Dark Themed Horizontal Scrollable Bottom Boxes */}
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomHeader}>Latest Updates</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {bottomBoxes.map((box) => (
              <View key={box.id} style={styles.bottomBox}>
                {/* Icons in Bottom Boxes */}
                <Image 
                  source={{ uri: `https://img.icons8.com/ios/50/ffffff/${box.icon}.png` }} 
                  style={styles.bottomBoxIcon} 
                />
                <Text style={styles.bottomBoxText}>{box.text}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ============================ STYLES ============================

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

  iconImage: { width: 50, height: 50, marginBottom: 5 },

  serviceText: { color: "white", marginTop: 5, fontSize: 16 },

  bottomContainer: { 
    marginTop: 20, backgroundColor: "#1E1E1E", paddingVertical: 15, paddingHorizontal: 10, 
    borderRadius: 10, 
  },
  bottomHeader: { fontSize: 18, fontWeight: "bold", color: "white", marginBottom: 10 },

  bottomBox: {
    backgroundColor: "#2C2C2C", 
    padding: 15, 
    borderRadius: 10, 
    marginRight: 10, 
    alignItems: "center",
    minWidth: 150,
  },
  bottomBoxIcon: { width: 30, height: 30, marginBottom: 5 },
  bottomBoxText: { fontSize: 16, color: "white", fontWeight: "bold" },
});

export default HomeScreen;
