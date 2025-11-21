import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Checkbox = ({
  value,
  onValueChange,
  color,
  style,
}: {
  value: boolean;
  onValueChange: (v: boolean) => void;
  color?: string;
  style?: any;
}) => {
  return (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      style={style}
      activeOpacity={0.8}
    >
      <MaterialCommunityIcons
        name={value ? "checkbox-marked" : "checkbox-blank-outline"}
        size={24}
        color={value ? color || "#2463eb" : "#64748b"}
      />
    </TouchableOpacity>
  );
};

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Calcul de la force du mot de passe
  const calculatePasswordStrength = () => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
    };

    if (checks.length) strength += 33;
    if (checks.uppercase) strength += 33;
    if (checks.number) strength += 34;

    return { strength, checks };
  };

  const { strength, checks } = calculatePasswordStrength();
  const strengthLabel =
    strength >= 67 ? "Fort" : strength >= 34 ? "Moyen" : "Faible";
  const strengthColor =
    strength >= 67 ? "#10b981" : strength >= 34 ? "#f59e0b" : "#ef4444";

  const handleBack = () => {
    router.back();
  };

  const handleNext = async () => {
    // Validation
    if (!firstName || !lastName || !email || !password) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Erreur", "Mot de passe trop court (minimum 6 caractères)");
      return;
    }
    if (!termsAccepted) {
      Alert.alert(
        "Erreur",
        "Veuillez accepter les conditions d&apos;utilisation"
      );
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:7017/api/Auth/register",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      const { token } = response.data;

      // Sauvegarde du token
      await AsyncStorage.setItem("userToken", token);

      Alert.alert(
        "Succès !",
        "Compte créé avec succès ! Bienvenue sur Laverie Futée",
        [{ text: "Continuer", onPress: () => router.replace("/(tabs)") }]
      );
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        "Erreur lors de l'inscription. Essayez un autre email.";
      Alert.alert("Inscription échouée", msg);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    router.push("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111621" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Créer un compte</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            {/* Prénom */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Prénom</Text>
              <TextInput
                style={styles.input}
                placeholder="Entrez votre prénom"
                placeholderTextColor="#64748b"
                value={firstName}
                onChangeText={setFirstName}
                editable={!loading}
              />
            </View>

            {/* Nom */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nom</Text>
              <TextInput
                style={styles.input}
                placeholder="Entrez votre nom"
                placeholderTextColor="#64748b"
                value={lastName}
                onChangeText={setLastName}
                editable={!loading}
              />
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Adresse e-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="exemple@email.com"
                placeholderTextColor="#64748b"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                editable={!loading}
              />
            </View>

            {/* Mot de passe */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mot de passe</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Créez votre mot de passe"
                  placeholderTextColor="#64748b"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  editable={!loading}
                />
                <TouchableOpacity
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    color="#64748b"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Indicateur de force du mot de passe */}
            <View style={styles.passwordStrength}>
              <View style={styles.strengthBarContainer}>
                <View style={styles.strengthBarBackground}>
                  <View
                    style={[
                      styles.strengthBarFill,
                      { width: `${strength}%`, backgroundColor: strengthColor },
                    ]}
                  />
                </View>
                <Text style={[styles.strengthLabel, { color: strengthColor }]}>
                  {strengthLabel}
                </Text>
              </View>

              <View style={styles.passwordCriteria}>
                <View style={styles.criteriaItem}>
                  <MaterialCommunityIcons
                    name={
                      checks.length
                        ? "check-circle"
                        : "checkbox-blank-circle-outline"
                    }
                    size={16}
                    color={checks.length ? "#10b981" : "#64748b"}
                  />
                  <Text
                    style={[
                      styles.criteriaText,
                      checks.length
                        ? styles.criteriaValid
                        : styles.criteriaInvalid,
                    ]}
                  >
                    Au moins 8 caractères
                  </Text>
                </View>

                <View style={styles.criteriaItem}>
                  <MaterialCommunityIcons
                    name={
                      checks.uppercase
                        ? "check-circle"
                        : "checkbox- blank-circle-outline"
                    }
                    size={16}
                    color={checks.uppercase ? "#10b981" : "#64748b"}
                  />
                  <Text
                    style={[
                      styles.criteriaText,
                      checks.uppercase
                        ? styles.criteriaValid
                        : styles.criteriaInvalid,
                    ]}
                  >
                    Une majuscule
                  </Text>
                </View>

                <View style={styles.criteriaItem}>
                  <MaterialCommunityIcons
                    name={
                      checks.number
                        ? "check-circle"
                        : "checkbox-blank-circle-outline"
                    }
                    size={16}
                    color={checks.number ? "#10b981" : "#64748b"}
                  />
                  <Text
                    style={[
                      styles.criteriaText,
                      checks.number
                        ? styles.criteriaValid
                        : styles.criteriaInvalid,
                    ]}
                  >
                    Un chiffre
                  </Text>
                </View>
              </View>
            </View>

            {/* Conditions d'utilisation */}
            <View style={styles.termsContainer}>
              <Checkbox
                value={termsAccepted}
                onValueChange={setTermsAccepted}
                color={termsAccepted ? "#2463eb" : undefined}
                style={styles.checkbox}
              />
              <Text style={styles.termsText}>
                {"J&apos;accepte les "}
                <Text style={styles.termsLink}>
                  Conditions d&apos;utilisation
                </Text>{" "}
                et la{" "}
                <Text style={styles.termsLink}>
                  Politique de confidentialité
                </Text>
                .
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              (!termsAccepted || loading) && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            activeOpacity={0.9}
            disabled={!termsAccepted || loading}
          >
            <Text style={styles.nextButtonText}>
              {loading ? "Création..." : "Suivant"}
            </Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Déjà un compte ? </Text>
            <TouchableOpacity onPress={handleLogin} activeOpacity={0.7}>
              <Text style={styles.loginLink}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Tes styles (inchangés, juste un petit ajout)
const styles = StyleSheet.create({
  // ... TOUS TES STYLES EXISTANTS (je les garde tous) ...
  container: { flex: 1, backgroundColor: "#111621" },
  keyboardView: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: -0.015,
  },
  headerSpacer: { width: 48 },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  formContainer: { paddingHorizontal: 16, paddingTop: 12, gap: 16 },
  inputGroup: { gap: 8 },
  label: { fontSize: 16, fontWeight: "500", color: "#ffffff", lineHeight: 24 },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#ffffff",
    backgroundColor: "rgba(30, 41, 59, 0.5)",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 12,
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    height: 56,
  },
  passwordInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#ffffff",
  },
  passwordToggle: {
    width: 56,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  passwordStrength: { gap: 12, paddingTop: 8 },
  strengthBarContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
  strengthBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "#334155",
    borderRadius: 4,
    overflow: "hidden",
  },
  strengthBarFill: { height: "100%", borderRadius: 4 },
  strengthLabel: { fontSize: 14, fontWeight: "500" },
  passwordCriteria: { gap: 6 },
  criteriaItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  criteriaText: { fontSize: 14 },
  criteriaValid: { color: "#10b981" },
  criteriaInvalid: { color: "#64748b" },
  termsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 24,
  },
  checkbox: { width: 24, height: 24, borderRadius: 6, marginTop: 2 },
  termsText: { flex: 1, fontSize: 14, color: "#cbd5e1", lineHeight: 20 },
  termsLink: { fontWeight: "600", color: "#2463eb" },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.05)",
    gap: 16,
  },
  nextButton: {
    height: 56,
    borderRadius: 9999,
    backgroundColor: "#2463eb",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2463eb",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonDisabled: { opacity: 0.5 },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.015,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: { fontSize: 14, color: "#94a3b8" },
  loginLink: { fontSize: 14, fontWeight: "700", color: "#2463eb" },
});
