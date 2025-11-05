import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

/**
 * 🔐 Page Login - Laverie Intelligente
 * Design moderne avec bulles floutées bleu/turquoise
 * Champs email et mot de passe avec icônes
 * Boutons Google et Apple
 */
const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    console.log("Login attempt:", { email, password });
    router.replace("/(tabs)");
  };

  const handleCreateAccount = () => {
    router.push("/(auth)/register");
  };

  const handleForgotPassword = () => {
    console.log("Navigate to forgot password");
  };

  const handleGoogleLogin = () => {
    console.log("Google login");
  };

  const handleAppleLogin = () => {
    console.log("Apple login");
  };

  return (
    <ScrollView className={`flex-1 ${isDark ? "bg-background-dark" : "bg-background-light"}`}>
      <View className="relative min-h-screen w-full items-center justify-center px-6 py-12">
        {/* Bulles décoratives floutées */}
        <View className="absolute top-[-10%] left-[-15%] w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
        <View className="absolute top-[20%] right-[-10%] w-64 h-64 rounded-full bg-accent/15 blur-3xl" />
        <View className="absolute bottom-[-5%] left-[10%] w-56 h-56 rounded-full bg-primary/10 blur-3xl" />

        <View className="relative z-10 w-full max-w-md">
          {/* Logo */}
          <View className="mb-8 items-center">
            <View className="mb-6 w-24 h-24 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg">
              <MaterialIcons name="local-laundry-service" size={56} color="#3c3cf6" />
            </View>

            {/* Titre */}
            <Text className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
              Bienvenue dans Laverie Intelligente
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400 text-center">
              Connectez-vous pour gérer vos lavages intelligents
            </Text>
          </View>

          {/* Formulaire */}
          <View className="space-y-5">
            {/* Champ Email */}
            <View>
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </Text>
              <View className={`flex-row items-center rounded-xl ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border px-4 h-14`}>
                <MaterialIcons name="mail" size={22} color={isDark ? "#9ca3af" : "#6b7280"} />
                <TextInput
                  className={`flex-1 ml-3 text-base ${isDark ? "text-white" : "text-gray-900"}`}
                  placeholder="votre@email.com"
                  placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Champ Mot de passe */}
            <View>
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mot de passe
              </Text>
              <View className={`flex-row items-center rounded-xl ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border px-4 h-14`}>
                <MaterialIcons name="lock" size={22} color={isDark ? "#9ca3af" : "#6b7280"} />
                <TextInput
                  className={`flex-1 ml-3 text-base ${isDark ? "text-white" : "text-gray-900"}`}
                  placeholder="••••••••"
                  placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <MaterialIcons
                    name={showPassword ? "visibility-off" : "visibility"}
                    size={22}
                    color={isDark ? "#9ca3af" : "#6b7280"}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Mot de passe oublié */}
            <TouchableOpacity onPress={handleForgotPassword} className="self-end">
              <Text className="text-sm font-medium text-primary">
                Mot de passe oublié ?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Boutons d'action */}
          <View className="mt-8 space-y-3">
            {/* Bouton Se connecter */}
            <TouchableOpacity
              onPress={handleLogin}
              className="h-14 bg-gradient-to-r from-primary to-primary-light rounded-xl items-center justify-center shadow-lg"
              style={{
                backgroundColor: "#3c3cf6",
              }}
            >
              <Text className="text-white text-base font-semibold">
                Se connecter
              </Text>
            </TouchableOpacity>

            {/* Bouton Créer un compte */}
            <TouchableOpacity
              onPress={handleCreateAccount}
              className={`h-14 rounded-xl items-center justify-center border-2 ${isDark ? "border-primary/70 bg-transparent" : "border-primary/50 bg-transparent"}`}
            >
              <Text className="text-primary text-base font-semibold">
                Créer un compte
              </Text>
            </TouchableOpacity>
          </View>

          {/* Séparateur */}
          <View className="flex-row items-center my-8">
            <View className={`flex-1 h-px ${isDark ? "bg-gray-700" : "bg-gray-300"}`} />
            <Text className={`mx-4 text-sm ${isDark ? "text-gray-500" : "text-gray-500"}`}>
              OU
            </Text>
            <View className={`flex-1 h-px ${isDark ? "bg-gray-700" : "bg-gray-300"}`} />
          </View>

          {/* Boutons sociaux */}
          <View className="space-y-3">
            {/* Google */}
            <TouchableOpacity
              onPress={handleGoogleLogin}
              className={`h-14 rounded-xl flex-row items-center justify-center border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
            >
              <View className="w-6 h-6 rounded-full bg-white items-center justify-center mr-3">
                <MaterialIcons name="g-translate" size={18} color="#4285F4" />
              </View>
              <Text className={`text-base font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                Continuer avec Google
              </Text>
            </TouchableOpacity>

            {/* Apple */}
            <TouchableOpacity
              onPress={handleAppleLogin}
              className={`h-14 rounded-xl flex-row items-center justify-center border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
            >
              <MaterialIcons name="apple" size={24} color={isDark ? "#ffffff" : "#000000"} className="mr-3" />
              <Text className={`text-base font-medium ml-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                Continuer avec Apple
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
