#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include "config.h"

WiFiClient espClient;
PubSubClient mqttClient(espClient);

// ========== MOTEUR (simulé avec LED GPIO2) ==========
#define MOTOR_PIN 2

// ============================
// Callback MQTT
// ============================
void mqtt_callback(char* topic, byte* payload, unsigned int length) {
    Serial.print("\n[MQTT] Message reçu sur ");
    Serial.print(topic);
    Serial.print(" : ");

    // Convertir payload → String
    String msg = "";
    for (int i = 0; i < length; i++) {
        msg += (char)payload[i];
    }
    Serial.println(msg);

    // =============================
    // Gestion des commandes moteur
    // =============================
    if (String(topic) == "machine/1/cmd") {

        if (msg.indexOf("start") != -1) {
            digitalWrite(MOTOR_PIN, HIGH);   // Moteur ON (LED ON)
            Serial.println("[ACTION] MOTEUR → DÉMARRÉ");
        }
        else if (msg.indexOf("stop") != -1) {
            digitalWrite(MOTOR_PIN, LOW);    // Moteur OFF (LED OFF)
            Serial.println("[ACTION] MOTEUR → ARRÊTÉ");
        }
        else {
            Serial.println("[ACTION] Commande inconnue !");
        }
    }
}

// ============================
// Connexion au broker MQTT
// ============================
void mqtt_connect() {
    pinMode(MOTOR_PIN, OUTPUT);
    digitalWrite(MOTOR_PIN, LOW);  // moteur OFF par défaut

    mqttClient.setServer(MQTT_BROKER_IP, MQTT_PORT);
    mqttClient.setCallback(mqtt_callback);

    Serial.println("[MQTT] Connexion au broker...");

    while (!mqttClient.connected()) {
        if (mqttClient.connect(MQTT_CLIENT_ID)) {
            Serial.println("[MQTT] Connecté au broker !");

            mqttClient.subscribe("test/esp32");
            mqttClient.subscribe("machine/1/cmd");   // Commandes moteur
        } 
        else {
            Serial.print("[MQTT] Échec, code erreur = ");
            Serial.println(mqttClient.state());
            delay(2000);
        }
    }
}

// ============================
// Publish test
// ============================
void mqtt_publish_test() {
    const char* payload = "{\"msg\":\"hello from ESP32\"}";
    mqttClient.publish(MQTT_TEST_TOPIC, payload);
    Serial.println("[MQTT] Message publié !");
}

// ============================
// Publish général
// ============================
void mqtt_publish(const char* topic, const char* payload) {
    mqttClient.publish(topic, payload);

    Serial.print("[MQTT] PUB → ");
    Serial.print(topic);
    Serial.print(" : ");
    Serial.println(payload);
}

// ============================
// Loop MQTT
// ============================
void mqtt_loop() {
    if (!mqttClient.connected()) {
        mqtt_connect();
    }
    mqttClient.loop();
}
