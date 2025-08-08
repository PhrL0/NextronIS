//#include "Sensor_DS18B20.h"
#include "Mqtt_Service.h"
#include "Converter.h"
#include "ArduinoJson.h"


const char* ssid = "Nextron";
const char* password = "pedro135553";
const char* broker = "192.168.147.10";

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
  //Monta Json
  StaticJsonDocument<256> doc;
  doc["temperatura"] = gerarFloatAleatorio(1, 100);
  doc["rpm"] = gerarFloatAleatorio(1000, 2000);
  doc["nivel"] = gerarFloatAleatorio(1, 100);
  doc["corrente"] = gerarFloatAleatorio(10,50);

  char jsonBuffer[256];
  serializeJson(doc,jsonBuffer);
  mqtt_publish("esp32/sensores",jsonBuffer);
  delay(2000);
}
