import React, { useEffect, useRef } from "react";
import { View, Image, StyleSheet, ActivityIndicator, Animated, Text } from "react-native";

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity 0
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // Initial scale 0.8

  useEffect(() => {
    // Start animations in parallel
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace("Login"); // Navigate after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      {/* Animated Logo */}
      <Animated.Image 
        source={require("../assets/Lovely Professional University-04.png")} 
        style={[styles.logo, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]} 
      />

      {/* "We are Vertos" Text */}
      <Animated.Text style={[styles.tagline, { opacity: fadeAnim }]}>
        We are Vertos
      </Animated.Text>

      {/* Animated Loader */}
      <Animated.View style={{ opacity: fadeAnim, marginTop: 20 }}>
        <ActivityIndicator size="large" color="#F58220" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#121212" 
  },
  logo: { 
    width: 150, 
    height: 150, 
    resizeMode: "contain" 
  },
  tagline: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F58220",
    marginTop: 10,
  },
});

export default SplashScreen;
