import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKF_98_bx6bN_yUZpn0NyOqPcXoQmJPx_MXNi16dTz8lI2UqU-2mMqvNLMhwz8svGLVu7vRPHxn21g75pLA2j_nxFMFy7w9FYl6Sjgm5sWpyeQ8aNC25Q6ysiTRwfZbu64lXGfZOCbJ3f-dkx7ZGZLOlUq98ZV4LnzUqSAh_5ULzEM8Ihg7K-qRGEqheWmEhGTLEvfWe4kcDvJP1qh2qpemhOjKcOwFhFjrvQLL70vhaoOR08Ie2ek68lMB2yI50kZT6Z3dDML6mE5",
          }}
          style={styles.avatar}
        />
        <Text style={styles.headerTitle}>Bonjour, Alex!</Text>
        <TouchableOpacity style={styles.notificationBtn}>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions Grid */}
        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.gridItem}>
            <Ionicons name="calendar-outline" size={28} color="#fff" />
            <Text style={styles.gridTitle}>Réserver</Text>
            <Text style={styles.gridSubtitle}>Trouver un créneau</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => router.push("/(machine)/list" as any)}
          >
            <Ionicons name="hardware-chip-outline" size={28} color="#fff" />
            <Text style={styles.gridTitle}>Machines</Text>
            <Text style={styles.gridSubtitle}>Voir la disponibilité</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <Ionicons name="qr-code-outline" size={28} color="#fff" />
            <Text style={styles.gridTitle}>Scanner QR</Text>
            <Text style={styles.gridSubtitle}>Démarrer une machine</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem}>
            <Ionicons name="help-circle-outline" size={28} color="#fff" />
            <Text style={styles.gridTitle}>Aide</Text>
            <Text style={styles.gridSubtitle}>Obtenir de l&apos;aide</Text>
          </TouchableOpacity>
        </View>

        {/* Current Wash Card */}
        <View style={styles.currentWashCard}>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuD65VJbwiVGg-NtgjF7aEVgXjaUuOsxR0DKuOBfwfxx5wE9rU0hWdkh_l3m9rCDFFS76NpUy-O63jRMpGl3iqvr8BQMeqJtVBsuKPRlcXFNSBHuTWw2xSGTHYR2IIGujexOixbrUPnJzhSVTMVQyUf3TyZrih4-4g3cQfNNTSbs7DLhZ4-RQkhlwqnuJ9KhgDD8EBqvFr7HmMzXZMW8kmVNsDhI87TrS8htm_a3PA0l8Zj1ipclFVtCBTo4GtIa2RcMPjWEwl7zUOdO",
            }}
            style={styles.washImage}
          />
          <View style={styles.washInfo}>
            <Text style={styles.washTitle}>Votre lavage en cours</Text>
            <Text style={styles.washDetail}>Lave-linge #5 - Cycle Coton</Text>
            <Text style={styles.washDetail}>Termine dans 24 min</Text>
            <TouchableOpacity
              style={styles.detailsBtn}
              onPress={() => router.push("/(machine)/5" as any)}
            >
              <Text style={styles.detailsBtnText}>Voir détails</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Available Machines */}
        <Text style={styles.sectionTitle}>Machines disponibles</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.machinesScroll}
        >
          <MachineCard
            id="1"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuACZaLT0upYqmQjXaxX1NOzFNxeGgtsyyhhFi4IqKT5GMxsTR0RU54SrJJFYNX-UGliR0d1RKXukG84qVEvqqyJ0ExgvpypJZLkBpzL1lLUbEDUuR7M75MQuCmk-bEc5ruiVn12cU9-kHNjKpa5dCvyEqck1SKMZfsp-b29G7X90AHLx6MHJOTAa7t0dgoGOhBZeOP5sGDL4XpLvjbGYsSPz31ApYNizW6TneYe_OzHdoZs-dLsoOsiI9r1GSw9c1JQ0P_50twJ0MWf"
            name="Lave-linge #1"
            status="LIBRE"
            statusColor="#4ade80"
            available={true}
          />
          <MachineCard
            id="8"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuB0szyocLSn_gsiL1s8PIEcywrJVrGjQJ8-RU4hnhSZ1JCRz_11e9DwAQuLfbws6pGttj0KJ-OGR9FQbqxm_mH5dwZQecr6Lou9Nd-zjFmWuQ8cnlnKC9QbxmuY8yUXbjDVqSv5sZS3wqN-dhLCuvBSJAp-EC34basTfdyKIJ82bo9YW8Emswxj1D2lrGuct_U9ft5ewuy_ixW4XtdyNegXo5sruT5SrKS0-cHK8biwE6kyFzYeDtolw7oFs99k2EF7_2g3ExzSamBx"
            name="Sèche-linge #8"
            status="Fin dans 5 min"
            statusColor="#facc15"
            available={true}
          />
          <MachineCard
            id="3"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuBfnFqSAOwsONeDTksd1tgbSoIlyOhtpAcljV3xjO0VL_Fp1We1QVo1Dnz0h3iULT7avjZAJESqDJUI7QyXn7w35zdhldaZIzlIzzjdfoXPeBygSltgtb750SAhByQ3lBJPHiT2fWvXM6PIMskbXaSJhUaPoxWL9rKzfiVG6lhkF997drAbkVvJe9riOoMq_jycID6hDbHKMTARlliCCwO_KZKrEdyAnTOxzkuPeR398QNUrU7-aTdfBpLqyEQEdC9O5XwIzJMViiuc"
            name="Lave-linge #3"
            status="OCCUPÉE"
            statusColor="#f87171"
            available={false}
          />
          <MachineCard
            id="6"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuAPhzkPLGWRSTHnEcbVwh3tFw22mXxo6B-JGP9oFFjuNLBLzrkQ_XHi2tK_1ENQQNPkGJOK0lYCHgFOaYMCb-7IV3JBcVZ-xLyCpcJ0NadDm3T_P8Ww-0DCBoI4G2QAPPLo7lX55zBhEOpx1oD-htB9jhPwS-eay6lczNjT13zl0uD_nPjVhyp53xXxR8rZiMLhyESJdlsh0kroHhEe6szJZtaJSVXktLfdHUD7_ylUOercsYSeZ8CHl5w4blWeIM2QDuWvjqZxNMIx"
            name="Sèche-linge #6"
            status="Hors service"
            statusColor="#9da6b9"
            available={false}
          />
        </ScrollView>

        {/* Recent History */}
        <Text style={styles.sectionTitle}>Historique récent</Text>
        <View style={styles.historyContainer}>
          <HistoryItem
            icon="hardware-chip-outline"
            title="Lave-linge #2 - Cycle Rapide"
            date="Hier, 18:30"
            price="4,50€"
          />
          <HistoryItem
            icon="shirt-outline"
            title="Sèche-linge #7 - Normal"
            date="15 Nov, 10:15"
            price="2,00€"
          />
          <HistoryItem
            icon="hardware-chip-outline"
            title="Lave-linge #5 - Coton"
            date="08 Nov, 20:00"
            price="5,00€"
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

function MachineCard({ id, image, name, status, statusColor, available }: any) {
  return (
    <View style={styles.machineCard}>
      <Image source={{ uri: image }} style={styles.machineImage} />
      <View style={styles.machineInfo}>
        <Text style={styles.machineName}>{name}</Text>
        <Text style={[styles.machineStatus, { color: statusColor }]}>
          {status}
        </Text>
        <TouchableOpacity
          style={[styles.reserveBtn, !available && styles.reserveBtnDisabled]}
          disabled={!available}
          onPress={() => available && router.push(`/(machine)/${id}` as any)}
        >
          <Text
            style={[
              styles.reserveBtnText,
              !available && styles.reserveBtnTextDisabled,
            ]}
          >
            Réserver
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function HistoryItem({ icon, title, date, price }: any) {
  return (
    <View style={styles.historyItem}>
      <View style={styles.historyIcon}>
        <Ionicons name={icon} size={24} color="#2463eb" />
      </View>
      <View style={styles.historyInfo}>
        <Text style={styles.historyTitle}>{title}</Text>
        <Text style={styles.historyDate}>{date}</Text>
      </View>
      <Text style={styles.historyPrice}>{price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121826",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingTop: Platform.OS === "ios" ? 50 : 16,
    backgroundColor: "#111827",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 12,
  },
  notificationBtn: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    gap: 16,
  },
  gridItem: {
    width: "47%",
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 12,
  },
  gridSubtitle: {
    fontSize: 14,
    color: "#9da6b9",
    marginTop: 4,
  },
  currentWashCard: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  washImage: {
    width: "100%",
    height: 200,
  },
  washInfo: {
    padding: 16,
  },
  washTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  washDetail: {
    fontSize: 16,
    color: "#9da6b9",
    marginBottom: 4,
  },
  detailsBtn: {
    backgroundColor: "#2463eb",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  detailsBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  machinesScroll: {
    paddingLeft: 16,
    marginBottom: 24,
  },
  machineCard: {
    width: 160,
    backgroundColor: "#1F2937",
    borderRadius: 16,
    marginRight: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  machineImage: {
    width: "100%",
    height: 160,
  },
  machineInfo: {
    padding: 12,
  },
  machineName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  machineStatus: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
  },
  reserveBtn: {
    backgroundColor: "rgba(36, 99, 235, 0.2)",
    borderRadius: 24,
    paddingVertical: 8,
    alignItems: "center",
  },
  reserveBtnDisabled: {
    backgroundColor: "#374151",
  },
  reserveBtnText: {
    color: "#2463eb",
    fontSize: 14,
    fontWeight: "bold",
  },
  reserveBtnTextDisabled: {
    color: "#6b7280",
  },
  historyContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(36, 99, 235, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 14,
    color: "#9da6b9",
  },
  historyPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
