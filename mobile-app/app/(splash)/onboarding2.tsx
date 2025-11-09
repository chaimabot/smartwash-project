import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Onboarding2Screen() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/onboarding3");
  };

  const handlePrevious = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111621" />

      <View style={styles.mainContent}>
        {/* Indicateurs de pagination en haut */}
        <View style={styles.topPaginationContainer}>
          <View style={styles.paginationDot} />
          <View style={[styles.paginationDot, styles.paginationDotActive]} />
          <View style={styles.paginationDot} />
        </View>

        {/* Section centrale avec illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.phoneFrame}>
            {/* Cadre du téléphone */}
            <View style={styles.phoneBody} />

            {/* Notification 1 - En haut à droite */}
            <View style={[styles.notification, styles.notification1]}>
              <View style={styles.notificationIcon}>
                <MaterialCommunityIcons
                  name="washing-machine"
                  size={24}
                  color="#2463eb"
                />
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>Cycle terminé</Text>
                <Text style={styles.notificationSubtitle}>
                  Votre machine N°7 est prête.
                </Text>
              </View>
            </View>

            {/* Notification 2 - En bas à gauche */}
            <View style={[styles.notification, styles.notification2]}>
              <View style={styles.notificationIcon}>
                <MaterialCommunityIcons
                  name="bell-ring"
                  size={24}
                  color="#2463eb"
                />
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>
                  Votre machine est prête
                </Text>
                <Text style={styles.notificationSubtitle}>
                  Venez la récupérer !
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Texte descriptif */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Suivez votre lavage en temps réel</Text>
          <Text style={styles.subtitle}>
            Recevez des notifications à chaque étape clé du cycle pour savoir
            exactement quand votre lessive est prête.
          </Text>
        </View>

        {/* Boutons de navigation */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.previousButton}
            onPress={handlePrevious}
            activeOpacity={0.8}
          >
            <Text style={styles.previousButtonText}>Précédent</Text>
          </TouchableOpacity>

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
    paddingHorizontal: 16,
    justifyContent: "space-between",
    maxWidth: 480,
    width: "100%",
    alignSelf: "center",
  },
  topPaginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    paddingVertical: 32,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#475569",
  },
  paginationDotActive: {
    backgroundColor: "#2463eb",
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  phoneFrame: {
    position: "relative",
    width: Math.min(width * 0.8, 320),
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  phoneBody: {
    position: "absolute",
    width: "50%",
    height: "100%",
    borderRadius: 12,
    backgroundColor: "#1e293b",
    borderWidth: 4,
    borderColor: "#334155",
  },
  notification: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    width: "80%",
  },
  notification1: {
    top: "20%",
    right: 0,
    transform: [{ translateX: 40 }],
  },
  notification2: {
    top: "50%",
    left: 0,
    transform: [{ translateX: -40 }],
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(36, 99, 235, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#e2e8f0",
    marginBottom: 2,
  },
  notificationSubtitle: {
    fontSize: 12,
    color: "#94a3b8",
  },
  textContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 16,
    paddingBottom: 24,
  },
  previousButton: {
    flex: 1,
    backgroundColor: "#1e293b",
    paddingVertical: 14,
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
  previousButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.015,
  },
  nextButton: {
    flex: 1,
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
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.015,
  },
});
