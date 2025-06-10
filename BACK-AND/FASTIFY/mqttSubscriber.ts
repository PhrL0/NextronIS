
import mqttClient from '../FASTIFY/src/config/mqttClient'

const TOPICS = ['esp32/temperatura','esp32/rpm','esp32/nivelOleo','esp32/corrente'] 

// Subscreve aos tópicos
mqttClient.subscribe(TOPICS, { qos: 0 }, (err, granted) => {
  if (err) {
    console.error('[MQTT SUBSCRIBER] Erro ao se inscrever:', err)
  } else if(granted) {
    console.log('[MQTT SUBSCRIBER] Inscrito nos tópicos:', granted.map(g => g.topic).join(', '))
  }
})

// Ouvinte de mensagens
mqttClient.on('message', (topic, message) => {
  try {
    const payload = message.toString()
    console.log(`[MQTT RECEBIDO] Tópico: ${topic} | Mensagem: ${payload}`)

    if (topic === 'esp32/sensor1') {
      const data = JSON.parse(payload)
      console.log('[DADO TEMPERATURA]:', data)
    }
  } catch (error) {
    console.error('[ERRO DE PARSE MQTT]:', error)
  }
})
