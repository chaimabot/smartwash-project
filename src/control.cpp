#include "control.h"
#include "mqtt.h"
#include "config.h"
#include <ArduinoJson.h>

String machineStatus = "available";
int remainingTime = 0;

void startMachine() {
    machineStatus = "busy";
    remainingTime = 10; // durée simulée
    digitalWrite(LED_PIN, HIGH);
}

void stopMachine() {
    machineStatus = "available";
    remainingTime = 0;
    digitalWrite(LED_PIN, LOW);
}

void processTelemetry() {
    StaticJsonDocument<256> doc; // JsonDocument recommandé
    doc["Status"] = machineStatus;
    doc["RemainingTime"] = remainingTime;
    doc["vibration"] = 0;
    doc["current"] = 0;

    String payload;
    serializeJson(doc, payload);
    mqtt_publish("machine/1/telemetry", payload);

    if (machineStatus == "busy" && remainingTime > 0) {
        remainingTime--;
        if (remainingTime == 0) stopMachine();
    }
}
