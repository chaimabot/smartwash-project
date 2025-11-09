import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ConfirmationScreen() {
  // const colorScheme = useColorScheme();
  const isDark = true; // Force dark mode comme dans le HTML

  const styles = createStyles(isDark);

  const DetailRow = ({
    icon,
    label,
    value,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: string;
  }) => (
    <View style={styles.detailRow}>
      <Ionicons name={icon} size={24} color="#2463eb" />
      <View style={styles.detailContent}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.replace("/")}
        >
          <Ionicons name="close" size={24} color="#D1D5DB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Réservation confirmée !</Text>
        <View style={styles.closeButton} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Icon */}
        <View style={styles.successContainer}>
          <View style={styles.successOuterCircle}>
            <View style={styles.successInnerCircle}>
              <Ionicons name="checkmark" size={48} color="#fff" />
            </View>
          </View>
        </View>

        {/* QR Code Section */}
        <View style={styles.qrContainer}>
          <View style={styles.qrCodeWrapper}>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVkjQ68XdEfsdRFXzqN8JXeerTq6-YmJ7pUkMxwDth79ptXYS-Fzlqf6HQlYTIu8XRhPcy8YqZ1fj6IawJXv91Zl3u-NetbLPLmENAX6rbQR_lD5h2HvmROTI7B-IM88tzqZ8qXXjWRfN_kTfaSwaWJLDrDFhI5dJJfhl3J9dcAWnmpMN6U2TyQfhveKjcduy91h4f9MJoi87MIrHQg6SWWXqLK2cu_xZwPw-0YrMBXsA7O6Hw3VY2pSUrzU5daPHUM5I77aMQZIdY",
              }}
              style={styles.qrCode}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.qrDescription}>
            Présentez ce code à la machine pour démarrer le lavage.
          </Text>
        </View>

        {/* Reservation Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Votre réservation</Text>

          <View style={styles.detailsList}>
            <DetailRow
              icon="water-outline"
              label="Machine"
              value="Machine #5"
            />
            <DetailRow
              icon="calendar-outline"
              label="Date et heure"
              value="Dimanche 26 Mai, 10:30"
            />
            <DetailRow
              icon="options-outline"
              label="Programme"
              value="Coton 40°C"
            />
            <DetailRow icon="time-outline" label="Durée" value="45 minutes" />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => {
              // Add to calendar logic
              console.log("Add to calendar");
            }}
          >
            <Ionicons name="calendar-outline" size={16} color="#fff" />
            <Text style={styles.secondaryButtonText}>
              Ajouter au calendrier
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => {
              // View receipt logic
              console.log("View receipt");
              router.push("/"); //TODO: Changer la destination receipt
            }}
          >
            <Ionicons name="receipt-outline" size={16} color="#fff" />
            <Text style={styles.secondaryButtonText}>Voir le reçu</Text>
          </TouchableOpacity>
        </View>

        {/* Notification Banner */}
        <View style={styles.notificationBanner}>
          <Ionicons name="notifications-outline" size={24} color="#2463eb" />
          <Text style={styles.notificationText}>
            Vous recevrez une notification 5 minutes avant le début du cycle.
          </Text>
        </View>

        {/* Bottom padding for fixed footer */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButtonOutline}
          onPress={() => router.push("/reservation")}
        >
          <Text style={styles.footerButtonOutlineText}>
            Voir mes réservations
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerButtonPrimary}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.footerButtonPrimaryText}>
            Retour à l&apos;accueil
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#111827",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 64,
      paddingHorizontal: 16,
      backgroundColor: "rgba(17, 24, 39, 0.8)",
    },
    closeButton: {
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: "#fff",
      flex: 1,
      textAlign: "center",
      paddingRight: 40,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 20,
    },
    successContainer: {
      marginBottom: 24,
    },
    successOuterCircle: {
      width: 112,
      height: 112,
      borderRadius: 56,
      backgroundColor: "rgba(40, 167, 69, 0.2)",
      justifyContent: "center",
      alignItems: "center",
    },
    successInnerCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: "#28A745",
      justifyContent: "center",
      alignItems: "center",
    },
    qrContainer: {
      width: "100%",
      maxWidth: 384,
      backgroundColor: "#1F2937",
      borderRadius: 24,
      padding: 24,
      marginBottom: 24,
      alignItems: "center",
    },
    qrCodeWrapper: {
      width: 200,
      maxWidth: 200,
      backgroundColor: "#fff",
      borderRadius: 16,
      padding: 8,
      marginBottom: 16,
    },
    qrCode: {
      width: "100%",
      height: 184,
    },
    qrDescription: {
      fontSize: 14,
      color: "#9CA3AF",
      textAlign: "center",
    },
    detailsCard: {
      width: "100%",
      maxWidth: 384,
      backgroundColor: "#1F2937",
      borderRadius: 24,
      padding: 20,
      marginBottom: 24,
    },
    detailsTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: "#fff",
      marginBottom: 16,
    },
    detailsList: {
      gap: 16,
    },
    detailRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    detailContent: {
      flex: 1,
    },
    detailLabel: {
      fontSize: 14,
      color: "#9CA3AF",
      marginBottom: 2,
    },
    detailValue: {
      fontSize: 16,
      fontWeight: "500",
      color: "#D1D5DB",
    },
    actionButtons: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 16,
      width: "100%",
      maxWidth: 384,
      paddingVertical: 8,
      marginBottom: 24,
    },
    secondaryButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: "#1F2937",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 9999,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    secondaryButtonText: {
      fontSize: 14,
      fontWeight: "500",
      color: "#fff",
    },
    notificationBanner: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      width: "100%",
      maxWidth: 384,
      backgroundColor: "rgba(36, 99, 235, 0.2)",
      borderRadius: 24,
      padding: 12,
    },
    notificationText: {
      flex: 1,
      fontSize: 14,
      color: "#D1D5DB",
    },
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      borderTopWidth: 1,
      borderTopColor: "#1F2937",
      backgroundColor: "rgba(17, 24, 39, 0.8)",
      padding: 16,
    },
    footerButtonOutline: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#9CA3AF",
      borderRadius: 9999,
      paddingVertical: 12,
      alignItems: "center",
    },
    footerButtonOutlineText: {
      fontSize: 14,
      fontWeight: "700",
      color: "#D1D5DB",
    },
    footerButtonPrimary: {
      flex: 1,
      backgroundColor: "#2463eb",
      borderRadius: 9999,
      paddingVertical: 12,
      alignItems: "center",
    },
    footerButtonPrimaryText: {
      fontSize: 14,
      fontWeight: "700",
      color: "#fff",
    },
  });
