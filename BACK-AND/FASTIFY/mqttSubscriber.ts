
import mqttClient from '../FASTIFY/src/config/mqttClient'

const TOPICS = ['sensor/temperatura', 'sensor/umidade'] // Altere para os seus tópicos

// Subscreve aos tópicos
mqttClient.subscribe(TOPICS, { qos: 0 }, (err, granted) => {
  if (err) {
    console.error('[MQTT SUBSCRIBER] Erro ao se inscrever:', err)
  } else {
    console.log('[MQTT SUBSCRIBER] Inscrito nos tópicos:', granted.map(g => g.topic).join(', '))
  }
})

// Ouvinte de mensagens
mqttClient.on('message', (topic, message) => {
  try {
    const payload = message.toString()
    console.log(`[MQTT RECEBIDO] Tópico: ${topic} | Mensagem: ${payload}`)

    // Aqui você pode fazer o que quiser: salvar no banco, mandar pro websocket, etc.
    // Exemplo: parsear JSON
    if (topic === 'sensor/temperatura') {
      const data = JSON.parse(payload)
      console.log('[DADO TEMPERATURA]:', data)
    }

  } catch (error) {
    console.error('[ERRO DE PARSE MQTT]:', error)
  }
})
