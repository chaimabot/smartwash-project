#include <Arduino.h>
#include "control.h"
#include "mqtt.h"
#include "config.h"

void setup() {
    Serial.begin(115200);
    pinMode(LED_PIN, OUTPUT);

    // Connexion Wi-Fi
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connexion au Wi-Fi");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println();
    Serial.println("Wi-Fi connecté !");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());

    // Connexion au broker MQTT
    mqtt_connect(MQTT_SERVER, MQTT_PORT);
}

void loop() {
    // Boucle MQTT
    mqtt_loop();

    // Publier le statut de la machine toutes les secondes
    processTelemetry();
    delay(1000);
}

// Test commit pour GitHub


