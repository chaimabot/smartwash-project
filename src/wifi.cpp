#include <Arduino.h>
#include <WiFi.h>
#include "wifi_module.h"
#include "config.h"


// ============================
// Constructeur
// ============================
WiFiModule::WiFiModule(const char* ssid, const char* password) {
    this->ssid = ssid;
    this->password = password;
}

// ============================
// Connexion WiFi
// ============================
bool WiFiModule::connect() {
    Serial.println("[WiFi] Initialisation...");
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);

    Serial.print("[WiFi] Connexion à ");
    Serial.println(ssid);

    int attempts = 0;

    while (WiFi.status() != WL_CONNECTED && attempts < 20) {
        delay(500);
        Serial.print(".");
        attempts++;
    }

    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("\n[WiFi] Connecté !");
        Serial.print("[WiFi] IP: ");
        Serial.println(WiFi.localIP());
        return true;
    }

    Serial.println("\n[WiFi] Échec de connexion.");
    return false;
}

// ============================
// Vérification connexion
// ============================
bool WiFiModule::isConnected() {
    return WiFi.status() == WL_CONNECTED;
}

// ============================
// Reconnexion Auto
// ============================
void WiFiModule::autoReconnect(unsigned long interval) {
    if (isConnected()) return;

    unsigned long now = millis();

    if (now - lastReconnectTime >= interval) {
        Serial.println("[WiFi] Tentative de reconnexion...");
        lastReconnectTime = now;
        connect();
    }
}
