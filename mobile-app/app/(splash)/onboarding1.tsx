import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Onboarding1Screen() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/onboarding2");
  };

  const handleSkip = () => {
    router.push("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />

      {/* Header avec bouton Passer */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkip}
          activeOpacity={0.8}
        >
          <Text style={styles.skipButtonText}>Passer</Text>
        </TouchableOpacity>
      </View>

      {/* Contenu principal */}
      <View style={styles.mainContent}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYPWwdqy7zCrrziEbNOcIi2hreJpYMZovU44zQV1UcYmYOTUQTvddqXwPwSJKwAw7IVL8v7sVclW2Gl2SugBd2IBD6CyNGZFbZnibe4GX9ngdSvQqVtrTaDhyotW3QwAe0aP8l5ExIsCvhI-6mADrIU4jHiHnI9HILd0AqGnG06edPM6V3tcyaB3tqUBk8_llk1pSm6MCdNc9f9hDFowQdti-PZezVgX5hKWTjIyOLRexaFjxLtAKqKj7cYCS8n_s-vU561-BCVcf0",
            }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Bienvenue chez Laverie Smart</Text>
          <Text style={styles.subtitle}>
            Laver votre linge n&apos;a jamais été aussi simple et rapide.
          </Text>
        </View>

        <View style={styles.paginationContainer}>
          <View style={[styles.paginationDot, styles.paginationDotActive]} />
          <View style={styles.paginationDot} />
          <View style={styles.paginationDot} />
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={["#2463eb", "#1d4ed8"]}
            style={styles.nextButtonGradient}
          >
            <Text style={styles.nextButtonText}>Suivant</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: "flex-end",
  },
  skipButton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 9999,
    minWidth: 84,
    alignItems: "center",
  },
  skipButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  imageContainer: {
    width: Math.min(width - 32, 400),
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  footer: {
    paddingBottom: 16,
  },
  textContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#cbd5e1",
    textAlign: "center",
    lineHeight: 24,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#374151",
  },
  paginationDotActive: {
    width: 20,
    backgroundColor: "#2463eb",
  },
  nextButton: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 9999,
    overflow: "hidden",
    shadowColor: "#2463eb",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.015,
  },
});
