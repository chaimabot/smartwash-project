import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const styles = createStyles(isDark);

  const MenuItem = ({
    icon,
    label,
    onPress,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={24} color="#fff" />
        </View>
        <Text style={styles.menuItemText}>{label}</Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={24}
        color={isDark ? "#64748b" : "#94a3b8"}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={isDark ? "#fff" : "#1e293b"}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Profil</Text>
        </View>

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCYHHa2flskESZ941XBXKplsb_tsGXGQFTjoTVSNNYznGzrQiDxR3NKM6Ym44GgDaxLBvEbfTTlWKXB_-4lkxxnvXPQpbhxWO349tFBWYJ69ZKAJZQtahLe2OpYaF7XBYnWqk2u7oHBxIv-qgdUWbcOaaLwpBr7lHOZy0dtfIFknpQWR6atK0gTNzAQX_-9fYH6_c3jA-bURFAuNhsBNtqXDEEJZpLsWKcWWztRfjfM45SnYG7nd5I5Miv4PP7VaUBhaT2K0YZaqQb",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Jean Dupont</Text>
          <Text style={styles.profileEmail}>jean.dupont@email.com</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Lavages effectués</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>126,50€</Text>
            <Text style={styles.statLabel}>Dépenses totales</Text>
          </View>
        </View>

        {/* Menu Sections */}
        <View style={styles.content}>
          {/* Compte */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Compte</Text>
            <View style={styles.menuGroup}>
              <MenuItem
                icon="person-outline"
                label="Mes informations"
                onPress={() => router.push("/profile")} //TODO: Changer la destination user info
              />
              <MenuItem
                icon="card-outline"
                label="Moyens de paiement"
                onPress={() => router.push("/profile")} //TODO: Changer la destination payment methods
              />
              <MenuItem
                icon="star-outline"
                label="Abonnement / Crédits"
                onPress={() => router.push("/profile")} //TODO: Changer la destination subscription
              />
            </View>
          </View>

          {/* Activité */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Activité</Text>
            <View style={styles.menuGroup}>
              <MenuItem
                icon="time-outline"
                label="Historique des lavages"
                onPress={() => router.push("/profile")} //TODO: Changer la destination history
              />
              <MenuItem
                icon="notifications-outline"
                label="Notifications"
                onPress={() => router.push("/profile")} //TODO: Changer la destination notifications
              />
            </View>
          </View>

          {/* Support */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            <View style={styles.menuGroup}>
              <MenuItem
                icon="help-circle-outline"
                label="Aide & FAQ"
                onPress={() => router.push("/profile")} //TODO: Changer la destination help
              />
              <MenuItem
                icon="headset-outline"
                label="Contacter le support"
                onPress={() => router.push("/profile")} //TODO: Changer la destination support
              />
            </View>
          </View>

          {/* Paramètres */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Paramètres</Text>
            <View style={styles.menuGroup}>
              <MenuItem
                icon="language-outline"
                label="Langue"
                onPress={() => router.push("/profile")} //TODO: Changer la destination language
              />
              <MenuItem
                icon="moon-outline"
                label="Thème de l'application"
                onPress={() => router.push("/profile")} //TODO: Changer la destination theme
              />
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              // Handle logout
              console.log("Logout pressed");
            }}
          >
            <Ionicons
              name="log-out-outline"
              size={24}
              color={isDark ? "#f87171" : "#dc2626"}
            />
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#111621" : "#f6f6f8",
    },
    scrollView: {
      flex: 1,
    },
    header: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
      backgroundColor: isDark ? "#111621" : "#f6f6f8",
    },
    backButton: {
      width: 48,
      height: 48,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: isDark ? "#fff" : "#0f172a",
      letterSpacing: -0.5,
    },
    profileHeader: {
      alignItems: "center",
      paddingVertical: 24,
      paddingHorizontal: 16,
    },
    profileImage: {
      width: 128,
      height: 128,
      borderRadius: 64,
      marginBottom: 16,
    },
    profileName: {
      fontSize: 22,
      fontWeight: "700",
      color: isDark ? "#fff" : "#0f172a",
      marginBottom: 4,
    },
    profileEmail: {
      fontSize: 16,
      color: isDark ? "#94a3b8" : "#64748b",
    },
    statsContainer: {
      flexDirection: "row",
      gap: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    statCard: {
      flex: 1,
      backgroundColor: isDark ? "rgba(15, 23, 42, 0.5)" : "#fff",
      borderRadius: 16,
      borderWidth: 1,
      borderColor: isDark ? "#1e293b" : "#e2e8f0",
      padding: 16,
      alignItems: "center",
    },
    statValue: {
      fontSize: 24,
      fontWeight: "700",
      color: isDark ? "#fff" : "#0f172a",
      marginBottom: 8,
    },
    statLabel: {
      fontSize: 14,
      color: isDark ? "#94a3b8" : "#64748b",
      textAlign: "center",
    },
    content: {
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    section: {
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: isDark ? "#fff" : "#0f172a",
      marginBottom: 8,
      marginTop: 16,
    },
    menuGroup: {
      gap: 8,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: isDark ? "rgba(15, 23, 42, 0.5)" : "#fff",
      borderRadius: 16,
      padding: 12,
      minHeight: 56,
    },
    menuItemLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      flex: 1,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 16,
      backgroundColor: "#2463eb",
      justifyContent: "center",
      alignItems: "center",
    },
    menuItemText: {
      fontSize: 16,
      color: isDark ? "#fff" : "#1e293b",
      flex: 1,
    },
    logoutContainer: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      paddingBottom: 32,
    },
    logoutButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: isDark ? "rgba(220, 38, 38, 0.3)" : "#fee2e2",
      borderRadius: 16,
      padding: 16,
    },
    logoutText: {
      fontSize: 16,
      fontWeight: "700",
      color: isDark ? "#f87171" : "#dc2626",
    },
  });
