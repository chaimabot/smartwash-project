#include "wifi_module.h"
#include <esp_wifi.h>
// ============================ 
// Constructeur
// ============================ 
WiFiModule::WiFiModule(const char* ssid, const char* password) {
  this->ssid = ssid;
  this->password = password;
  this->lastReconnectTime = 0;
}

// ============================ 
// Connexion WiFi
// ============================ 
bool WiFiModule::connect() {
  Serial.print("[WiFi] Connexion à ");
  Serial.print(ssid);
  Serial.print("...");
  
  // ✅ AJOUT : Nettoyage complet avant connexion
  WiFi.disconnect(true);
  delay(1000);
  WiFi.mode(WIFI_STA);
  delay(100);
  
  // ✅ AJOUT : Désactiver le mode économie d'énergie
  WiFi.setSleep(false);
  
  // ✅ AJOUT : Configuration du protocole WiFi
  esp_wifi_set_ps(WIFI_PS_NONE);

  WiFi.begin(ssid, password);
  delay(100);  // ✅ AJOUT : Petit délai après begin()

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 40) {  // ✅ Augmenté à 40 tentatives (20 secondes)
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n[WiFi] ✓ Connecté !");
    Serial.print("[WiFi] IP : ");
    Serial.println(WiFi.localIP());
    Serial.print("[WiFi] Signal : ");
    Serial.print(WiFi.RSSI());
    Serial.println(" dBm");
    return true;
  } else {
    Serial.println("\n[WiFi] ✗ Échec de connexion");
    Serial.print("[WiFi] Code erreur : ");
    Serial.println(WiFi.status());
    return false;
  }
}

// ============================ 
// Vérifier connexion
// ============================ 
bool WiFiModule::isConnected() {
  return WiFi.status() == WL_CONNECTED;
}

// ============================ 
// Déconnexion
// ============================ 
void WiFiModule::disconnect() {
  WiFi.disconnect(true);  // ✅ AJOUT : true pour nettoyer complètement
  Serial.println("[WiFi] Déconnecté");
}

// ============================ 
// Reconnexion automatique
// ============================ 
void WiFiModule::autoReconnect(unsigned long interval) {
  if (!isConnected()) {
    unsigned long currentTime = millis();
    
    if (currentTime - lastReconnectTime >= interval) {
      Serial.println("[WiFi] Tentative de reconnexion...");
      connect();
      lastReconnectTime = currentTime;
    }
  }
}

// ============================ 
// Obtenir l'adresse IP
// ============================ 
String WiFiModule::getIP() {
  return WiFi.localIP().toString();
}

// ============================ 
// Force du signal (RSSI)
// ============================ 
int WiFiModule::getSignalStrength() {
  return WiFi.RSSI();
}

// ============================ 
// Afficher le statut
// ============================ 
void WiFiModule::printStatus() {
  Serial.println("\n========== WiFi Status ==========");
  Serial.print("État : ");
  Serial.println(isConnected() ? "Connecté" : "Déconnecté");
  
  if (isConnected()) {
    Serial.print("SSID : ");
    Serial.println(WiFi.SSID());
    Serial.print("IP : ");
    Serial.println(getIP());
    Serial.print("Signal : ");
    Serial.print(getSignalStrength());
    Serial.println(" dBm");
  }
  Serial.println("=================================\n");
}