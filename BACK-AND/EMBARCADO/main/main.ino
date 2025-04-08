#include "Sensor_DS18B20.h"
#include "Mqtt_Service.h"
#include "Converter.h"

const char* ssid = "rede";
const char* password = "senha";
const char* broker = "ip";

void setup() {
  Serial.begin(115200);
  startTemperature();
  setup_wifi(ssid,password);
  mqtt_setup(broker);
}

void loop() {
  mqtt_loop();
  float temp = readTemperature();
  mqtt_publish("esp32/sensor",floatToStr(temp,2));
  Serial.print("Temperautra:");
  Serial.println(readTemperature());
  delay(2000);
}
