#include <Arduino.h>
#include "sensors.h"

// Sorties LED pour simulation
#define LED_VIBRATION 25
#define LED_CURRENT   26

void Sensors::begin() {
    pinMode(LED_VIBRATION, OUTPUT);
    pinMode(LED_CURRENT, OUTPUT);

    // Éteindre au démarrage
    digitalWrite(LED_VIBRATION, LOW);
    digitalWrite(LED_CURRENT, LOW);
}

int Sensors::readVibration() {
    // Simulation : vibration ON/OFF aléatoire
    int vib = random(0, 2);

    // Allumer LED si vibration détectée
    digitalWrite(LED_VIBRATION, vib);

    return vib;
}

float Sensors::readCurrent() {
    // Simulation : courant aléatoire entre 0 et 5A
    float current = random(0, 500) / 100.0;

    // LED ON si courant > 1A
    digitalWrite(LED_CURRENT, current > 1.0);

    return current;
}

String Sensors::getTelemetry() {
    int vib = readVibration();
    float cur = readCurrent();

    String json = "{";
    json += "\"vibration\":" + String(vib) + ",";
    json += "\"current\":" + String(cur, 2);
    json += "}";

    return json;
}
