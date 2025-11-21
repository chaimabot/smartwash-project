import { Stack } from "expo-router";

export default function SplashLayout() {
  return (
    <Stack initialRouteName="onboarding1">
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding1" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding2" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding3" options={{ headerShown: false }} />
    </Stack>
  );
}
