#ifndef MQTT_MODULE_H
#define MQTT_MODULE_H

#include <Arduino.h>

void mqtt_connect();
void mqtt_loop();
void mqtt_publish_status(const char* status);

void setMachineID(String id);
String getMachineID();

#endif