import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Onboarding3Screen() {
  const handleStart = () => {
    // Navigation vers l'écran principal de l'application
    router.replace("/(auth)/register");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111621" />

      <View style={styles.mainContent}>
        {/* Espace flexible en haut */}
        <View style={styles.topSpacer} />

        {/* Section centrale avec icône et texte */}
        <View style={styles.centerContent}>
          {/* Icône de carte de crédit */}
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="credit-card-outline"
              size={112}
              color="#4A90E2"
            />
          </View>

          {/* Titre */}
          <Text style={styles.title}>Paiement simple et sécurisé</Text>

          {/* Sous-titre */}
          <Text style={styles.subtitle}>
            Payez vos lavages en quelques clics directement depuis
            l&apos;application.
          </Text>
        </View>

        {/* Section du bas avec pagination et bouton */}
        <View style={styles.bottomContent}>
          {/* Indicateurs de pagination */}
          <View style={styles.paginationContainer}>
            <View style={styles.paginationDot} />
            <View style={styles.paginationDot} />
            <View style={[styles.paginationDot, styles.paginationDotActive]} />
          </View>

          {/* Bouton Commencer */}
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStart}
            activeOpacity={0.9}
          >
            <Text style={styles.startButtonText}>Commencer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111621",
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    justifyContent: "space-between",
  },
  topSpacer: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(74, 144, 226, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginTop: 32,
    marginBottom: 8,
    letterSpacing: -0.5,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 400,
    paddingHorizontal: 16,
  },
  bottomContent: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 24,
    paddingBottom: 8,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(189, 189, 189, 0.5)",
  },
  paginationDotActive: {
    backgroundColor: "#4A90E2",
  },
  startButton: {
    width: "100%",
    maxWidth: 448,
    backgroundColor: "#50E3C2",
    paddingVertical: 18,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#50E3C2",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  startButtonText: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
