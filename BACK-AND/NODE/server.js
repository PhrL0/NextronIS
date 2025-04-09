const socket = new WebSocket("ws://localhost:1880/ws/data");

socket.onopen = function () {
  console.log("Conectado ao servidor WebSocket");
};

socket.onmessage = function (event) {
  console.log("Mensagem recebida:", event.data);
};

socket.onclose = function () {
  console.log("Conexão fechada");
};

socket.onerror = function (error) {
  console.error("Erro WebSocket:", error);
};