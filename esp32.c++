#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "SEU_WIFI";
const char* password = "SUA_SENHA";
const char* serverURL = "http://192.168.1.100:5000/dados";  // Endereço do servidor

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando...");
  }

  Serial.println("WiFi Conectado!");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverURL);
    http.addHeader("Content-Type", "application/json");

    String payload = "{\"sensor\":25.5}";
    int httpResponseCode = http.POST(payload);
    
    Serial.print("Código HTTP: ");
    Serial.println(httpResponseCode);
    
    http.end();
  }
  delay(5000);  // Enviar dados a cada 5 segundos
}
