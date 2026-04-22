import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import OnboardingScreen from "../screens/Onboarding";
import HomeScreen from "../screens/Home";
import DetailScreen from "../screens/Detail";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const C = {
  brown: "#C07A3A",
  sub: "#8B7355",
  bg: "#F5F0EB",
};

const FavoritesPlaceholder = () => <View style={{ flex: 1, backgroundColor: C.bg }} />;
const CartPlaceholder = () => <View style={{ flex: 1, backgroundColor: C.bg }} />;
const NotificationsPlaceholder = () => <View style={{ flex: 1, backgroundColor: C.bg }} />;

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: C.brown,
        tabBarInactiveTintColor: C.sub,
        tabBarIcon: ({ focused, color }) => {
          const icons = {
            Home: focused ? "home" : "home-outline",
            Favorites: focused ? "heart" : "heart-outline",
            Cart: focused ? "bag" : "bag-outline",
            Notifications: focused ? "notifications" : "notifications-outline",
          };
          return (
            <View style={styles.iconWrapper}>
              <Ionicons name={icons[route.name]} size={24} color={color} />
              {focused && <View style={styles.dot} />}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesPlaceholder} />
      <Tab.Screen name="Cart" component={CartPlaceholder} />
      <Tab.Screen name="Notifications" component={NotificationsPlaceholder} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
    borderTopColor: "#EDE0D0",
    borderTopWidth: 1,
    height: 72,
    paddingBottom: 10,
    paddingTop: 6,
  },
  iconWrapper: {
    alignItems: "center",
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.brown,
    marginTop: 2,
  },
});