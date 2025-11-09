import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // Charger les données sauvegardées au démarrage
  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {
    try {
      const saved = await AsyncStorage.getItem("rememberedUser");
      if (saved) {
        const { email: savedEmail, remember } = JSON.parse(saved);
        setEmail(savedEmail);
        setRememberMe(remember);
      }
    } catch (error) {
      console.log("Erreur chargement credentials", error);
    }
  };

  const saveCredentials = async () => {
    if (rememberMe) {
      await AsyncStorage.setItem(
        "rememberedUser",
        JSON.stringify({ email, remember: true })
      );
    } else {
      await AsyncStorage.removeItem("rememberedUser");
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://localhost:7017/api/Auth/login",
        {
          email,
          password,
        }
      );

      const { token } = response.data;

      // Sauvegarde du token
      await AsyncStorage.setItem("userToken", token);

      // Sauvegarde email si "Se souvenir de moi"
      await saveCredentials();

      Alert.alert("Succès", "Bienvenue sur Laverie Futée !", [
        { text: "OK", onPress: () => router.replace("/(tabs)") },
      ]);
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "Email ou mot de passe incorrect";
      Alert.alert("Connexion échouée", msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/(auth)/forgot-password");
  };

  const handleSignUp = () => {
    router.push("/(auth)/register");
  };

  const handleGoogleLogin = () => {
    Alert.alert("Bientôt disponible", "Connexion Google en développement");
  };

  const handleFacebookLogin = () => {
    Alert.alert("Bientôt disponible", "Connexion Facebook en développement");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111621" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo et Nom de l'App */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <MaterialCommunityIcons
                name="washing-machine"
                size={64}
                color="#4A90E2"
              />
            </View>
            <Text style={styles.appName}>Laverie Futée</Text>
          </View>

          {/* Carte de connexion */}
          <View style={styles.loginCard}>
            <Text style={styles.title}>Connexion</Text>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={20}
                    color="#6b7280"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Entrez votre adresse email"
                    placeholderTextColor="#6b7280"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    editable={!loading}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mot de passe</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={20}
                    color="#6b7280"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, styles.passwordInput]}
                    placeholder="Entrez votre mot de passe"
                    placeholderTextColor="#6b7280"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                    activeOpacity={0.7}
                  >
                    <MaterialCommunityIcons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#6b7280"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.optionsContainer}>
              <View style={styles.rememberMeContainer}>
                <Switch
                  value={rememberMe}
                  onValueChange={setRememberMe}
                  trackColor={{ false: "#767577", true: "#4A90E2" }}
                  thumbColor={rememberMe ? "#ffffff" : "#f4f3f4"}
                  style={styles.checkbox}
                  disabled={loading}
                />
                <Text style={styles.rememberMeText}>Se souvenir de moi</Text>
              </View>
              <TouchableOpacity
                onPress={handleForgotPassword}
                activeOpacity={0.7}
                disabled={loading}
              >
                <Text style={styles.forgotPasswordText}>
                  Mot de passe oublié ?
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.loginButton,
                loading && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              activeOpacity={0.9}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? "Connexion..." : "Se connecter"}
              </Text>
            </TouchableOpacity>

            <View style={styles.separator}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>ou</Text>
              <View style={styles.separatorLine} />
            </View>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleGoogleLogin}
                activeOpacity={0.8}
              >
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZRrRrLLQrIalfINxd_NXWcZvPxkIgzn3CdgPmBzR9uu6g5GEh6Y6kUb-8XVoG4K2nUdv2INXDqo8nfl0l5pmXmhz8ypAT8sOZQlUjy5wf2Cxr3R7W-ZYTlFQLFPP_xaTHcx16q7lgqVgW2MU9jjmN85gv72HnVN6SXmBK6QT8SIkpH8qGhp2bza-tX-1KFETRqvojeFRngCL012fW1ImcYUUrq5yGOYxAs3-Hv4uYNpLYnb774ArvxINabWz30ubkiKsu0e5-vqJ6",
                  }}
                  style={styles.socialIcon}
                />
                <Text style={styles.socialButtonText}>
                  Continuer avec Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleFacebookLogin}
                activeOpacity={0.8}
              >
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_6ZYWINMuK1OfdGA_t7XIYLNkC1DAA1ekJWF637fyKP5IjH4gUDTo7kWih1XYRrQbf3IYaljwOFOonVXl8srYk1yAdBlp-ND3fYY83FzV9ILkbAghZijGzV77hP3DRWFWxZdZXSim6dH6JDPOldxobh0-J4cAtujNGEsnpbLIDxWoSNwLsUxz8N2kyC7N23edAtvdcbIhZbG5cOfQuH78EGhtpJO60lByHWIa5w-ToAPVWlVwpGMwZQt1z8i3OkAyNnoq_ptTcTNM",
                  }}
                  style={styles.socialIcon}
                />
                <Text style={styles.socialButtonText}>
                  Continuer avec Facebook
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Nouvel utilisateur ? </Text>
            <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
              <Text style={styles.signUpLink}>Créez un compte</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Ajout d'un style pour le bouton désactivé
const styles = StyleSheet.create({
  // ... tous tes styles existants ...
  loginButtonDisabled: {
    opacity: 0.7,
  },
  // Garde tous les styles que tu avais déjà (je les ai omis pour la lisibilité)
  container: { flex: 1, backgroundColor: "#111621" },
  keyboardView: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  logoContainer: { alignItems: "center", marginBottom: 32, gap: 16 },
  logoCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: "rgba(74, 144, 226, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  appName: { fontSize: 24, fontWeight: "700", color: "#ffffff" },
  loginCard: {
    width: "100%",
    maxWidth: 448,
    alignSelf: "center",
    backgroundColor: "#1C212E",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 24,
    letterSpacing: -0.5,
  },
  formContainer: { gap: 16, marginBottom: 16 },
  inputGroup: { gap: 8 },
  label: { fontSize: 16, fontWeight: "500", color: "#d1d5db" },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderWidth: 1,
    borderColor: "#4b5563",
    borderRadius: 8,
    backgroundColor: "#374151",
  },
  inputIcon: { position: "absolute", left: 12, zIndex: 1 },
  input: {
    flex: 1,
    height: "100%",
    paddingLeft: 40,
    paddingRight: 12,
    fontSize: 16,
    color: "#ffffff",
  },
  passwordInput: { paddingRight: 40 },
  eyeButton: { position: "absolute", right: 12, padding: 4 },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  rememberMeContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
  checkbox: { transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] },
  rememberMeText: { fontSize: 14, fontWeight: "500", color: "#d1d5db" },
  forgotPasswordText: { fontSize: 14, fontWeight: "500", color: "#4A90E2" },
  loginButton: {
    height: 48,
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: { fontSize: 16, fontWeight: "700", color: "#ffffff" },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 16,
  },
  separatorLine: { flex: 1, height: 1, backgroundColor: "#4b5563" },
  separatorText: { fontSize: 14, fontWeight: "500", color: "#6b7280" },
  socialButtonsContainer: { gap: 12 },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    backgroundColor: "#374151",
    borderWidth: 1,
    borderColor: "#4b5563",
    borderRadius: 8,
    gap: 12,
  },
  socialIcon: { width: 20, height: 20 },
  socialButtonText: { fontSize: 16, fontWeight: "500", color: "#ffffff" },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  signUpText: { fontSize: 16, color: "#9ca3af" },
  signUpLink: { fontSize: 16, fontWeight: "700", color: "#4A90E2" },
});
