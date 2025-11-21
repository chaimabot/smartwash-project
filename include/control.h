#pragma once
#include <Arduino.h>
#include <ArduinoJson.h>

extern String machineStatus;
extern int remainingTime;

void startMachine();
void stopMachine();
void processTelemetry();
