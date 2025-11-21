import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

type StepStatus = "completed" | "current" | "upcoming";

interface TimelineStep {
  name: string;
  status: StepStatus;
  statusText: string;
}

export default function TrackingScreen() {
  // const { id } = useLocalSearchParams();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const styles = createStyles();

  // Données du cycle en cours
  const cycleData = {
    machineId: "A07",
    timeRemaining: "15:32",
    currentPhase: "Essorage",
    temperature: "40°C",
    spinSpeed: "1200 tr/min",
    progress: 75, // Pourcentage de progression (0-100)
  };

  const timelineSteps: TimelineStep[] = [
    { name: "Démarrage", status: "completed", statusText: "Terminé" },
    { name: "Prélavage", status: "completed", statusText: "Terminé" },
    { name: "Lavage", status: "completed", statusText: "Terminé" },
    { name: "Rinçage", status: "completed", statusText: "Terminé" },
    { name: "Essorage", status: "current", statusText: "En cours" },
    { name: "Terminé", status: "upcoming", statusText: "À venir" },
  ];

  const StepIcon = ({ status }: { status: StepStatus }) => {
    if (status === "completed") {
      return (
        <View style={styles.stepIconCompleted}>
          <Ionicons name="checkmark" size={18} color="#22c55e" />
        </View>
      );
    } else if (status === "current") {
      return (
        <View style={styles.stepIconCurrent}>
          <Ionicons name="sync" size={18} color="#fff" />
        </View>
      );
    } else {
      return (
        <View style={styles.stepIconUpcoming}>
          <Ionicons name="hourglass-outline" size={18} color="#64748b" />
        </View>
      );
    }
  };

  const CircularProgress = () => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const progress = cycleData.progress;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <View style={styles.progressContainer}>
        <Svg width="100%" height="100%" viewBox="0 0 100 100">
          {/* Background circle */}
          <Circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#1e293b"
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
          />
          {/* Progress circle */}
          <Circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#2463eb"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin="50, 50"
          />
        </Svg>
        <View style={styles.progressContent}>
          <Text style={styles.timeRemaining}>{cycleData.timeRemaining}</Text>
          <Text style={styles.currentPhase}>{cycleData.currentPhase}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mon Cycle en Cours</Text>
        <View style={styles.backButton} />
      </View>

      <Text style={styles.machineId}>Machine {cycleData.machineId}</Text>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Circular Progress */}
        <CircularProgress />

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Température</Text>
            <Text style={styles.statValue}>{cycleData.temperature}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Vitesse d&apos;Essorage</Text>
            <Text style={styles.statValue}>{cycleData.spinSpeed}</Text>
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timeline}>
          {timelineSteps.map((step, index) => (
            <View key={index} style={styles.timelineRow}>
              <View style={styles.timelineIconColumn}>
                <StepIcon status={step.status} />
                {index < timelineSteps.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>
              <View style={styles.timelineContent}>
                <Text
                  style={[
                    styles.stepName,
                    step.status === "current" && styles.stepNameCurrent,
                  ]}
                >
                  {step.name}
                </Text>
                <Text
                  style={[
                    styles.stepStatus,
                    step.status === "current" && styles.stepStatusCurrent,
                  ]}
                >
                  {step.statusText}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Bottom padding for controls */}
        <View style={{ height: 180 }} />
      </ScrollView>

      {/* Fixed Controls */}
      <View style={styles.controls}>
        <View style={styles.notificationToggle}>
          <Text style={styles.notificationLabel}>
            Me notifier à la fin du cycle
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: "#374151", true: "#2463eb" }}
            thumbColor="#fff"
            ios_backgroundColor="#374151"
          />
        </View>

        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => {
            console.log("Report problem");
            // router.push('/support');
          }}
        >
          <Ionicons name="help-circle-outline" size={20} color="#cbd5e1" />
          <Text style={styles.reportButtonText}>Signaler un problème</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = () =>
  StyleSheet.create({
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
      paddingBottom: 0,
    },
    backButton: {
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: "#fff",
      flex: 1,
      textAlign: "center",
    },
    machineId: {
      fontSize: 14,
      color: "#94a3b8",
      textAlign: "center",
      paddingTop: 4,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 20,
    },
    progressContainer: {
      aspectRatio: 1,
      width: "100%",
      padding: 32,
      position: "relative",
    },
    progressContent: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    timeRemaining: {
      fontSize: 48,
      fontWeight: "700",
      color: "#fff",
      letterSpacing: -2,
    },
    currentPhase: {
      fontSize: 16,
      fontWeight: "500",
      color: "#94a3b8",
      marginTop: 4,
    },
    statsContainer: {
      flexDirection: "row",
      gap: 16,
      paddingHorizontal: 16,
      marginBottom: 32,
    },
    statCard: {
      flex: 1,
      backgroundColor: "#0f172a",
      borderWidth: 1,
      borderColor: "#1e293b",
      borderRadius: 16,
      padding: 16,
      gap: 8,
    },
    statLabel: {
      fontSize: 14,
      fontWeight: "500",
      color: "#94a3b8",
    },
    statValue: {
      fontSize: 24,
      fontWeight: "700",
      color: "#fff",
      letterSpacing: -0.5,
    },
    timeline: {
      paddingHorizontal: 24,
      paddingTop: 32,
    },
    timelineRow: {
      flexDirection: "row",
      gap: 16,
    },
    timelineIconColumn: {
      alignItems: "center",
      gap: 4,
    },
    stepIconCompleted: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: "rgba(34, 197, 94, 0.2)",
      justifyContent: "center",
      alignItems: "center",
    },
    stepIconCurrent: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: "#2463eb",
      justifyContent: "center",
      alignItems: "center",
    },
    stepIconUpcoming: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: "#1e293b",
      justifyContent: "center",
      alignItems: "center",
    },
    timelineLine: {
      width: 1,
      flex: 1,
      backgroundColor: "#1e293b",
      minHeight: 24,
    },
    timelineContent: {
      flex: 1,
      paddingBottom: 24,
      paddingTop: 4,
    },
    stepName: {
      fontSize: 16,
      fontWeight: "500",
      color: "#94a3b8",
      marginBottom: 2,
    },
    stepNameCurrent: {
      fontWeight: "700",
      color: "#fff",
    },
    stepStatus: {
      fontSize: 14,
      color: "#94a3b8",
    },
    stepStatusCurrent: {
      color: "#2463eb",
    },
    controls: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      gap: 16,
      padding: 16,
      paddingBottom: 32,
      backgroundColor: "#111621",
    },
    notificationToggle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#0f172a",
      borderWidth: 1,
      borderColor: "#1e293b",
      borderRadius: 16,
      padding: 16,
    },
    notificationLabel: {
      fontSize: 16,
      fontWeight: "500",
      color: "#fff",
      flex: 1,
      marginRight: 16,
    },
    reportButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: "#1e293b",
      borderRadius: 16,
      paddingVertical: 12,
    },
    reportButtonText: {
      fontSize: 16,
      fontWeight: "500",
      color: "#cbd5e1",
    },
  });
