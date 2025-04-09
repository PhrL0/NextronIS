
import mqtt, { MqttClient } from 'mqtt'

const MQTT_BROKER_URL = 'mqtt://localhost:1883' // ou seu broker online/externo
const CLIENT_ID = `mqtt_client_${Math.random().toString(16).slice(2, 8)}`

const options = {
  clientId: CLIENT_ID,
  clean: true,              // desconecta e reconecta com nova sessão
  connectTimeout: 4000,     // tempo limite da conexão
  reconnectPeriod: 1000,    // tenta reconectar a cada 1s
}

// Criamos o client com base nas opções acima
const client: MqttClient = mqtt.connect(MQTT_BROKER_URL, options)

// Conexão com sucesso
client.on('connect', () => {
  console.log(`[MQTT] Conectado ao broker como "${CLIENT_ID}"`)
})

// Erro de conexão
client.on('error', (error) => {
  console.error('[MQTT] Erro de conexão:', error)
  client.end()
})

// Exportamos para usar em outros módulos
export default client
