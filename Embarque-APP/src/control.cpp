#include "control.h"
#include "mqtt.h"  // Pour publier le statut

// Pin du moteur (LED simulation)
#define MOTOR_PIN 2

// État actuel du moteur
bool motorRunning = false;

// ============================ 
// Initialisation du moteur
// ============================ 
void initMotor() {
  pinMode(MOTOR_PIN, OUTPUT);
  digitalWrite(MOTOR_PIN, LOW);
  motorRunning = false;
}

// ============================ 
// Renvoie l'état booléen du moteur
// ============================ 
bool getMotorState() {
  return motorRunning;
}

// ============================ 
// Renvoie le statut sous forme de texte
// ============================ 
const char* getMotorStatus() {
  return motorRunning ? "running" : "stopped";
}

// ============================ 
// Gestion des commandes MQTT
// ============================ 
void handleCommand(String command) {
  Serial.print("[CONTROL] Commande reçue: ");
  Serial.println(command);

  // Nettoyer la commande
  command.trim();
  command.toLowerCase();

  // ===== Commande START =====
  if (command == "start" || command == "{\"command\":\"start\"}") {
    digitalWrite(MOTOR_PIN, HIGH);
    motorRunning = true;
    Serial.println("[CONTROL] ✓ Moteur démarré");

    mqtt_publish_status("running");
  }

  // ===== Commande STOP =====
  else if (command == "stop" || command == "{\"command\":\"stop\"}") {
    digitalWrite(MOTOR_PIN, LOW);
    motorRunning = false;
    Serial.println("[CONTROL] ✓ Moteur arrêté");

    mqtt_publish_status("stopped");
  }

  // ===== Commande STATUS =====
  else if (command == "status" || command == "{\"command\":\"status\"}") {
    Serial.print("[CONTROL] État moteur: ");
    Serial.println(motorRunning ? "EN MARCHE" : "ARRÊTÉ");

    mqtt_publish_status(getMotorStatus());
  }

  // ===== Commande inconnue =====
  else {
    Serial.print("[CONTROL] ⚠ Commande inconnue: ");
    Serial.println(command);
  }
}
