#ifndef CONTROL_H
#define CONTROL_H

#include <Arduino.h>

#define MOTOR_PIN 2      // Pin moteur
#define LED_RUN   4      // Pin LED (séparée !)

void initMotor();
void startMotor();
void stopMotor();
String getMotorStatus();
void handleCommand(String cmd);

#endif
