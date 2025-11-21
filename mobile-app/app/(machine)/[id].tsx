import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Placez ce fichier dans: app/(machine)/[id].tsx

type Programme = "coton" | "synthetique" | "rapide";

interface TimeSlot {
  time: string;
  available: boolean;
  selected: boolean;
}

export default function MachineDetailScreen() {
  const { id } = useLocalSearchParams();
  const isDark = true; // Force dark mode

  const [selectedProgramme, setSelectedProgramme] =
    useState<Programme>("coton");
  const [selectedTime, setSelectedTime] = useState("14:30");
  const [options, setOptions] = useState({
    assouplissant: false,
    prelavage: false,
  });

  const styles = createStyles(isDark);

  const programmes = [
    {
      id: "coton" as Programme,
      name: "Coton",
      description: "Pour les textiles résistants",
      price: 4.5,
    },
    {
      id: "synthetique" as Programme,
      name: "Synthétique",
      description: "Cycle doux pour les tissus mélangés",
      price: 4.0,
    },
    {
      id: "rapide" as Programme,
      name: "Rapide",
      description: "Lavage express en 30 minutes",
      price: 3.5,
    },
  ];

  const timeSlots: TimeSlot[] = [
    { time: "14:00", available: false, selected: false },
    { time: "14:30", available: true, selected: true },
    { time: "15:00", available: true, selected: false },
    { time: "15:30", available: true, selected: false },
    { time: "16:00", available: true, selected: false },
    { time: "16:30", available: false, selected: false },
    { time: "17:00", available: true, selected: false },
    { time: "17:30", available: true, selected: false },
  ];

  const calculateTotal = () => {
    const selectedProg = programmes.find((p) => p.id === selectedProgramme);
    let total = selectedProg?.price || 0;
    if (options.assouplissant) total += 0.5;
    if (options.prelavage) total += 0.75;
    return total.toFixed(2);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lave-linge #{id}</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="heart-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Machine Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuACPKVt9gbddtT8ZXdHnyOF8zJ85hBz2e5HYQre-K-Bh4c-BL2HaHCNJkrdbC8qjTWoaEHNAD3zzl4whwtiR57qqpwkAb8j4M-lFVbQ5RZEmmG89Sq-4NXPSc0VpDcMCsrehwmRywLJtdH5GvU4EjHjBnPkLKIIHRytfhFH6yAiZSMTJd-faFEw9LncQQQOmZmt13ZDJl_P1WHKUIJYehtGO8CsZ-b1USdyerhaas-2JaHUTjtlvgXftGeRJhG1TbNPhDK9OwFAWM",
            }}
            style={styles.machineImage}
          />
        </View>

        {/* Info Cards */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Ionicons name="scale-outline" size={24} color="#2463eb" />
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardTitle}>Capacité</Text>
              <Text style={styles.infoCardValue}>9 kg</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons
              name="checkmark-circle-outline"
              size={24}
              color="#2463eb"
            />
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardTitle}>Disponibilité</Text>
              <Text style={styles.infoCardValue}>Disponible</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="timer-outline" size={24} color="#2463eb" />
            <View style={styles.infoCardContent}>
              <Text style={styles.infoCardTitle}>Durée</Text>
              <Text style={styles.infoCardValue}>~45 min</Text>
            </View>
          </View>
        </View>

        {/* Programmes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sélectionner un programme</Text>

          {programmes.map((prog) => (
            <TouchableOpacity
              key={prog.id}
              style={[
                styles.radioOption,
                selectedProgramme === prog.id && styles.radioOptionSelected,
              ]}
              onPress={() => setSelectedProgramme(prog.id)}
            >
              <View style={styles.radioContent}>
                <Text style={styles.radioTitle}>{prog.name}</Text>
                <Text style={styles.radioDescription}>
                  {prog.description} - {prog.price.toFixed(2)}€
                </Text>
              </View>
              <View
                style={[
                  styles.radioButton,
                  selectedProgramme === prog.id && styles.radioButtonSelected,
                ]}
              >
                {selectedProgramme === prog.id && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Time Slots Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choisir un créneau</Text>

          <View style={styles.timeSelector}>
            <View style={styles.datePicker}>
              <TouchableOpacity>
                <Ionicons name="chevron-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.dateText}>Aujourd&#39;hui, 15 Juillet</Text>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.timeGrid}>
              {timeSlots.map((slot) => (
                <TouchableOpacity
                  key={slot.time}
                  style={[
                    styles.timeSlot,
                    !slot.available && styles.timeSlotDisabled,
                    selectedTime === slot.time && styles.timeSlotSelected,
                  ]}
                  onPress={() => slot.available && setSelectedTime(slot.time)}
                  disabled={!slot.available}
                >
                  <Text
                    style={[
                      styles.timeSlotText,
                      !slot.available && styles.timeSlotTextDisabled,
                      selectedTime === slot.time && styles.timeSlotTextSelected,
                    ]}
                  >
                    {slot.time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Options Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ajouter des options</Text>

          <TouchableOpacity
            style={[
              styles.checkboxOption,
              options.assouplissant && styles.checkboxOptionSelected,
            ]}
            onPress={() =>
              setOptions((prev) => ({
                ...prev,
                assouplissant: !prev.assouplissant,
              }))
            }
          >
            <View
              style={[
                styles.checkbox,
                options.assouplissant && styles.checkboxChecked,
              ]}
            >
              {options.assouplissant && (
                <Ionicons name="checkmark" size={16} color="#fff" />
              )}
            </View>
            <View style={styles.checkboxContent}>
              <Text style={styles.checkboxTitle}>Assouplissant</Text>
              <Text style={styles.checkboxPrice}>+0,50€</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.checkboxOption,
              options.prelavage && styles.checkboxOptionSelected,
            ]}
            onPress={() =>
              setOptions((prev) => ({ ...prev, prelavage: !prev.prelavage }))
            }
          >
            <View
              style={[
                styles.checkbox,
                options.prelavage && styles.checkboxChecked,
              ]}
            >
              {options.prelavage && (
                <Ionicons name="checkmark" size={16} color="#fff" />
              )}
            </View>
            <View style={styles.checkboxContent}>
              <Text style={styles.checkboxTitle}>Prélavage</Text>
              <Text style={styles.checkboxPrice}>+0,75€</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom padding for fixed footer */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footer}>
        <View style={styles.footerTotal}>
          <Text style={styles.footerTotalLabel}>Total</Text>
          <Text style={styles.footerTotalAmount}>{calculateTotal()}€</Text>
        </View>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.push("/payment")}
        >
          <Text style={styles.continueButtonText}>Continuer au paiement</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = (isDark: boolean) =>
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
      paddingBottom: 16,
      backgroundColor: "rgba(17, 22, 33, 0.8)",
    },
    headerButton: {
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
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 20,
    },
    imageContainer: {
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    machineImage: {
      width: "100%",
      height: 240,
      borderRadius: 24,
    },
    infoGrid: {
      flexDirection: "row",
      gap: 12,
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    infoCard: {
      flex: 1,
      backgroundColor: "rgba(15, 23, 42, 0.5)",
      borderWidth: 1,
      borderColor: "#1e293b",
      borderRadius: 16,
      padding: 16,
      gap: 12,
    },
    infoCardContent: {
      gap: 4,
    },
    infoCardTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: "#fff",
    },
    infoCardValue: {
      fontSize: 14,
      color: "#94a3b8",
    },
    section: {
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: "#fff",
      marginBottom: 8,
      marginTop: 16,
    },
    radioOption: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      backgroundColor: "rgba(15, 23, 42, 0.5)",
      borderWidth: 1,
      borderColor: "#1e293b",
      borderRadius: 16,
      padding: 15,
      marginBottom: 12,
    },
    radioOptionSelected: {
      borderWidth: 2,
      borderColor: "#2463eb",
      backgroundColor: "rgba(36, 99, 235, 0.2)",
    },
    radioContent: {
      flex: 1,
    },
    radioTitle: {
      fontSize: 14,
      fontWeight: "500",
      color: "#fff",
      marginBottom: 2,
    },
    radioDescription: {
      fontSize: 14,
      color: "#94a3b8",
    },
    radioButton: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#52525b",
      justifyContent: "center",
      alignItems: "center",
    },
    radioButtonSelected: {
      borderColor: "#2463eb",
      backgroundColor: "#2463eb",
    },
    radioButtonInner: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: "#fff",
    },
    timeSelector: {
      backgroundColor: "rgba(15, 23, 42, 0.5)",
      borderWidth: 1,
      borderColor: "#1e293b",
      borderRadius: 16,
      padding: 16,
    },
    datePicker: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    dateText: {
      fontSize: 16,
      fontWeight: "700",
      color: "#fff",
    },
    timeGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    timeSlot: {
      width: "23%",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#1e293b",
      alignItems: "center",
    },
    timeSlotDisabled: {
      backgroundColor: "#18212f",
      borderColor: "#18212f",
    },
    timeSlotSelected: {
      borderWidth: 1,
      borderColor: "#2463eb",
      backgroundColor: "rgba(36, 99, 235, 0.2)",
    },
    timeSlotText: {
      fontSize: 14,
      color: "#cbd5e1",
    },
    timeSlotTextDisabled: {
      color: "#475569",
    },
    timeSlotTextSelected: {
      color: "#2463eb",
      fontWeight: "600",
    },
    checkboxOption: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      backgroundColor: "rgba(15, 23, 42, 0.5)",
      borderWidth: 1,
      borderColor: "#1e293b",
      borderRadius: 16,
      padding: 15,
      marginBottom: 12,
    },
    checkboxOptionSelected: {
      borderWidth: 2,
      borderColor: "#2463eb",
      backgroundColor: "rgba(36, 99, 235, 0.2)",
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: "#52525b",
      justifyContent: "center",
      alignItems: "center",
    },
    checkboxChecked: {
      borderColor: "#2463eb",
      backgroundColor: "#2463eb",
    },
    checkboxContent: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    checkboxTitle: {
      fontSize: 14,
      fontWeight: "500",
      color: "#fff",
    },
    checkboxPrice: {
      fontSize: 14,
      color: "#94a3b8",
    },
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      backgroundColor: "rgba(39, 39, 42, 0.8)",
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: "#1e293b",
    },
    footerTotal: {
      gap: 2,
    },
    footerTotalLabel: {
      fontSize: 14,
      color: "#94a3b8",
    },
    footerTotalAmount: {
      fontSize: 24,
      fontWeight: "700",
      color: "#fff",
    },
    continueButton: {
      flex: 1,
      backgroundColor: "#2463eb",
      borderRadius: 9999,
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: "center",
      shadowColor: "#2463eb",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    continueButtonText: {
      fontSize: 16,
      fontWeight: "700",
      color: "#fff",
    },
  });
