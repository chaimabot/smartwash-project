#ifndef CONTROL_H
#define CONTROL_H

#include <Arduino.h>

// Initialisation du moteur
void initMotor();

// Retourne true si moteur en marche, false sinon
bool getMotorState();

// Retourne "running" ou "stopped"
const char* getMotorStatus();

// Fonction pour gérer les commandes reçues via MQTT
void handleCommand(String command);

#endif
