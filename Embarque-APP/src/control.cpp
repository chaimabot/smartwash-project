#include "control.h"

static bool motorRunning = false;

void initMotor() {
    pinMode(MOTOR_PIN, OUTPUT);
    digitalWrite(MOTOR_PIN, LOW);

    pinMode(LED_RUN, OUTPUT);
    digitalWrite(LED_RUN, LOW);
    
    Serial.println("[INIT] Moteur et LED initialisés");
}

void startMotor() {
    digitalWrite(MOTOR_PIN, HIGH);
    digitalWrite(LED_RUN, HIGH);
    motorRunning = true;
    
    Serial.println("✅ [MOTOR] DÉMARRÉ - LED ON");
    Serial.print("[DEBUG] GPIO");
    Serial.print(MOTOR_PIN);
    Serial.println(" = HIGH");
    Serial.print("[DEBUG] GPIO");
    Serial.print(LED_RUN);
    Serial.println(" = HIGH");
}

void stopMotor() {
    digitalWrite(MOTOR_PIN, LOW);
    digitalWrite(LED_RUN, LOW);
    motorRunning = false;
    
    Serial.println("⏹ [MOTOR] ARRÊTÉ - LED OFF");
    Serial.print("[DEBUG] GPIO");
    Serial.print(MOTOR_PIN);
    Serial.println(" = LOW");
    Serial.print("[DEBUG] GPIO");
    Serial.print(LED_RUN);
    Serial.println(" = LOW");
}

String getMotorStatus() {
    return motorRunning ? "running" : "stopped";
}

void handleCommand(String cmd) {
    cmd.trim();
    cmd.toLowerCase();
    
    Serial.print("🔧 [COMMAND] Traitement de : '");
    Serial.print(cmd);
    Serial.println("'");

    if (cmd == "start") {
        startMotor();
    } 
    else if (cmd == "stop") {
        stopMotor();
    }
    else {
        Serial.print("❌ [ERREUR] Commande inconnue : ");
        Serial.println(cmd);
    }
}