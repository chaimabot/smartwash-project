import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

/**
 * 🧾 Page Register - Laverie Intelligente
 * Formulaire d'inscription avec design moderne
 * Champs: Nom, Email, Mot de passe, Confirmation
 */
const RegisterScreen: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegister = () => {
    console.log("Register attempt:", {
      fullName,
      email,
      password,
      confirmPassword,
    });
    router.replace("/(tabs)");
  };

  const handleLogin = () => {
    router.back();
  };

  return (
    <ScrollView className={`flex-1 ${isDark ? "bg-background-dark" : "bg-background-light"}`}>
      <View className="relative min-h-screen w-full items-center justify-center px-6 py-12">
        {/* Bulles décoratives */}
        <View className="absolute top-[-5%] right-[-10%] w-64 h-64 rounded-full bg-accent/20 blur-3xl" />
        <View className="absolute bottom-[10%] left-[-15%] w-72 h-72 rounded-full bg-primary/15 blur-3xl" />

        <View className="relative z-10 w-full max-w-md">
          {/* Icône utilisateur */}
          <View className="mb-8 items-center">
            <View className="mb-6 w-24 h-24 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg">
              <MaterialIcons name="person-add" size={56} color="#3c3cf6" />
            </View>

            {/* Titre */}
            <Text className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
              Créer un compte
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400 text-center">
              Rejoignez la laverie intelligente
            </Text>
          </View>

          {/* Formulaire */}
          <View className="space-y-4">
            {/* Champ Nom */}
            <View>
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom complet
              </Text>
              <View className={`flex-row items-center rounded-xl ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border px-4 h-14`}>
                <MaterialIcons name="person" size={22} color={isDark ? "#9ca3af" : "#6b7280"} />
                <TextInput
                  className={`flex-1 ml-3 text-base ${isDark ? "text-white" : "text-gray-900"}`}
                  placeholder="Votre nom complet"
                  placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>
            </View>

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

            {/* Champ Confirmer mot de passe */}
            <View>
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirmer le mot de passe
              </Text>
              <View className={`flex-row items-center rounded-xl ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border px-4 h-14`}>
                <MaterialIcons name="lock" size={22} color={isDark ? "#9ca3af" : "#6b7280"} />
                <TextInput
                  className={`flex-1 ml-3 text-base ${isDark ? "text-white" : "text-gray-900"}`}
                  placeholder="••••••••"
                  placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                  <MaterialIcons
                    name={showConfirmPassword ? "visibility-off" : "visibility"}
                    size={22}
                    color={isDark ? "#9ca3af" : "#6b7280"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Boutons d'action */}
          <View className="mt-8 space-y-3">
            {/* Bouton Créer un compte */}
            <TouchableOpacity
              onPress={handleRegister}
              className="h-14 rounded-xl items-center justify-center"
              style={{ backgroundColor: "#3c3cf6" }}
            >
              <Text className="text-white text-base font-semibold">
                Créer un compte
              </Text>
            </TouchableOpacity>

            {/* Lien Se connecter */}
            <TouchableOpacity onPress={handleLogin} className="py-3">
              <Text className="text-center text-base text-gray-600 dark:text-gray-400">
                Déjà un compte ?{" "}
                <Text className="text-primary font-semibold">Se connecter</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
