#ifndef MQTT_SERVICE_H
#define MQTT_SERVICE_H

#include <WiFi.h>
#include <PubSubClient.h>

// Funções que a main vai usar
void setup_wifi(const char* ssid, const char* password);
void mqtt_setup(const char* broker, uint16_t port = 1883);
void mqtt_loop();
void mqtt_publish(const char* topic, const char* message);

#endif
