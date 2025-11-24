#include <Arduino.h>
#include "control.h"
#include "wifi_module.h"
#include "mqtt.h"  // Gardez ce nom
#include "config.h"

// Module WiFi
WiFiModule wifi(WIFI_SSID, WIFI_PASSWORD);

void setup() {
    Serial.begin(115200);
    delay(200);
    
    Serial.println("\n========== DÉMARRAGE ESP32 ==========");

    // Initialiser le moteur et la LED
    initMotor();

    // Test LED de démarrage
    //digitalWrite(LED_RUN, HIGH);
    //delay(500);
    //digitalWrite(LED_RUN, LOW);

    // Connexion WiFi
    if (!wifi.connect()) {
        Serial.println("[ERREUR] Impossible de se connecter au WiFi");
        while(true) {
            delay(1000);
            Serial.println("[WiFi] Tentative de reconnexion...");
            if (wifi.connect()) break;
        }
    }

    // Connexion MQTT (avec vos fonctions)
    mqtt_connect();

    Serial.println("========== Système prêt ==========");
}

void loop() {
    // Maintenir les connexions
    wifi.autoReconnect(30000);
    mqtt_loop();  // Utiliser votre fonction

    // Synchronisation LED ↔ moteur
    if (getMotorStatus() == "running") {
        digitalWrite(LED_RUN, HIGH);
    } else {
        digitalWrite(LED_RUN, LOW);
    }

    // Lecture des commandes via Serial
    if (Serial.available()) {
        String cmd = Serial.readStringUntil('\n');
        handleCommand(cmd);
        Serial.println("[Serial] Motor: " + getMotorStatus());
        
        // Publier le statut
        mqtt_publish_status(getMotorStatus().c_str());
    }

    delay(10);
}