#include <Arduino.h>
#include "wifi_module.h"
#include "mqtt.h"
#include "config.h"
#include "sensors.h"

Sensors sensors;
WiFiModule wifi("IsraaPhone", "01020304");

void setup() {
    Serial.begin(115200);
    delay(500);

    // === IMPORTANT POUR LED GPIO2 ===
    pinMode(2, OUTPUT);  

    sensors.begin();

    // Connexion WiFi
    bool wifi_ok = wifi.connect();

    if (wifi_ok) {
        mqtt_connect();        // Connexion broker
        mqtt_publish_test();   // Test publish
    } else {
        Serial.println("[MAIN] WiFi non connecté → MQTT ignoré.");
    }
}

void loop() {
    // Auto reconnect WiFi
    wifi.autoReconnect(5000);

    static unsigned long lastSend = 0;

    // Publier télémétrie toutes les 3 secondes
    if (millis() - lastSend > 3000) {
        lastSend = millis();

        String data = sensors.getTelemetry();
        mqtt_publish("machine/1/telemetry", data.c_str());

        Serial.print("[SIMU] Data envoyée : ");
        Serial.println(data);
    }

    // MQTT doit être traité en continu
    mqtt_loop();
}
