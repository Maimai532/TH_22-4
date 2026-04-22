import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const HERO_IMAGE = require("../../assets/images/on1.png");

const C = {
  brown: "#C07A3A",
  brownDark: "#9B5E22",
  brownLight: "#E8C99A",
};

export default function OnboardingScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Ảnh chiếm 2/3 màn hình */}
      <View style={styles.imageSection}>
        <Image source={HERO_IMAGE} style={styles.image} resizeMode="cover" />
        {/* Gradient mờ dần từ ảnh xuống nền đen */}
        <LinearGradient
          colors={["transparent", "#0D0805"]}
          locations={[0.55, 1]}
          style={styles.imageGradient}
        />
      </View>

      {/* Phần nền đen bên dưới */}
      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >

        <Text style={styles.title}>
          Fall in Love with{" "}
          <Text style={{ color: C.brownLight }}>Coffee</Text>
          {"\n"}in Blissful Delight!
        </Text>

        <Text style={styles.subtitle}>
          Welcome to our cozy coffee corner, where{"\n"}
          every cup is a delightful for you.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={() => navigation.replace("MainTabs")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0805",
  },

  // Ảnh 2/3 màn hình
  imageSection: {
    height: height * 0.60,
    width: "100%",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  // Gradient đè lên cạnh dưới ảnh
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,          
  },

  // Nội dung bên dưới
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 40,
    justifyContent: "space-between",

  },


  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 42,
    marginBottom: 10,
    textAlign:'center'
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.55)",
    lineHeight: 22,
    marginBottom: 28,
    textAlign:'center'
  },
  button: {
    backgroundColor: "#C07A3A",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    shadowColor: "#C07A3A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});