#ifndef CONFIG_H
#define CONFIG_H

// ===============================
// WIFI CONFIG — Ton hotspot iPhone
// ===============================
#define WIFI_SSID        "IsraaPhone"
#define WIFI_PASSWORD    "01020304"   // Ton mot de passe

// ===============================
// MQTT CONFIG — Broker Mosquitto sur ton PC
// ===============================
#define MQTT_BROKER_IP   "172.20.10.3"   // IP de ton PC
#define MQTT_PORT        1883
#define MQTT_CLIENT_ID   "ESP32-Israa"

// Topic de test
#define MQTT_TEST_TOPIC  "test/esp32"

#endif
