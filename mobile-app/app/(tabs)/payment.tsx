import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";

/**
 * 💳 Page Paiement - Laverie Intelligente
 * Carte de paiement avec montant, statut, date
 * Historique des paiements
 * Design en glassmorphism
 */
const PaymentScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const currentPayment = {
    description: "Réservation Machine A",
    amount: 5.00,
    duration: "1 heure",
    date: "Aujourd'hui",
  };

  const payments = [
    {
      id: 1,
      description: "Lavage Machine A",
      amount: "5.00€",
      status: "Payé",
      date: "15/11/2025",
      icon: "check-circle",
    },
    {
      id: 2,
      description: "Lavage Machine C",
      amount: "5.00€",
      status: "Payé",
      date: "12/11/2025",
      icon: "check-circle",
    },
    {
      id: 3,
      description: "Lavage Machine B",
      amount: "7.50€",
      status: "Payé",
      date: "10/11/2025",
      icon: "check-circle",
    },
    {
      id: 4,
      description: "Lavage Machine D",
      amount: "7.50€",
      status: "Remboursé",
      date: "08/11/2025",
      icon: "replay",
    },
  ];

  const handlePayment = () => {
    Alert.alert(
      "Paiement",
      "Paiement effectué avec succès!",
      [{ text: "OK" }]
    );
  };

  return (
    <View className={`flex-1 ${isDark ? "bg-background-dark" : "bg-background-light"}`}>
      {/* En-tête */}
      <View className="pt-12 pb-6 px-6" style={{ backgroundColor: isDark ? "#1f2937" : "#ffffff" }}>
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Paiements
        </Text>
        <Text className="text-base text-gray-600 dark:text-gray-400">
          Gérez vos paiements et consultez l'historique
        </Text>
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Carte de paiement en cours - Glassmorphism */}
        <View className="mb-6 mt-4">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Paiement en cours
          </Text>
          <View
            className={`p-6 rounded-2xl ${isDark ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-xl shadow-2xl border ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <View className="flex-row items-start justify-between mb-4">
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {currentPayment.description}
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  {currentPayment.date} • {currentPayment.duration}
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-2xl font-bold text-primary">
                  {currentPayment.amount.toFixed(2)}€
                </Text>
              </View>
            </View>
            
            <TouchableOpacity
              onPress={handlePayment}
              className="h-14 rounded-xl items-center justify-center flex-row"
              style={{ backgroundColor: "#3c3cf6" }}
            >
              <MaterialIcons name="payment" size={22} color="#ffffff" />
              <Text className="text-white text-base font-bold ml-2">
                Effectuer le paiement
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Historique des paiements */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Historique des paiements
          </Text>
          <View className="space-y-3">
            {payments.map((payment) => (
              <View
                key={payment.id}
                className={`p-5 rounded-2xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-lg`}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View
                      className={`w-12 h-12 rounded-full items-center justify-center ${
                        payment.status === "Payé"
                          ? "bg-green-100 dark:bg-green-900/30"
                          : "bg-blue-100 dark:bg-blue-900/30"
                      }`}
                    >
                      <MaterialIcons
                        name={payment.icon as any}
                        size={24}
                        color={payment.status === "Payé" ? "#10b981" : "#3b82f6"}
                      />
                    </View>
                    <View className="ml-4 flex-1">
                      <Text className="text-base font-semibold text-gray-900 dark:text-white">
                        {payment.description}
                      </Text>
                      <Text className="text-sm text-gray-600 dark:text-gray-400">
                        {payment.date}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-lg font-bold text-gray-900 dark:text-white">
                      {payment.amount}
                    </Text>
                    <View
                      className={`px-3 py-1 rounded-full mt-1 ${
                        payment.status === "Payé"
                          ? "bg-green-100 dark:bg-green-900/30"
                          : "bg-blue-100 dark:bg-blue-900/30"
                      }`}
                    >
                      <Text
                        className={`text-xs font-semibold ${
                          payment.status === "Payé" ? "text-green-700 dark:text-green-400" : "text-blue-700 dark:text-blue-400"
                        }`}
                      >
                        {payment.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Section QR Code - Paiement rapide */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Paiement rapide
          </Text>
          <View
            className={`p-8 rounded-2xl ${isDark ? "bg-gray-800" : "bg-gradient-to-br from-blue-50 to-purple-50"} items-center shadow-lg`}
          >
            <View className="w-40 h-40 bg-white rounded-2xl items-center justify-center shadow-md mb-4">
              <MaterialIcons name="qr-code-2" size={120} color="#3c3cf6" />
            </View>
            <Text className="text-base font-semibold text-gray-900 dark:text-white text-center mb-2">
              Scannez pour payer
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Utilisez votre application de paiement mobile
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentScreen;
