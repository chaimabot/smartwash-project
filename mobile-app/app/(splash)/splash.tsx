import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Animated, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

/**
 * 🌀 Page Splash - Laverie Intelligente
 * Design moderne avec dégradé bleu → turquoise
 * Animation de fade-in et loader
 * Redirection automatique vers login après 2 secondes
 */
const SplashScreen: React.FC = () => {
  const router = useRouter();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animation de fade-in et scale
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Animation du loader
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();

    // Redirection vers login après 2 secondes
    const timer = setTimeout(() => {
      router.replace("/(auth)/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View className="flex-1 bg-primary">
      {/* Fond dégradé radial bleu → turquoise */}
      <View className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-accent" />
      
      {/* Bulles décoratives floutées */}
      <View className="absolute top-[-10%] left-[-10%] w-80 h-80 rounded-full bg-accent/30 blur-3xl" />
      <View className="absolute bottom-[-15%] right-[-15%] w-96 h-96 rounded-full bg-primary-light/40 blur-3xl" />

      {/* Contenu principal */}
      <Animated.View
        className="flex-1 items-center justify-center px-8"
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        {/* Logo machine à laver */}
        <View className="mb-8 items-center justify-center w-32 h-32 rounded-full bg-white/20 backdrop-blur-xl shadow-2xl">
          <MaterialIcons name="local-laundry-service" size={72} color="#ffffff" />
        </View>

        {/* Titre principal */}
        <Text className="text-white text-4xl font-bold text-center mb-3 tracking-tight">
          Laverie Intelligente
        </Text>

        {/* Sous-titre */}
        <Text className="text-white/90 text-lg text-center font-light tracking-wide">
          Votre linge, connecté et intelligent
        </Text>
      </Animated.View>

      {/* Loader animé en bas */}
      <View className="absolute bottom-20 left-0 right-0 px-12">
        <View className="h-2 bg-white/20 rounded-full overflow-hidden">
          <Animated.View
            className="h-full bg-white rounded-full"
            style={{ width: progressWidth }}
          />
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;
