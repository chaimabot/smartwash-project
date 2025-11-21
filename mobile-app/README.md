# 🌀 Laverie Intelligente - Application Mobile

Application mobile IoT pour gérer les machines à laver connectées, développée avec **React Native**, **Expo** et **NativeWind (Tailwind CSS)**.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Expo](https://img.shields.io/badge/Expo-~54.0-000020.svg?style=flat&logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB.svg?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg?style=flat&logo=typescript)

---

## 📱 Fonctionnalités

- ✅ **Authentification** - Connexion et inscription avec design moderne
- ✅ **Gestion des machines** - Visualisation en temps réel des machines disponibles
- ✅ **Réservation** - Sélection de machine et créneau horaire
- ✅ **Paiement** - Historique et paiement rapide par QR Code
- ✅ **Profil utilisateur** - Statistiques et paramètres
- ✅ **Thème clair/sombre** - Support automatique
- ✅ **Design moderne** - Glassmorphism, dégradés, animations fluides

---

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js** (v18 ou supérieur)
- **npm** ou **yarn**
- **Expo Go** (sur votre téléphone) ou un émulateur Android/iOS

### Installation

1. **Installer les dépendances**

   ```bash
   npm install
   ```

2. **Lancer l'application**

   ```bash
   npx expo start -c
   ```

   Ou simplement :

   ```bash
   npm start
   ```

3. **Scanner le QR Code**

   - Ouvrez **Expo Go** sur votre téléphone
   - Scannez le QR Code affiché dans le terminal
   - L'application se chargera automatiquement

### Lancer sur émulateur

```bash
# Android
npm run android

# iOS (Mac uniquement)
npm run ios
```

---

## 📂 Structure du Projet

```
mobile-app/
├── app/
│   ├── (splash)/          # Écran de démarrage
│   │   ├── _layout.tsx
│   │   └── splash.tsx
│   ├── (auth)/            # Authentification
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/            # Navigation principale
│   │   ├── _layout.tsx
│   │   ├── index.tsx      # Accueil
│   │   ├── reservation.tsx
│   │   ├── payment.tsx
│   │   └── profile.tsx
│   └── _layout.tsx        # Layout racine
├── components/            # Composants réutilisables
├── constants/             # Constantes (thème, couleurs)
├── hooks/                 # Hooks personnalisés
├── styles/                # Styles globaux
│   └── globals.css
├── tailwind.config.js     # Configuration Tailwind
├── nativewind-env.d.ts    # Types NativeWind
└── package.json
```

---

## 🎨 Design Système

### Palette de Couleurs

| Couleur           | Hex       | Usage                    |
|-------------------|-----------|--------------------------|
| Bleu principal    | `#3c3cf6` | Boutons, icônes actives  |
| Turquoise accent  | `#50E3C2` | Accents, succès          |
| Fond clair        | `#f5f6fa` | Arrière-plan mode clair  |
| Fond sombre       | `#101022` | Arrière-plan mode sombre |

### Typographie

- **Police principale** : Inter
- **Tailles** : text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl

### Composants

- **Cartes** : `rounded-2xl` avec `shadow-lg`
- **Boutons** : `h-14` ou `h-16` avec `rounded-xl`
- **Icônes** : MaterialIcons de `@expo/vector-icons`

---

## 🛠️ Technologies Utilisées

- **[Expo](https://expo.dev)** - Framework React Native
- **[Expo Router](https://docs.expo.dev/router/introduction/)** - Navigation basée sur les fichiers
- **[NativeWind](https://www.nativewind.dev/)** - Tailwind CSS pour React Native
- **[TypeScript](https://www.typescriptlang.org/)** - Typage statique
- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)** - Animations performantes

---

## 📱 Captures d'Écran

### Écran Splash
- Animation de fade-in et scale
- Loader avec barre de progression
- Redirection automatique après 2 secondes

### Authentification
- Design moderne avec bulles floutées
- Validation des champs
- Connexion sociale (Google, Apple)

### Accueil
- Cartes machines avec progression
- Historique des lavages
- Bouton de réservation

### Réservation
- Liste des machines disponibles
- Sélection de créneau horaire
- Récapitulatif avant confirmation

### Paiement
- Carte glassmorphism
- Historique avec badges de statut
- QR Code pour paiement rapide

### Profil
- Statistiques utilisateur
- Paramètres du compte
- Déconnexion sécurisée

---

## 🔧 Scripts Disponibles

```bash
# Démarrer l'application
npm start

# Démarrer avec cache nettoyé
npx expo start -c

# Lancer sur Android
npm run android

# Lancer sur iOS
npm run ios

# Linter le code
npm run lint
```

---

## 🌐 Navigation

L'application utilise **Expo Router** avec une navigation basée sur les groupes :

1. **(splash)** - Écran de démarrage
2. **(auth)** - Authentification (login, register)
3. **(tabs)** - Navigation principale avec 4 onglets
   - Accueil 🏠
   - Réservation 📅
   - Paiement 💳
   - Profil 👤

---

## 🎯 Prochaines Étapes

- [ ] Connexion à une API backend (Node.js, Django, etc.)
- [ ] Gestion d'état avec Context API ou Zustand
- [ ] Notifications push avec Expo Notifications
- [ ] Intégration de paiement réel (Stripe)
- [ ] Mode hors ligne avec AsyncStorage
- [ ] Tests unitaires avec Jest
- [ ] Tests E2E avec Detox

---

## 📄 Documentation

Pour plus de détails sur l'implémentation, consultez [IMPLEMENTATION.md](./IMPLEMENTATION.md).

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

## 📝 Licence

Ce projet est développé dans le cadre d'un projet d'intégration.

---

## 👥 Auteur

**Chaima** - Développeuse Mobile

---

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la [documentation Expo](https://docs.expo.dev/)
- Rejoindre la [communauté Discord Expo](https://chat.expo.dev)

---

**Développé avec ❤️ en React Native + Expo + NativeWind**
