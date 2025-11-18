#ifndef WIFI_MODULE_H
#define WIFI_MODULE_H

#include <Arduino.h>
#include <WiFi.h>

class WiFiModule {
private:
    const char* ssid;
    const char* password;
    unsigned long lastReconnectTime = 0;

public:
    WiFiModule(const char* ssid, const char* password);

    bool connect();
    bool isConnected();
    void autoReconnect(unsigned long interval);
};

#endif
