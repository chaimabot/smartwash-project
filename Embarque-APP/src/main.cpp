#include <Arduino.h>
#include "config.h"
#include "wifi_module.h"
#include "mqtt.h"
#include "control.h"

WiFiModule wifiModule(WIFI_SSID, WIFI_PASSWORD);

void setup() {
    Serial.begin(115200);
    delay(1000);

    Serial.println("\n========== DÉMARRAGE ESP32 ==========");
    initMotor();

    // Pas d'ID au démarrage
    setMachineID("");

    // Connexion WiFi
    if (wifiModule.connect()) {
        wifiModule.printStatus();
        mqtt_connect();
    } else {
        Serial.println("[ERREUR] Impossible de se connecter au WiFi");
    }
}

void loop() {
    // Reconnexion WiFi auto (toutes les 5 secondes si déconnecté)
    wifiModule.autoReconnect(5000);

    // Loop MQTT
    mqtt_loop();

    // Vérifier si l'état du moteur a changé
    static String lastStatus = "";
    String currentStatus = getMotorStatus(); // "running" ou "stopped"

    if (currentStatus != lastStatus) {
        mqtt_publish_status(currentStatus.c_str());
        lastStatus = currentStatus;
    }

    delay(10);
}
