import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";

const C = {
  bg: "#F5F0EB",
  brown: "#C07A3A",
  brownDark: "#9B5E22",
  text: "#1A1009",
  sub: "#8B7355",
  tag: "#F0E6D3",
  star: "#F5A623",
  border: "#EDE0D0",
};

export default function DetailScreen({ route, navigation }) {
  const { coffee } = route.params;
  const [selectedSize, setSelectedSize] = useState("M");
  const [liked, setLiked] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* Top Nav */}
        <View style={styles.topNav}>
          <TouchableOpacity style={styles.navBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.navBtnIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.navTitle}>Detail</Text>
          <TouchableOpacity
            style={styles.navBtn}
            onPress={() => setLiked(!liked)}
          >
            <Text style={[styles.navBtnIcon, { color: liked ? "#E74C3C" : C.sub }]}>
              {liked ? "♥" : "♡"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Coffee Image */}
        <View style={styles.imageWrapper}>
          <Image source={coffee.image} style={styles.coffeeImage} />
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          {/* Name + icons */}
          <View style={styles.nameRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.coffeeName}>{coffee.name}</Text>
              <Text style={styles.coffeeTag}>{coffee.tags.join(" / ")}</Text>
            </View>
            <View style={styles.iconRow}>
              {["☕", "🫘", "🧊"].map((icon, i) => (
                <View key={i} style={styles.iconBox}>
                  <Text style={{ fontSize: 16 }}>{icon}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Text style={styles.starIcon}>★</Text>
            <Text style={styles.ratingNum}>{coffee.rating}</Text>
            <Text style={styles.ratingCount}>({coffee.reviews})</Text>
          </View>

          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {coffee.description.slice(0, 120)}…{" "}
            <Text style={{ color: C.brown, fontWeight: "600" }}>Read More</Text>
          </Text>

          <View style={styles.divider} />

          {/* Size */}
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizeRow}>
            {coffee.sizes.map((s) => (
              <TouchableOpacity
                key={s}
                style={[styles.sizeBtn, selectedSize === s && styles.sizeBtnActive]}
                onPress={() => setSelectedSize(s)}
              >
                <Text
                  style={[styles.sizeBtnText, selectedSize === s && styles.sizeBtnTextActive]}
                >
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceValue}>${coffee.price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.buyButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Order", { coffee })}
        >
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F5F0EB" },
  container: { flex: 1, backgroundColor: "#F5F0EB" },

  // Top Nav
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  navBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#DDD",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  navBtnIcon: { fontSize: 20, color: "#1A1009", fontWeight: "600" },
  navTitle: { fontSize: 16, fontWeight: "700", color: "#1A1009" },

  // Image
  imageWrapper: {
    marginHorizontal: 20,
    borderRadius: 24,
    overflow: "hidden",
    height: 200,
  },
  coffeeImage: { width: "100%", height: "100%", resizeMode: "cover" },

  // Info
  infoSection: { padding: 20 },
  nameRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  coffeeName: { fontSize: 22, fontWeight: "800", color: "#1A1009" },
  coffeeTag: { fontSize: 13, color: "#8B7355", marginTop: 4 },
  iconRow: { flexDirection: "row", gap: 10 },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F0E6D3",
    alignItems: "center",
    justifyContent: "center",
  },

  // Rating
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
    marginBottom: 4,
  },
  starIcon: { color: "#F5A623", fontSize: 16 },
  ratingNum: { fontSize: 13, fontWeight: "700", color: "#1A1009" },
  ratingCount: { fontSize: 13, color: "#8B7355" },

  divider: { height: 1, backgroundColor: "#EDE0D0", marginVertical: 16 },

  sectionTitle: { fontSize: 15, fontWeight: "700", color: "#1A1009", marginBottom: 8 },
  description: { fontSize: 13, color: "#8B7355", lineHeight: 21 },

  // Size
  sizeRow: { flexDirection: "row", gap: 10 },
  sizeBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#DDD",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  sizeBtnActive: { borderColor: "#C07A3A", backgroundColor: "#FFF5EB" },
  sizeBtnText: { fontSize: 15, fontWeight: "700", color: "#8B7355" },
  sizeBtnTextActive: { color: "#C07A3A" },

  // Bottom Bar
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#EDE0D0",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  priceLabel: { fontSize: 11, color: "#8B7355" },
  priceValue: { fontSize: 20, fontWeight: "800", color: "#C07A3A" },
  buyButton: {
    flex: 1,
    backgroundColor: "#C07A3A",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#C07A3A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  buyButtonText: { color: "#fff", fontSize: 15, fontWeight: "700" },
});