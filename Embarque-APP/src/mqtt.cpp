#include <PubSubClient.h>
#include <WiFi.h>
#include "mqtt.h"
#include "config.h"
#include "control.h"  // ✅ AJOUT : Pour accéder aux fonctions moteur

WiFiClient espClient;
PubSubClient client(espClient);

String machineId = "";

// =====================
// Détecter l'ID depuis le topic
// =====================
void callback(char* topic, byte* payload, unsigned int length) {
    String message;
    for (int i = 0; i < length; i++) message += (char)payload[i];

    String topicStr = String(topic);
    int firstSlash = topicStr.indexOf('/');
    int secondSlash = topicStr.indexOf('/', firstSlash + 1);

    machineId = topicStr.substring(firstSlash + 1, secondSlash);

    Serial.println("➡ ID détectée : " + machineId);
    Serial.println("➡ Commande reçue : " + message);

    // ✅✅✅ AJOUT : Appeler handleCommand pour contrôler le moteur et la LED
    handleCommand(message);

    // Publier le statut réel du moteur
    String statusTopic = "machine/" + machineId + "/status";
    String status = getMotorStatus();  // Obtenir le vrai statut
    
    if (status == "running") {
        client.publish(statusTopic.c_str(), "{\"status\":\"running\"}");
    } else {
        client.publish(statusTopic.c_str(), "{\"status\":\"stopped\"}");
    }
}

void mqtt_connect() {
    client.setServer(MQTT_BROKER_IP, MQTT_PORT);
    client.setCallback(callback);

    while (!client.connected()) {
        String clientID = String(MQTT_CLIENT_ID) + "_" + machineId;
        if (client.connect(clientID.c_str())) {
            client.subscribe("machine/+/cmd");
            Serial.println("[MQTT] Connecté et abonné à machine/+/cmd");
        } else {
            Serial.print("[MQTT] Échec, code: ");
            Serial.println(client.state());
            delay(2000);
        }
    }
}

void mqtt_loop() {
    if (!client.connected()) mqtt_connect();
    client.loop();
}

void mqtt_publish_status(const char* status) {
    if (machineId == "") return;
    String topic = "machine/" + machineId + "/status";
    client.publish(topic.c_str(), status);
}

void setMachineID(String id) { machineId = id; }
String getMachineID() { return machineId; }