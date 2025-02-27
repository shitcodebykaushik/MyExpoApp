import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// ✅ Ensure these screens exist
import HomeScreen from "../screens/HomeScreen";
import AttendanceScreen from "../screens/AttendanceScreen";
import CGPAScreen from "../screens/CGPAScreen";
import ExamScreen from "../screens/ExamScreen";
import StudyMaterialScreen from "../screens/StudyMaterialScreen";
import TimetableScreen from "../screens/TimetableScreen";
import AnnouncementsScreen from "../screens/AnnouncementsScreen";
import FinanceScreen from "../screens/FinanceScreen";
import SecurityScreen from "../screens/SecurityScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// ✅ Fix: Home Stack Navigator (No Empty Values)
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} />
      <Stack.Screen name="CGPAScreen" component={CGPAScreen} />
      <Stack.Screen name="ExamScreen" component={ExamScreen} />
      <Stack.Screen name="StudyMaterialScreen" component={StudyMaterialScreen} />
      <Stack.Screen name="TimetableScreen" component={TimetableScreen} />
      <Stack.Screen name="AnnouncementsScreen" component={AnnouncementsScreen} />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#121212" },
        tabBarActiveTintColor: "#FFA500",
        tabBarInactiveTintColor: "#888",
      }}
    >
      {/* ✅ Fix: Make sure HomeStackNavigator is correctly assigned */}
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      {/* Finance Screen */}
      <Tab.Screen
        name="Finance"
        component={FinanceScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cash-multiple" color={color} size={size} />
          ),
        }}
      />

      {/* Security Screen */}
      <Tab.Screen
        name="Security"
        component={SecurityScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shield-lock" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
