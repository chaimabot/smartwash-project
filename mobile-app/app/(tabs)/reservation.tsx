import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

/**
 * 📅 Page Réservation - Laverie Intelligente
 * Liste de machines avec icônes et états colorés
 * Sélecteur d'horaire / créneau
 * Bouton "Confirmer la réservation" en bas
 */
const ReservationScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();
  const [selectedMachine, setSelectedMachine] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  const machines = [
    { id: 1, name: "Machine A", available: true, type: "Standard", capacity: "7kg" },
    { id: 2, name: "Machine B", available: false, type: "Premium", capacity: "10kg" },
    { id: 3, name: "Machine C", available: true, type: "Standard", capacity: "7kg" },
    { id: 4, name: "Machine D", available: true, type: "Premium", capacity: "10kg" },
  ];

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00",
    "14:00", "15:00", "16:00", "17:00"
  ];

  const handleConfirm = () => {
    if (selectedMachine && selectedTime) {
      console.log("Reservation confirmed:", {
        machine: selectedMachine,
        time: selectedTime,
      });
      router.push("/(tabs)/payment");
    }
  };

  return (
    <View className={`flex-1 ${isDark ? "bg-background-dark" : "bg-background-light"}`}>
      {/* En-tête */}
      <View className="pt-12 pb-6 px-6" style={{ backgroundColor: isDark ? "#1f2937" : "#ffffff" }}>
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Réserver une machine
        </Text>
        <Text className="text-base text-gray-600 dark:text-gray-400">
          Choisissez une machine et un créneau horaire
        </Text>
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Machines disponibles */}
        <View className="mb-6 mt-4">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Machines disponibles
          </Text>
          <View className="space-y-3">
            {machines.map((machine) => (
              <TouchableOpacity
                key={machine.id}
                onPress={() => machine.available && setSelectedMachine(machine.id)}
                disabled={!machine.available}
                className={`p-5 rounded-2xl ${
                  selectedMachine === machine.id
                    ? "bg-primary/10 border-2 border-primary"
                    : isDark
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                } ${!machine.available ? "opacity-50" : ""}`}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View
                      className={`w-14 h-14 rounded-full items-center justify-center ${
                        machine.available
                          ? selectedMachine === machine.id
                            ? "bg-primary/20"
                            : "bg-accent/20"
                          : "bg-gray-300 dark:bg-gray-700"
                      }`}
                    >
                      <MaterialIcons
                        name="local-laundry-service"
                        size={28}
                        color={
                          machine.available
                            ? selectedMachine === machine.id
                              ? "#3c3cf6"
                              : "#50E3C2"
                            : "#9ca3af"
                        }
                      />
                    </View>
                    <View className="ml-4 flex-1">
                      <Text className={`text-lg font-bold ${machine.available ? "text-gray-900 dark:text-white" : "text-gray-400"}`}>
                        {machine.name}
                      </Text>
                      <Text className="text-sm text-gray-600 dark:text-gray-400">
                        {machine.type} • {machine.capacity}
                      </Text>
                      <View className="flex-row items-center mt-1">
                        <View className={`w-2 h-2 rounded-full mr-2 ${machine.available ? "bg-green-500" : "bg-red-500"}`} />
                        <Text className={`text-sm font-medium ${machine.available ? "text-green-600" : "text-red-600"}`}>
                          {machine.available ? "Disponible" : "Occupée"}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {selectedMachine === machine.id && (
                    <MaterialIcons name="check-circle" size={28} color="#3c3cf6" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sélecteur de créneau */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Choisir un créneau
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                onPress={() => setSelectedTime(time)}
                className={`px-6 py-3 rounded-xl ${
                  selectedTime === time
                    ? "bg-primary"
                    : isDark
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-300"
                }`}
              >
                <Text
                  className={`text-base font-semibold ${
                    selectedTime === time ? "text-white" : "text-gray-900 dark:text-white"
                  }`}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Récapitulatif */}
        {selectedMachine && selectedTime && (
          <View className={`mb-6 p-5 rounded-2xl ${isDark ? "bg-gray-800" : "bg-blue-50"}`}>
            <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
              Récapitulatif
            </Text>
            <View className="space-y-2">
              <View className="flex-row items-center">
                <MaterialIcons name="local-laundry-service" size={20} color="#3c3cf6" />
                <Text className="ml-2 text-base text-gray-700 dark:text-gray-300">
                  {machines.find((m) => m.id === selectedMachine)?.name}
                </Text>
              </View>
              <View className="flex-row items-center">
                <MaterialIcons name="schedule" size={20} color="#3c3cf6" />
                <Text className="ml-2 text-base text-gray-700 dark:text-gray-300">
                  {selectedTime}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Bouton Confirmer */}
        <TouchableOpacity
          onPress={handleConfirm}
          disabled={!selectedMachine || !selectedTime}
          className={`mb-8 h-16 rounded-2xl items-center justify-center ${
            selectedMachine && selectedTime ? "bg-primary" : "bg-gray-400"
          }`}
        >
          <Text className="text-white text-lg font-bold">
            Confirmer la réservation
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ReservationScreen;
