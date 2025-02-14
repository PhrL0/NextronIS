
let monitoringInterval;
let isConnected = false;
let connectionError = false;
const API_URL = 'http://127.0.0.1:5000';
const CHECK_INTERVAL = 5000;
let connectionCheckInterval;
const loader = document.querySelector('.loader');
let chart;

function initializeChart() {
    const ctx = document.getElementById('sensorChart').getContext('2d');

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Temperatura (°C)',
                    data: [],
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Rotação (°/s)',
                    data: [],
                    borderColor: '#4dabf7',
                    backgroundColor: 'rgba(77, 171, 247, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Vibração (m/s²)',
                    data: [],
                    borderColor: '#69db7c',
                    backgroundColor: 'rgba(105, 219, 124, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Corrente (A)',
                    data: [],
                    borderColor: '#adb5bd',
                    backgroundColor: 'rgba(173, 181, 189, 0.1)',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: { mode: 'index', intersect: false }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#8da7b8' }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#8da7b8' }
                }
            }
        }
    });
}

function updateUI(data) {
    const sensors = {
        temp: data.temperatura,
        rotacao: data.rotacao,
        vibracao: data.vibracao,
        corrente: data.corrente
    };

    Object.entries(sensors).forEach(([key, value]) => {
        document.getElementById(key).textContent = value;
        const progress = document.getElementById(`${key}Progress`);
        if (progress) progress.value = value;
    });
}

function updateChart(data) {
    const now = new Date().toLocaleTimeString();

    chart.data.labels.push(now);
    chart.data.datasets[0].data.push(data.temperatura);
    chart.data.datasets[1].data.push(data.rotacao);
    chart.data.datasets[2].data.push(data.vibracao);
    chart.data.datasets[3].data.push(data.corrente);

    if (chart.data.labels.length > 15) {
        chart.data.labels.shift();
        chart.data.datasets.forEach(dataset => dataset.data.shift());
    }

    chart.update();
}

async function checkBackendConnection() {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const response = await fetch(`${API_URL}/health`, {
            method: 'HEAD',
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) throw new Error('Backend offline');

        if (!isConnected) {
            Swal.fire({
                icon: 'success',
                title: 'Conexão restabelecida!',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000
            });
        }

        isConnected = true;
        connectionError = false;
        updateConnectionStatus();
    } catch (error) {
        isConnected = false;
        connectionError = true;
        updateConnectionStatus();

        if (!navigator.onLine) {
            showConnectionError('Verifique sua conexão com a internet');
        } else {
            showConnectionError('Falha na comunicação com o servidor');
        }
    }
}

function updateConnectionStatus() {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');

    if (isConnected) {
        statusDot.className = 'status-dot connected';
        statusText.textContent = 'Conectado';
    } else {
        statusDot.className = 'status-dot disconnected';
        statusText.textContent = connectionError ? 'Desconectado' : 'Conectando...';
    }
}

function showConnectionError(message) {
    if (!connectionError) {
        Swal.fire({
            icon: 'error',
            title: 'Problema de conexão',
            text: message,
            confirmButtonColor: '#4b92d1',
            allowOutsideClick: false
        });
        connectionError = true;
    }
}


async function fetchSensorData() {
    if (!isConnected) return;

    try {
        loader.style.display = 'block';
        const response = await fetch(`${API_URL}/sensores`);
        if (!response.ok) throw new Error('Erro na rede');

        const data = await response.json();

        updateUI(data);
        updateChart(data);

        if (data.predicao !== undefined) {
            updateMachineState(data.predicao);
        }

        if (data.predicao === 2) {
            showCriticalAlert();
        }

    } catch (error) {
        console.error('Erro:', error);
        if (error.name === 'AbortError') checkBackendConnection();
        else Swal.fire('Erro', 'Falha ao carregar dados', 'error');
    } finally {
        loader.style.display = 'none';
    }
}

function startMonitoring() {
    if (!monitoringInterval) {
        monitoringInterval = setInterval(fetchSensorData, 2000);
        toggleButtons(true);
        fetchSensorData();
    }
}

function pauseMonitoring() {
    clearInterval(monitoringInterval);
    monitoringInterval = null;
    toggleButtons(false);
}

function toggleButtons(isMonitoring) {
    document.getElementById('startBtn').disabled = isMonitoring;
    document.getElementById('pauseBtn').disabled = !isMonitoring;
}

// Inicialização
function startConnectionMonitoring() {
    checkBackendConnection();
    connectionCheckInterval = setInterval(checkBackendConnection, CHECK_INTERVAL);

    window.addEventListener('online', checkBackendConnection);
    window.addEventListener('offline', () => {
        isConnected = false;
        updateConnectionStatus();
        showConnectionError('Verifique sua conexão com a internet');
    });
}
function updateMachineState(prediction) {
    const machineStatus = document.querySelector('.machine-status');
    const stateText = document.getElementById('machineStateText');
    const stateDescription = document.getElementById('machineStateDescription');

    // Remove todas as classes de estado
    machineStatus.classList.remove('normal', 'atencao', 'critico');

    switch (prediction) {
        case 0: // Normal
            machineStatus.classList.add('normal');
            stateText.textContent = 'Normal';
            stateText.style.color = '#28a745';
            stateDescription.textContent = 'A máquina está operando dentro dos parâmetros esperados.';
            break;

        case 1: // Atenção
            machineStatus.classList.add('atencao');
            stateText.textContent = 'Atenção';
            stateText.style.color = '#ffc107';
            stateDescription.textContent = 'A máquina está apresentando comportamentos fora do padrão. Verifique os sensores.';
            break;

        case 2: // Crítico
            machineStatus.classList.add('critico');
            stateText.textContent = 'Crítico';
            stateText.style.color = '#dc3545';
            stateDescription.textContent = 'A máquina está em estado crítico! Tome ações imediatas para evitar danos.';
            break;

        default:
            machineStatus.classList.remove('normal', 'atencao', 'critico');
            stateText.textContent = 'Desconhecido';
            stateText.style.color = '#ccc';
            stateDescription.textContent = 'Estado da máquina não identificado.';
    }
}
function showCriticalAlert() {
    Swal.fire({
        title: '⚠️ Estado Crítico Detectado!',
        text: 'A máquina está em estado crítico. Tome ações imediatas!',
        icon: 'error',
        confirmButtonText: 'Entendi',
        confirmButtonColor: '#dc3545',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: true,
        stopKeydownPropagation: true
    });
}
// ===== LÓGICA DO CHAT =====
let chatOpen = true;
let isTyping = false;

function toggleChat() {
    chatOpen = !chatOpen;
    const chat = document.querySelector('.nexmind-chat');

    if (chatOpen) {
        chat.classList.add('open');
        document.getElementById('chatInput').focus();
    } else {
        chat.classList.remove('open');
    }

}

function handleInput(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}
async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    try {
        // Adiciona mensagem do usuário
        addMessage('user', message, new Date());
        input.value = '';

        // Mostra indicador de digitação
        showTypingIndicator(true);

        // 👇🏼 Busca resposta do Gemini
        const response = await getGeminiResponse(message);

        // Adiciona resposta no chat
        addMessage('nexmind', response, new Date());

    } catch (error) {
        // Trata erros
        addMessage('system', `⚠️ Erro: ${error.message}`, new Date());
    } finally {
        // Esconde indicador de digitação
        showTypingIndicator(false);
    }
}


// Função para adicionar mensagem (mantida igual)
function addMessage(sender, text, timestamp) {
    const messagesDiv = document.getElementById('chatMessages');

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    // Timestamp
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-timestamp';
    timeDiv.textContent = timestamp.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    // Conteúdo
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    text.split('\n').forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        contentDiv.appendChild(p);
    });

    messageDiv.appendChild(timeDiv);
    messageDiv.appendChild(contentDiv);
    messagesDiv.appendChild(messageDiv);

    // Scroll automático
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Função para mostrar indicador de digitação
function showTypingIndicator(show) {
    const indicator = document.getElementById('typingIndicator');
    indicator.classList.toggle('visible', show);
    if (show) scrollToBottom();
}

// Função para scroll automático
function scrollToBottom() {
    const messagesDiv = document.getElementById('chatMessages');
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function getGeminiResponse(message) {
    try {
        const response = await fetch(`${API_URL}/postGemini`, {
            method: 'POST', // Gemini geralmente usa POST
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: message, // O texto enviado pelo usuário
            })
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        return data

    } catch (error) {
        console.error('Erro ao chamar Gemini:', error);
        throw new Error('Falha ao processar sua mensagem. Tente novamente.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeChart();
    toggleButtons(false);
    startConnectionMonitoring();
    toggleChat(); // Inicia fechado
    // Botão do ícone do chatbot
    document.getElementById('chatbot-icon').addEventListener('click', toggleChat);

    // Botão de fechar no cabeçalho do chat
    document.getElementById('chatStatus').addEventListener('click', () => {
        chatOpen = false;
        document.querySelector('.nexmind-chat').classList.remove('open');
    });
});
