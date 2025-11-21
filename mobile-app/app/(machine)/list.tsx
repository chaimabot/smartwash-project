import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type MachineStatus = "available" | "busy" | "out-of-service";
type MachineType = "washing" | "dryer";
type FilterType = "all" | "washing" | "dryer" | "large";

interface Machine {
  id: string;
  name: string;
  type: MachineType;
  status: MachineStatus;
  capacity: string;
  price: string;
  remainingTime?: string;
  isLarge?: boolean;
}

export default function MachinesListScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Données de démonstration
  const machines: Machine[] = [
    {
      id: "1",
      name: "Lave-linge #04",
      type: "washing",
      status: "available",
      capacity: "8kg",
      price: "3,50€",
    },
    {
      id: "2",
      name: "Sèche-linge #12",
      type: "dryer",
      status: "busy",
      capacity: "10kg",
      price: "4,50€",
      remainingTime: "15 min",
      isLarge: true,
    },
    {
      id: "3",
      name: "Lave-linge #07",
      type: "washing",
      status: "out-of-service",
      capacity: "8kg",
      price: "3,50€",
    },
  ];

  // Statistiques
  const stats = {
    available: machines.filter((m) => m.status === "available").length,
    busy: machines.filter((m) => m.status === "busy").length,
    total: machines.length,
  };

  const handleProfile = () => {
    router.push("/(tabs)/profile");
  };

  const handleReserve = (machineId: string) => {
    router.push({
      pathname: "/reservation",
      params: { machineId },
    });
  };

  const handleNotify = (machineId: string) => {
    console.log("Notify for machine:", machineId);
    // TODO: Implémenter la logique de notification
    alert("Vous serez notifié quand la machine sera disponible");
  };

  const handleFilter = () => {
    setShowFilters(!showFilters);
  };

  const getStatusColor = (status: MachineStatus) => {
    switch (status) {
      case "available":
        return "#10B981";
      case "busy":
        return "#F59E0B";
      case "out-of-service":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const getStatusLabel = (machine: Machine) => {
    switch (machine.status) {
      case "available":
        return "Libre";
      case "busy":
        return `Fin dans ${machine.remainingTime}`;
      case "out-of-service":
        return "Hors service";
      default:
        return "";
    }
  };

  const getMachineIcon = (type: MachineType) => {
    return type === "washing" ? "washing-machine" : "tumble-dryer";
  };

  const filterMachines = () => {
    return machines.filter((machine) => {
      if (activeFilter === "all") return true;
      if (activeFilter === "washing") return machine.type === "washing";
      if (activeFilter === "dryer") return machine.type === "dryer";
      if (activeFilter === "large") return machine.isLarge;
      return true;
    });
  };

  const renderMachineCard = ({ item }: { item: Machine }) => {
    const statusColor = getStatusColor(item.status);
    const isDisabled = item.status === "out-of-service";

    return (
      <View style={[styles.card, isDisabled && styles.cardDisabled]}>
        {/* En-tête */}
        <View style={styles.cardHeader}>
          <Text style={styles.machineName}>{item.name}</Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: `${statusColor}20` },
            ]}
          >
            <Text style={[styles.statusText, { color: statusColor }]}>
              {getStatusLabel(item)}
            </Text>
          </View>
        </View>

        {/* Informations */}
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons
              name={getMachineIcon(item.type)}
              size={20}
              color="#6B7280"
            />
            <Text style={styles.infoText}>
              {item.type === "washing" ? "Lave-linge" : "Sèche-linge"}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="weight" size={20} color="#6B7280" />
            <Text style={styles.infoText}>{item.capacity}</Text>
          </View>

          <View style={styles.infoItem}>
            <MaterialCommunityIcons
              name="currency-eur"
              size={20}
              color="#6B7280"
            />
            <Text style={styles.infoText}>{item.price}</Text>
          </View>
        </View>

        {/* Bouton d'action */}
        {item.status === "available" && (
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={() => handleReserve(item.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.reserveButtonText}>Réserver</Text>
          </TouchableOpacity>
        )}

        {item.status === "busy" && (
          <TouchableOpacity
            style={styles.notifyButton}
            onPress={() => handleNotify(item.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.notifyButtonText}>Me Notifier</Text>
          </TouchableOpacity>
        )}

        {item.status === "out-of-service" && (
          <View style={styles.disabledButton}>
            <Text style={styles.disabledButtonText}>Indisponible</Text>
          </View>
        )}
      </View>
    );
  };

  const filteredMachines = filterMachines();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111621" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Machines Disponibles</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={handleProfile}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="account-circle"
            size={32}
            color="#ffffff"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Statistiques */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Libres</Text>
            <Text style={[styles.statValue, { color: "#10B981" }]}>
              {stats.available}
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Occupées</Text>
            <Text style={[styles.statValue, { color: "#F59E0B" }]}>
              {stats.busy}
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total</Text>
            <Text style={styles.statValue}>{stats.total}</Text>
          </View>
        </View>

        {/* Filtres rapides */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          <TouchableOpacity
            style={[
              styles.filterChip,
              activeFilter === "all" && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter("all")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterChipText,
                activeFilter === "all" && styles.filterChipTextActive,
              ]}
            >
              Toutes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip,
              activeFilter === "washing" && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter("washing")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterChipText,
                activeFilter === "washing" && styles.filterChipTextActive,
              ]}
            >
              Lave-linge
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip,
              activeFilter === "dryer" && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter("dryer")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterChipText,
                activeFilter === "dryer" && styles.filterChipTextActive,
              ]}
            >
              Sèche-linge
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterChip,
              activeFilter === "large" && styles.filterChipActive,
            ]}
            onPress={() => setActiveFilter("large")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterChipText,
                activeFilter === "large" && styles.filterChipTextActive,
              ]}
            >
              Grande Capacité
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Liste des machines */}
        <View style={styles.machinesList}>
          {filteredMachines.map((machine) => (
            <View key={machine.id}>{renderMachineCard({ item: machine })}</View>
          ))}
        </View>
      </ScrollView>

      {/* Bouton flottant de filtres avancés */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleFilter}
        activeOpacity={0.9}
      >
        <MaterialCommunityIcons
          name="filter-variant"
          size={28}
          color="#ffffff"
        />
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "rgba(17, 22, 33, 0.8)",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
  },
  profileButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    gap: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#9CA3AF",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
  },
  filtersScroll: {
    marginTop: 16,
  },
  filtersContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  filterChip: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 9999,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  filterChipActive: {
    backgroundColor: "#3B82F6",
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#D1D5DB",
  },
  filterChipTextActive: {
    color: "#ffffff",
  },
  machinesList: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    gap: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDisabled: {
    opacity: 0.6,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  machineName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  infoContainer: {
    flexDirection: "row",
    gap: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  reserveButton: {
    height: 44,
    backgroundColor: "#3B82F6",
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  reserveButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  notifyButton: {
    height: 44,
    backgroundColor: "#374151",
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  notifyButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
  disabledButton: {
    height: 44,
    backgroundColor: "#374151",
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6B7280",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
