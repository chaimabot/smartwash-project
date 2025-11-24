#ifndef WIFI_MODULE_H
#define WIFI_MODULE_H

#include <Arduino.h>
#include <WiFi.h>

class WiFiModule {
private:
  const char* ssid;
  const char* password;
  unsigned long lastReconnectTime;

public:
  // Constructeur
  WiFiModule(const char* ssid, const char* password);
  
  // Méthodes publiques
  bool connect();
  bool isConnected();
  void disconnect();
  void autoReconnect(unsigned long interval = 5000);
  String getIP();
  int getSignalStrength();
  void printStatus();
};

#endif