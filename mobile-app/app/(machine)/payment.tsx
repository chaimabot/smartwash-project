import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type PaymentMethod = "mastercard" | "new-card" | "d17";

export default function PaymentScreen() {
  // const colorScheme = useColorScheme();
  const isDark = true; // Force dark mode comme dans le HTML

  const [selectedPayment, setSelectedPayment] =
    useState<PaymentMethod>("mastercard");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  const styles = createStyles(isDark);

  const RadioButton = ({ selected }: { selected: boolean }) => (
    <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Paiement</Text>
        <View style={styles.backButton} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Étape 2 sur 3</Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBar, { width: "66%" }]} />
            </View>
          </View>

          {/* Reservation Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Résumé de la réservation</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Service</Text>
                <Text style={styles.summaryValue}>
                  Lavage & Séchage - Machine 5
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Date et heure</Text>
                <Text style={styles.summaryValue}>Aujourd&apos;hui, 14:30</Text>
              </View>
              <View style={styles.summaryRowTotal}>
                <Text style={styles.summaryLabel}>Total à payer</Text>
                <Text style={styles.totalAmount}>12,50 €</Text>
              </View>
            </View>
          </View>

          {/* Payment Methods */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Choisissez votre moyen de paiement
            </Text>

            {/* Saved Mastercard */}
            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPayment === "mastercard" &&
                  styles.paymentOptionSelected,
              ]}
              onPress={() => setSelectedPayment("mastercard")}
            >
              <RadioButton selected={selectedPayment === "mastercard"} />
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMh6m-X_ZFOi3RQlZLEpt5ydb5sat-3odOy0mB2xAXGFhkldVRgDNx_aQ8wY5i_TJMlsxVaksXpaOurK6GwaKjtTXbHPV71PiHnRgj-w6By93YZNkh3JkH4ocbu5NrCpEmYfa9ZQP9riKZq7pi6LVdDTK_TD_Sx5opl7JTzePCea2-dqu_Xe2yTcx9d9-npBgq6spuQFeP2pWo_ES_N0NASnj-6GOIRqABJS42s3B-Sb4NvYdjugwgRQfGLWyXNXlZXtk10XnZ1bXg",
                }}
                style={styles.paymentLogo}
              />
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentName}>Mastercard</Text>
                <Text style={styles.paymentDetails}>•••• 4242</Text>
              </View>
            </TouchableOpacity>

            {/* New Card */}
            <TouchableOpacity
              style={[
                styles.paymentOption,
                styles.paymentOptionExpanded,
                selectedPayment === "new-card" && styles.paymentOptionSelected,
              ]}
              onPress={() => setSelectedPayment("new-card")}
              activeOpacity={1}
            >
              <View style={styles.paymentHeader}>
                <RadioButton selected={selectedPayment === "new-card"} />
                <Image
                  source={{
                    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0fan1lmQxJr1RTK9U5btFSmYlefK7b8NvmaXBrrGNyql7cmJB4klxLu-gtzHuBAKa5K1ZZIXoLbBZB8MaXYuet7O3V5MvRi9xn78arTKtG2q0j5-GvNTlbrtI5rVc67n_5dRWdLDcF9FJyreWETrChB4NYya6ilY2B4pqPFW_SyNcRfva8yKTFoJMZkst7S9l299Z_U_iphUpNtwxrxfS_Js-i59n7C2dNg703Fg80oW-PBRVkdpB_6hhISCqzmZOldv6S08TWnA-",
                  }}
                  style={styles.paymentLogo}
                />
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentName}>Carte bancaire</Text>
                  <Text style={styles.paymentDetails}>
                    Visa, Mastercard, Amex
                  </Text>
                </View>
              </View>

              {selectedPayment === "new-card" && (
                <View style={styles.cardForm}>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Numéro de carte</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="0000 0000 0000 0000"
                      placeholderTextColor="#6B7280"
                      value={cardNumber}
                      onChangeText={setCardNumber}
                      keyboardType="numeric"
                      maxLength={19}
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Nom du titulaire</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Nom Prénom"
                      placeholderTextColor="#6B7280"
                      value={cardHolder}
                      onChangeText={setCardHolder}
                    />
                  </View>

                  <View style={styles.inputRow}>
                    <View style={[styles.inputGroup, styles.inputHalf]}>
                      <Text style={styles.inputLabel}>Expiration</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="MM/AA"
                        placeholderTextColor="#6B7280"
                        value={expiryDate}
                        onChangeText={setExpiryDate}
                        keyboardType="numeric"
                        maxLength={5}
                      />
                    </View>

                    <View style={[styles.inputGroup, styles.inputHalf]}>
                      <Text style={styles.inputLabel}>CVV</Text>
                      <View style={styles.cvvContainer}>
                        <TextInput
                          style={styles.input}
                          placeholder="123"
                          placeholderTextColor="#6B7280"
                          value={cvv}
                          onChangeText={setCvv}
                          keyboardType="numeric"
                          maxLength={3}
                          secureTextEntry
                        />
                        <Ionicons
                          name="help-circle-outline"
                          size={18}
                          color="#9CA3AF"
                          style={styles.cvvIcon}
                        />
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => setSaveCard(!saveCard)}
                  >
                    <View style={styles.checkbox}>
                      {saveCard && (
                        <Ionicons name="checkmark" size={16} color="#3b82f6" />
                      )}
                    </View>
                    <Text style={styles.checkboxLabel}>
                      Enregistrer cette carte pour mes prochains achats
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>

            {/* D17 Payment */}
            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPayment === "d17" && styles.paymentOptionSelected,
              ]}
              onPress={() => setSelectedPayment("d17")}
            >
              <RadioButton selected={selectedPayment === "d17"} />
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBM_IXsljIYwJmHaO-f0SRFcLlNOn3HwFaA524V2zM4XFL6qcRKWZq7i-R6DA7kBU0SP4rg3J_LusLZwd9wJJ0Z5OTVb-U65waEwkjqOL1EeFOAEBxxDEndamzJAEtGO7VhXWPvTvQ0gXN37ZxEmDjEiw7-J-VMw_ZKnvE3mvJ61B_t37YLuyqqIz6lbvtk80mpbWhVBKlL_5wGjv4Ga6D1ZL1AAN2NRzQxm1s5A6j0Pf6T6vw0F6wch--v0rHL7xU4A2PCqtYaaCPj",
                }}
                style={styles.paymentLogo}
              />
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentName}>Payer avec D17</Text>
              </View>
            </TouchableOpacity>

            {/* Security Badge */}
            <View style={styles.securityBadge}>
              <Ionicons name="lock-closed" size={16} color="#9CA3AF" />
              <Text style={styles.securityText}>
                Paiement 100% sécurisé via SSL
              </Text>
            </View>
          </View>

          {/* Bottom padding for fixed button */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Fixed Payment Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => {
            // Handle payment
            console.log("Payment processed");
            router.push("/confirmation");
          }}
        >
          <Text style={styles.payButtonText}>Payer 12,50 €</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#111827",
    },
    keyboardView: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
      backgroundColor: "rgba(17, 24, 39, 0.8)",
    },
    backButton: {
      width: 48,
      height: 48,
      justifyContent: "center",
      alignItems: "center",
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: "#fff",
      flex: 1,
      textAlign: "center",
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 20,
    },
    progressContainer: {
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: 16,
    },
    progressText: {
      fontSize: 14,
      fontWeight: "500",
      color: "#9CA3AF",
      marginBottom: 24,
    },
    progressBarBg: {
      height: 8,
      backgroundColor: "#1F2937",
      borderRadius: 9999,
      overflow: "hidden",
    },
    progressBar: {
      height: "100%",
      backgroundColor: "#3b82f6",
      borderRadius: 9999,
    },
    section: {
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: "#fff",
      marginBottom: 8,
      marginTop: 16,
    },
    summaryCard: {
      backgroundColor: "#1F2937",
      borderWidth: 1,
      borderColor: "#374151",
      borderRadius: 16,
      padding: 16,
    },
    summaryRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#374151",
    },
    summaryRowTotal: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: 12,
    },
    summaryLabel: {
      fontSize: 14,
      color: "#9CA3AF",
      flex: 1,
    },
    summaryValue: {
      fontSize: 14,
      fontWeight: "500",
      color: "#D1D5DB",
      textAlign: "right",
      flex: 1,
    },
    totalAmount: {
      fontSize: 18,
      fontWeight: "700",
      color: "#fff",
    },
    paymentOption: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#1F2937",
      borderWidth: 1,
      borderColor: "#374151",
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
    },
    paymentOptionSelected: {
      borderWidth: 2,
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.2)",
    },
    paymentOptionExpanded: {
      flexDirection: "column",
      alignItems: "stretch",
    },
    paymentHeader: {
      flexDirection: "row",
      alignItems: "center",
    },
    radioOuter: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#374151",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    radioOuterSelected: {
      borderWidth: 2,
      borderColor: "#3b82f6",
      backgroundColor: "#3b82f6",
    },
    radioInner: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#fff",
    },
    paymentLogo: {
      width: 24,
      height: 24,
      marginRight: 16,
    },
    paymentInfo: {
      flex: 1,
    },
    paymentName: {
      fontSize: 14,
      fontWeight: "600",
      color: "#fff",
      marginBottom: 2,
    },
    paymentDetails: {
      fontSize: 14,
      color: "#9CA3AF",
    },
    cardForm: {
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: "#374151",
    },
    inputGroup: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 12,
      color: "#9CA3AF",
      marginBottom: 8,
    },
    input: {
      backgroundColor: "#111827",
      borderWidth: 1,
      borderColor: "#374151",
      borderRadius: 12,
      padding: 12,
      fontSize: 14,
      color: "#D1D5DB",
    },
    inputRow: {
      flexDirection: "row",
      gap: 16,
    },
    inputHalf: {
      flex: 1,
    },
    cvvContainer: {
      position: "relative",
    },
    cvvIcon: {
      position: "absolute",
      right: 12,
      top: 12,
    },
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
    },
    checkbox: {
      width: 16,
      height: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: "#374151",
      backgroundColor: "#111827",
      marginRight: 12,
      justifyContent: "center",
      alignItems: "center",
    },
    checkboxLabel: {
      fontSize: 14,
      color: "#D1D5DB",
      flex: 1,
    },
    securityBadge: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      marginTop: 32,
    },
    securityText: {
      fontSize: 12,
      color: "#9CA3AF",
    },
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(17, 24, 39, 0.9)",
      padding: 16,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: "#374151",
    },
    payButton: {
      backgroundColor: "#3b82f6",
      borderRadius: 9999,
      paddingVertical: 16,
      paddingHorizontal: 24,
      alignItems: "center",
      shadowColor: "#3b82f6",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    payButtonText: {
      fontSize: 16,
      fontWeight: "700",
      color: "#fff",
    },
  });
