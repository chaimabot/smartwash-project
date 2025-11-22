#include "mqtt.h"
#include "control.h"
#include "config.h"

// Création réelle des objets WiFi et MQTT
WiFiClient espClient;
PubSubClient client(espClient);

// Callback MQTT
void mqtt_callback(char* topic, byte* payload, unsigned int length) {
    String msg;
    for (unsigned int i = 0; i < length; i++) msg += (char)payload[i];

    Serial.print("Message reçu sur ");
    Serial.print(topic);
    Serial.print(": ");
    Serial.println(msg);

    if (msg == "start" && machineStatus == "available") startMachine();
    else if (msg == "stop") stopMachine();
}

// Connexion au broker MQTT
void mqtt_connect(const char* server, int port) {
    client.setServer(server, port);
    client.setCallback(mqtt_callback);

    while (!client.connected()) {
        Serial.println("Connexion au broker MQTT...");
        if (client.connect("ESP32Client")) {
            Serial.println("MQTT connecté !");
            client.subscribe("machine/1/command"); // Souscrire aux commandes de la machine
        } else {
            Serial.print("Échec, rc=");
            Serial.print(client.state());
            delay(2000);
        }
    }
}

// Boucle MQTT
void mqtt_loop() {
    if (!client.connected()) {
        mqtt_connect(MQTT_SERVER, MQTT_PORT);
    }
    client.loop();
}

// Publier un message
void mqtt_publish(const char* topic, String payload) {
    client.publish(topic, payload.c_str());
}
