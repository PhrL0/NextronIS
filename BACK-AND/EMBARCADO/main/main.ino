//#include "Sensor_DS18B20.h"
#include "Mqtt_Service.h"
#include "Converter.h"

const char* ssid = "linksys";
const char* password = "";
const char* broker = "10.110.12.49";

float gerarFloatAleatorio(float min, float max) {
  long inteiro = random(10000); // número entre 0 e 9999
  float valor = (float)inteiro / 10000.0; // transforma em float de 0.0 a 0.9999
  return min + valor * (max - min);       // escala para o intervalo desejado
}

void setup() {
  Serial.begin(115200);
  setup_wifi(ssid,password);
  mqtt_setup(broker,1883);
  randomSeed(analogRead(A0));
}

void loop() {
  mqtt_loop();
  mqtt_publish("esp32/temperatura",floatToStr( gerarFloatAleatorio(1, 100),2));
  mqtt_publish("esp32/rpm",floatToStr( gerarFloatAleatorio(1, 100),2));
  mqtt_publish("esp32/nivelOleo",floatToStr( gerarFloatAleatorio(1, 100),2));
  mqtt_publish("esp32/corrente",floatToStr( gerarFloatAleatorio(1, 100),2));

  delay(2000);
}
