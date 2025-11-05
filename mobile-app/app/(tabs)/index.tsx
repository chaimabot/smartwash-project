import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";

/**
 * 🏠 Page Home - Laverie Intelligente
 * En-tête avec salutation et avatar
 * Cartes machines avec état et barre de progression
 * Bouton flottant pour réserver
 * Historique récent des lavages
 */
const HomeScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const machines = [
    { id: 1, name: "Machine A", status: "Disponible", progress: 0, color: "#50E3C2", icon: "check-circle" },
    { id: 2, name: "Machine B", status: "En cours", progress: 65, color: "#3c3cf6", icon: "autorenew" },
    { id: 3, name: "Machine C", status: "Terminé", progress: 100, color: "#50E3C2", icon: "done" },
    { id: 4, name: "Machine D", status: "Occupée", progress: 30, color: "#F5A623", icon: "schedule" },
  ];

  const history = [
    { id: 1, title: "Lavage terminé - Machine A", time: "Il y a 2 heures", icon: "check-circle" },
    { id: 2, title: "Paiement effectué", time: "Il y a 5 heures", icon: "payment" },
    { id: 3, title: "Réservation confirmée", time: "Hier à 14:30", icon: "event-available" },
  ];

  const handleReserve = () => {
    router.push("/(tabs)/reservation");
  };

  return (
    <View className={`flex-1 ${isDark ? "bg-background-dark" : "bg-background-light"}`}>
      {/* En-tête avec dégradé */}
      <View className="pt-12 pb-6 px-6" style={{ backgroundColor: isDark ? "#1f2937" : "#ffffff" }}>
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              Bonjour, Chaima 👋
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400">
              Gérez vos lavages intelligents
            </Text>
          </View>
          <View className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent items-center justify-center">
            <MaterialIcons name="person" size={28} color="#ffffff" />
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Section Machines */}
        <View className="mb-6 mt-4">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Machines disponibles
          </Text>
          <View className="space-y-3">
            {machines.map((machine) => (
              <View
                key={machine.id}
                className={`p-5 rounded-2xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}
              >
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center">
                    <View
                      className="w-12 h-12 rounded-full items-center justify-center"
                      style={{ backgroundColor: `${machine.color}20` }}
                    >
                      <MaterialIcons name="local-laundry-service" size={24} color={machine.color} />
                    </View>
                    <View className="ml-3">
                      <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                        {machine.name}
                      </Text>
                      <Text className="text-sm text-gray-600 dark:text-gray-400">
                        {machine.status}
                      </Text>
                    </View>
                  </View>
                  <MaterialIcons name={machine.icon as any} size={24} color={machine.color} />
                </View>

                {/* Barre de progression */}
                {machine.progress > 0 && (
                  <View>
                    <View className={`h-2 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-200"} overflow-hidden`}>
                      <View
                        className="h-full rounded-full"
                        style={{ width: `${machine.progress}%`, backgroundColor: machine.color }}
                      />
                    </View>
                    <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {machine.progress}% complété
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Bouton Réserver */}
        <TouchableOpacity
          onPress={handleReserve}
          className="mb-6 h-16 rounded-2xl items-center justify-center flex-row shadow-lg"
          style={{ backgroundColor: "#3c3cf6" }}
        >
          <MaterialIcons name="add-circle" size={24} color="#ffffff" />
          <Text className="text-white text-lg font-bold ml-2">
            Réserver une machine
          </Text>
        </TouchableOpacity>

        {/* Historique récent */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Historique récent
          </Text>
          <View className="space-y-3">
            {history.map((item) => (
              <View
                key={item.id}
                className={`p-4 rounded-xl ${isDark ? "bg-gray-800" : "bg-white"} flex-row items-center`}
              >
                <View className={`w-10 h-10 rounded-full items-center justify-center ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                  <MaterialIcons name={item.icon as any} size={20} color="#3c3cf6" />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-base font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    {item.time}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
