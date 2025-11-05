# TODO: Create Complete UI Mockup for Laverie Intelligente App

## Information Gathered

- Project: React Native Expo app with NativeWind styling.
- Existing: splash.tsx (minor text fix needed), login.tsx (complete), index.tsx (default, replace), \_layouts (update for new screens).
- Missing: register.tsx, reservation.tsx, payment.tsx, profile.tsx.
- Colors: primary #3c3cf6, accent #50E3C2, backgrounds light/dark.
- Fonts: Inter.
- Icons: Material Icons.
- Navigation: Expo Router with groups (splash), (auth), (tabs).

## Plan

- Fix subtitle in splash.tsx to "Votre linge, connecté et intelligent".
- Create register.tsx in app/(auth)/ with form fields, buttons, design matching login.
- Replace app/(tabs)/index.tsx with home UI: greeting, machines section, history, reserve button.
- Create reservation.tsx: list machines, selector, confirm button.
- Create payment.tsx: history, status, pay button, QR.
- Create profile.tsx: avatar, info, buttons.
- Update app/(tabs)/\_layout.tsx: add reservation, payment, profile tabs with icons (local-laundry-service, schedule, payment, person).
- Update app/(auth)/\_layout.tsx: add register screen.
- Ensure all use NativeWind, dark mode, glassmorphism, animations where specified.

## Dependent Files to be edited

- app/(splash)/splash.tsx: Fix subtitle text.
- app/(auth)/register.tsx: New file.
- app/(auth)/\_layout.tsx: Add register screen.
- app/(tabs)/index.tsx: Replace content.
- app/(tabs)/reservation.tsx: New file.
- app/(tabs)/payment.tsx: New file.
- app/(tabs)/profile.tsx: New file.
- app/(tabs)/\_layout.tsx: Update tabs.

## Followup steps

- Test navigation between screens.
- Verify dark mode and light mode.
- Run app and check responsiveness.
- Ensure no HTML/CSS, pure React Native.
