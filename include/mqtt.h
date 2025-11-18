#ifndef MQTT_MODULE_H
#define MQTT_MODULE_H

void mqtt_connect();
void mqtt_publish_test();
void mqtt_publish(const char* topic, const char* payload);  // ← Ajouté
void mqtt_loop();

#endif
