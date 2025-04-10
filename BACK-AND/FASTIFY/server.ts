
import './mqttSubscriber'
import { WebSocketServer } from 'ws'
import { wsHandler } from './src/websocket/wsHandler'

const wss = new WebSocketServer({ port: 8080 })
console.log('🛰️ WebSocket rodando em ws://localhost:8080')

wss.on('connection', (socket) => {
  const clientId = wsHandler.addClient(socket)

  socket.on('message', (msg) => {
    console.log(`[${clientId}] disse: ${msg}`)
  })

  socket.on('close', () => {
    wsHandler.removeClient(clientId)
  })

  socket.send('🖖 Bem-vindo ao WebSocket!')
})
