#include "Sensor_DS18B20.h"

const int PINO_TRIG = 21; // Pino D4 conectado ao TRIG do HC-SR04
const int PINO_ECHO = 19; // Pino D2 conectado ao ECHO do HC-SR04
void setup() {
  Serial.begin(115200);
  startTemperature();
  pinMode(PINO_TRIG, OUTPUT); // Configura o pino TRIG como saída
  pinMode(PINO_ECHO, INPUT); // Configura o pino ECHO como entrada

}

void loop() {
  float temp = readTemperature();
   digitalWrite(PINO_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PINO_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PINO_TRIG, LOW);
  
  long duracao = pulseIn(PINO_ECHO, HIGH); // Mede o tempo de resposta do ECHO  
  float distancia = (duracao * 0.0343) / 2;// Calcula a distância usando a velocidade do som (aproximadamente 343 m/s)
  Serial.print("Distância: ");
  Serial.print(distancia);
  Serial.println(" cm");
  Serial.print("Temperautra:");
  Serial.println(readTemperature());
  delay(2000);
}
