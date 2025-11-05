import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";

/**
 * 👤 Page Profil - Laverie Intelligente
 * Avatar utilisateur + nom
 * Boutons: Modifier le profil, Paramètres, Se déconnecter
 * Design clair et doux
 */
const ProfileScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const handleEditProfile = () => {
    console.log("Edit profile");
  };

  const handleSettings = () => {
    console.log("Open settings");
  };

  const handleNotifications = () => {
    console.log("Notifications");
  };

  const handleHelp = () => {
    console.log("Help");
  };

  const handleLogout = () => {
    Alert.alert(
      "Déconnexion",
      "Êtes-vous sûr de vouloir vous déconnecter ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Se déconnecter",
          style: "destructive",
          onPress: () => router.replace("/(auth)/login"),
        },
      ]
    );
  };

  return (
    <View className={`flex-1 ${isDark ? "bg-background-dark" : "bg-background-light"}`}>
      {/* En-tête avec dégradé */}
      <View className="pt-12 pb-8 px-6 items-center" style={{ backgroundColor: isDark ? "#1f2937" : "#ffffff" }}>
        <View className="w-28 h-28 rounded-full items-center justify-center mb-4" style={{ backgroundColor: "#3c3cf6" }}>
          <MaterialIcons name="person" size={56} color="#ffffff" />
        </View>
        <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Chaima
        </Text>
        <Text className="text-base text-gray-600 dark:text-gray-400">
          chaima@example.com
        </Text>
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Statistiques */}
        <View className="mb-6 mt-4">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Statistiques
          </Text>
          <View className="flex-row gap-3">
            <View className={`flex-1 p-5 rounded-2xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg items-center`}>
              <View className="w-12 h-12 rounded-full bg-primary/20 items-center justify-center mb-2">
                <MaterialIcons name="local-laundry-service" size={24} color="#3c3cf6" />
              </View>
              <Text className="text-3xl font-bold text-primary mb-1">12</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Lavages
              </Text>
            </View>
            <View className={`flex-1 p-5 rounded-2xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg items-center`}>
              <View className="w-12 h-12 rounded-full bg-accent/20 items-center justify-center mb-2">
                <MaterialIcons name="euro" size={24} color="#50E3C2" />
              </View>
              <Text className="text-3xl font-bold text-accent mb-1">60€</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Dépensé
              </Text>
            </View>
          </View>
        </View>

        {/* Options du profil */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Paramètres du compte
          </Text>
          <View className="space-y-3">
            <TouchableOpacity
              onPress={handleEditProfile}
              className={`p-4 rounded-2xl ${isDark ? "bg-gray-800" : "bg-white"} flex-row items-center shadow-lg`}
            >
              <View className="w-12 h-12 rounded-full bg-primary/10 items-center justify-center">
                <MaterialIcons name="edit" size={24} color="#3c3cf6" />
              </View>
              <Text className="flex-1 ml-4 text-base font-semibold text-gray-900 dark:text-white">
                Modifier le profil
              </Text>
              <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSettings}
              className={`p-4 rounded-2xl ${isDark ? "bg-gray-800" : "bg-white"} flex-row items-center shadow-lg`}
            >
              <View className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 items-center justify-center">
                <MaterialIcons name="settings" size={24} color="#6b7280" />
              </View>
              <Text className="flex-1 ml-4 text-base font-semibold text-gray-900 dark:text-white">
                Paramètres
              </Text>
              <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNotifications}
              className={`p-4 rounded-2xl ${isDark ? "bg-gray-800" : "bg-white"} flex-row items-center shadow-lg`}
            >
              <View className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 items-center justify-center">
                <MaterialIcons name="notifications" size={24} color="#f59e0b" />
              </View>
              <Text className="flex-1 ml-4 text-base font-semibold text-gray-900 dark:text-white">
                Notifications
              </Text>
              <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleHelp}
              className={`p-4 rounded-2xl ${isDark ? "bg-gray-800" : "bg-white"} flex-row items-center shadow-lg`}
            >
              <View className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 items-center justify-center">
                <MaterialIcons name="help" size={24} color="#3b82f6" />
              </View>
              <Text className="flex-1 ml-4 text-base font-semibold text-gray-900 dark:text-white">
                Aide & Support
              </Text>
              <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bouton Déconnexion */}
        <TouchableOpacity
          onPress={handleLogout}
          className="mb-8 h-16 rounded-2xl items-center justify-center flex-row bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800"
        >
          <MaterialIcons name="logout" size={24} color="#ef4444" />
          <Text className="text-red-600 dark:text-red-400 text-base font-bold ml-2">
            Se déconnecter
          </Text>
        </TouchableOpacity>

        {/* Version */}
        <View className="mb-8 items-center">
          <Text className="text-sm text-gray-500 dark:text-gray-500">
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
