import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ProfileScreen = () => {
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://172.20.10.7:8000/student/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return <Text>Loading profile...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Name: {profile.name}</Text>
      <Text>Registration Number: {profile.registration_number}</Text>
      <Text>Course: {profile.course}</Text>
      <Text>Phone: {profile.phone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
});

export default ProfileScreen; // ✅ Ensure this is correctly exported
