#pragma once
#include <WiFi.h>
#include <PubSubClient.h>

// Déclaration externe de client pour l'utiliser dans main.cpp
extern PubSubClient client;

// Prototypes des fonctions MQTT
void mqtt_connect(const char* server, int port);
void mqtt_loop();
void mqtt_publish(const char* topic, String payload);
void mqtt_callback(char* topic, byte* payload, unsigned int length);
