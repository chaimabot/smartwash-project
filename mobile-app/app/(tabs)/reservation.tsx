import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type TabType = "ongoing" | "upcoming" | "completed";

interface OngoingReservation {
  id: string;
  machine: string;
  location: string;
  program: string;
  remainingTime: string;
  progress: number;
  image: string;
}

interface UpcomingReservation {
  id: string;
  title: string;
  dateTime: string;
  machineType: string;
  image: string;
}

interface CompletedReservation {
  id: string;
  title: string;
  completedAt: string;
  price: string;
}

export default function ReservationDetailsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("ongoing");

  // Données de démonstration
  const ongoingReservations: OngoingReservation[] = [
    {
      id: "1",
      machine: "Machine L-05",
      location: "Laverie St-Martin",
      program: "Coton 40°",
      remainingTime: "12 min",
      progress: 75,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDtBe0f_KSkVQAL6o636FkYlYf6UcwoJhv8E4KabiR-9goHYOovT7mfUpmSvVxdj8AXXtpqBjerLma2GPFin_cGIkaBezmzHecDzgvwMNUjDX3OjV9l_edvnGogoNdD4pyyiiz9jhWu9Syee3aR8KuARwPpWq9fwuAgcdAFc9oGnjJZ193Ia4ihNbE-sDpIjgJtJkgmcjlyuY2VvdgaMTrU3MBvJYM9lxhfkGIpzqsLo0h9iK-iyqOGUbiKiH7jtLHzEojq-VnBRYW_",
    },
  ];

  const upcomingReservations: UpcomingReservation[] = [
    {
      id: "1",
      title: "Réservation Laverie St-Martin",
      dateTime: "Aujourd'hui à 18:00",
      machineType: "Lave-linge 10kg",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAkwxDJhIQjIY5HcUIh4xBwijzALNp9PAqXzKVJ40RkhppP4-SukygiTsenXOW9L3gggxUHoL-l1SDeVbDEWMo4svhrV4e4f4lJM-X_bd1iNsOEN_to9c4hE2EOfM3XZMf4oRdCBNLx_2u6LNi4ucUQK4aHa3OPvxG_yhKFE8zm7IRnx4m_zC-a68Xs3ryWaOjwa5mOBffG8OZzdYi8UuqHzBbvK1BLaYR9PJRts8ncnIPNWUzkrgU1h-gXbqHpaM_ihzkjT0d5B0dU",
    },
  ];

  const completedReservations: CompletedReservation[] = [
    {
      id: "1",
      title: "Lavage du 24/07",
      completedAt: "Terminé à 15:45",
      price: "5.50€",
    },
  ];

  const handleMenu = () => {
    router.push("/(tabs)/profile");
  };

  const handleNotifications = () => {
    router.push("/(tabs)"); //TODO: Changer la destination notifications
  };

  const handleAddReservation = () => {
    router.push("/(tabs)"); //TODO: Changer la destination booking
  };

  const handleModifyReservation = (reservationId: string) => {
    router.push({
      pathname: "/(tabs)", //TODO: Changer la destination edit reservation
      params: { reservationId, mode: "edit" },
    });
  };

  const handleCancelReservation = (reservationId: string) => {
    // TODO: Implémenter la logique d'annulation
    alert("Voulez-vous vraiment annuler cette réservation ?");
  };

  const handleViewReceipt = (reservationId: string) => {
    router.push({
      pathname: "/(tabs)",//TODO: Changer la destination receipt
      params: { reservationId },
    });
  };

  const renderOngoingCard = (reservation: OngoingReservation) => (
    <View key={reservation.id} style={styles.ongoingCard}>
      <Image
        source={{ uri: reservation.image }}
        style={styles.ongoingImage}
        resizeMode="cover"
      />
      <View style={styles.ongoingContent}>
        <View style={styles.ongoingHeader}>
          <View style={styles.statusContainer}>
            <View style={styles.pulseOuter}>
              <Animated.View style={styles.pulseInner} />
            </View>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Lavage en cours</Text>
          </View>
          <Text style={styles.machineName}>{reservation.machine}</Text>
          <Text style={styles.locationText}>{reservation.location}</Text>
          <Text style={styles.programText}>
            Programme: {reservation.program}
          </Text>
        </View>

        <View style={styles.progressSection}>
          <Text style={styles.remainingTimeText}>
            Temps restant: {reservation.remainingTime}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${reservation.progress}%` },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );

  const renderUpcomingCard = (reservation: UpcomingReservation) => (
    <View key={reservation.id} style={styles.upcomingCard}>
      <View style={styles.upcomingContent}>
        <View style={styles.upcomingInfo}>
          <Text style={styles.confirmedText}>Confirmé</Text>
          <Text style={styles.upcomingTitle}>{reservation.title}</Text>
          <Text style={styles.upcomingDateTime}>
            {reservation.dateTime} - {reservation.machineType}
          </Text>
        </View>

        <View style={styles.upcomingActions}>
          <TouchableOpacity
            style={styles.modifyButton}
            onPress={() => handleModifyReservation(reservation.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.modifyButtonText}>Modifier</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancelReservation(reservation.id)}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="delete" size={18} color="#6B7280" />
            <Text style={styles.cancelButtonText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Image
        source={{ uri: reservation.image }}
        style={styles.upcomingImage}
        resizeMode="cover"
      />
    </View>
  );

  const renderCompletedCard = (reservation: CompletedReservation) => (
    <View key={reservation.id} style={styles.completedCard}>
      <View style={styles.completedLeft}>
        <View style={styles.completedIconContainer}>
          <MaterialCommunityIcons
            name="check-circle"
            size={28}
            color="#10B981"
          />
        </View>
        <View style={styles.completedInfo}>
          <Text style={styles.completedTitle}>{reservation.title}</Text>
          <Text style={styles.completedSubtitle}>
            {reservation.completedAt} - {reservation.price}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.receiptButton}
        onPress={() => handleViewReceipt(reservation.id)}
        activeOpacity={0.8}
      >
        <Text style={styles.receiptButtonText}>Reçu</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <MaterialCommunityIcons
          name="calendar-clock"
          size={40}
          color="#2463eb"
        />
      </View>
      <Text style={styles.emptyTitle}>
        {activeTab === "upcoming"
          ? "Aucune réservation à venir"
          : "Aucune réservation terminée"}
      </Text>
      <Text style={styles.emptySubtitle}>
        {activeTab === "upcoming"
          ? "Réservez une machine pour la voir apparaître ici."
          : "Vos réservations passées apparaîtront ici."}
      </Text>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "ongoing":
        return ongoingReservations.length > 0
          ? ongoingReservations.map(renderOngoingCard)
          : renderEmptyState();
      case "upcoming":
        return upcomingReservations.length > 0
          ? upcomingReservations.map(renderUpcomingCard)
          : renderEmptyState();
      case "completed":
        return completedReservations.length > 0
          ? completedReservations.map(renderCompletedCard)
          : renderEmptyState();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111621" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={handleMenu}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="menu" size={28} color="#ffffff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Mes Réservations</Text>

          <TouchableOpacity
            style={styles.notificationButton}
            onPress={handleNotifications}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="bell" size={28} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Onglets */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "ongoing" && styles.activeTab]}
            onPress={() => setActiveTab("ongoing")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "ongoing" && styles.activeTabText,
              ]}
            >
              En cours
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
            onPress={() => setActiveTab("upcoming")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "upcoming" && styles.activeTabText,
              ]}
            >
              À venir
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "completed" && styles.activeTab]}
            onPress={() => setActiveTab("completed")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "completed" && styles.activeTabText,
              ]}
            >
              Terminées
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contenu */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>

      {/* Bouton flottant (FAB) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddReservation}
        activeOpacity={0.9}
      >
        <MaterialCommunityIcons name="plus" size={32} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111621",
  },
  header: {
    backgroundColor: "rgba(17, 22, 33, 0.8)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  menuButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: -0.015,
  },
  notificationButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(107, 114, 128, 0.5)",
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    paddingBottom: 13,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
    alignItems: "center",
  },
  activeTab: {
    borderBottomColor: "#2463eb",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6B7280",
    letterSpacing: 0.015,
  },
  activeTabText: {
    color: "#ffffff",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
    gap: 16,
  },
  // Cartes en cours
  ongoingCard: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ongoingImage: {
    width: "100%",
    height: 200,
  },
  ongoingContent: {
    padding: 16,
    gap: 16,
  },
  ongoingHeader: {
    gap: 4,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  pulseOuter: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(249, 115, 22, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  pulseInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(249, 115, 22, 0.75)",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#f97316",
    position: "absolute",
    left: 0,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#f97316",
  },
  machineName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: -0.015,
  },
  locationText: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  programText: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  progressSection: {
    gap: 8,
  },
  remainingTimeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#E5E7EB",
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "#374151",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2463eb",
    borderRadius: 4,
  },
  // Cartes à venir
  upcomingCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  upcomingContent: {
    flex: 1,
    gap: 16,
  },
  upcomingInfo: {
    gap: 4,
  },
  confirmedText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2463eb",
  },
  upcomingTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  upcomingDateTime: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  upcomingActions: {
    flexDirection: "row",
    gap: 8,
  },
  modifyButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "rgba(107, 114, 128, 0.3)",
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  modifyButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#E5E7EB",
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingLeft: 8,
    paddingRight: 12,
    paddingVertical: 8,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  upcomingImage: {
    width: 96,
    height: 96,
    borderRadius: 12,
  },
  // Cartes terminées
  completedCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completedLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  completedIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  completedInfo: {
    flex: 1,
  },
  completedTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  completedSubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 2,
  },
  receiptButton: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    backgroundColor: "rgba(107, 114, 128, 0.3)",
    borderRadius: 9999,
  },
  receiptButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#E5E7EB",
  },
  // État vide
  emptyState: {
    alignItems: "center",
    paddingVertical: 64,
    paddingHorizontal: 16,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(36, 99, 235, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
  },
  // FAB
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2463eb",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2463eb",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
