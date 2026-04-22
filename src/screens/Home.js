import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  SafeAreaView,
} from "react-native";
import data from "../data/data";

const PROMO_IMAGE = require("../../assets/images/Banner.png");

const C = {
  bg: "#F5F0EB",
  brown: "#C07A3A",
  brownDark: "#9B5E22",
  brownLight: "#E8C99A",
  text: "#1A1009",
  sub: "#8B7355",
  tag: "#F0E6D3",
  star: "#F5A623",
  card: "#FFFFFF",
};

export default function HomeScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState("All Coffee");
  const [searchText, setSearchText] = useState("");

  const filtered = data.coffees.filter((c) => {
    const matchCat = activeCategory === "All Coffee" || c.category === activeCategory;
    const matchSearch = c.name.toLowerCase().includes(searchText.toLowerCase());
    return matchCat && matchSearch;
  });

  const renderCoffeeCard = ({ item }) => (
    <TouchableOpacity
      style={styles.coffeeCard}
      activeOpacity={0.85}
      onPress={() => navigation.navigate("Detail", { coffee: item })}
    >
      <View style={styles.coffeeImageWrapper}>
        <Image source={item.image} style={styles.coffeeImage} />
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingStarIcon}>★</Text>
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.coffeeInfo}>
        <Text style={styles.coffeeName}>{item.name}</Text>
        <Text style={styles.coffeeType}>{item.type}</Text>
        <View style={styles.coffeeFooter}>
          <Text style={styles.coffeePrice}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("Detail", { coffee: item })}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        decelerationRate={0.85}      // ← tốc độ dừng: 0 = dừng ngay, 1 = trượt dài
        scrollEventThrottle={16}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.locationLabel}>Location</Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationName}>Bilzen, Tanjungbalai</Text>
              <Text style={styles.locationArrow}>▾</Text>
            </View>
          </View>
          <View style={styles.filterButton}>
            <Text style={styles.filterIcon}>⊞</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search coffee"
            placeholderTextColor={C.sub}
            style={styles.searchInput}
          />
        </View>

        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <Image source={PROMO_IMAGE} style={styles.promoImage} />
          <View style={styles.promoOverlay} />
          <View style={styles.promoContent}>
            <View style={styles.promoTag}>
              <Text style={styles.promoTagText}>Promo</Text>
            </View>
            <Text style={styles.promoTitle}>
              Buy one get{"\n"}one <Text style={{ color: C.brownLight }}>FREE</Text>
            </Text>
          </View>
        </View>

        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
          decelerationRate={0.6}     // ← scroll ngang dừng nhanh hơn
        >
          {data.categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryBtn, activeCategory === cat && styles.categoryBtnActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Coffee Grid */}
        <FlatList
          data={filtered}
          renderItem={renderCoffeeCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.gridRow}
          scrollEnabled={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F5F0EB" },
  container: { flex: 1, backgroundColor: "#F5F0EB" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 4,
  },
  locationLabel: { fontSize: 11, color: "#8B7355" },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  locationName: { fontSize: 15, fontWeight: "700", color: "#1A1009" },
  locationArrow: { fontSize: 12, color: "#C07A3A" },
  filterButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#C07A3A",
    alignItems: "center",
    justifyContent: "center",
  },
  filterIcon: { fontSize: 18, color: "#fff" },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    marginHorizontal: 20,
    marginTop: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, fontSize: 14, color: "#1A1009" },

  promoBanner: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 20,
    overflow: "hidden",
    height: 160,
  },
  promoImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    opacity: 0.45,
  },
  promoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#2C1A0E",
    opacity: 0.7,
  },
  promoContent: { padding: 22 },
  promoTag: {
    backgroundColor: "#C07A3A",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 10,
  },
  promoTagText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  promoTitle: { color: "#fff", fontSize: 26, fontWeight: "800", lineHeight: 32 },

  categoryRow: {
    paddingHorizontal: 20,
    paddingTop: 18,
    gap: 8,
  },
  categoryBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#DDD",
    backgroundColor: "#fff",
    marginRight: 8,
  },
  categoryBtnActive: {
    borderColor: "#C07A3A",
    backgroundColor: "#C07A3A",
  },
  categoryText: { fontSize: 13, fontWeight: "600", color: "#8B7355" },
  categoryTextActive: { color: "#fff" },

  gridRow: { justifyContent: "space-between", marginBottom: 16 },
  coffeeCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
    marginTop: 16,
  },
  coffeeImageWrapper: { position: "relative" },
  coffeeImage: { width: "100%", height: 110 },
  ratingBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingStarIcon: { color: "#F5A623", fontSize: 11 },
  ratingText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  coffeeInfo: { padding: 12, paddingBottom: 14 },
  coffeeName: { fontSize: 14, fontWeight: "700", color: "#1A1009" },
  coffeeType: { fontSize: 11, color: "#8B7355", marginTop: 2, marginBottom: 10 },
  coffeeFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  coffeePrice: { fontSize: 15, fontWeight: "800", color: "#1A1009" },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#C07A3A",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: { color: "#fff", fontSize: 18, fontWeight: "700", lineHeight: 22 },
});