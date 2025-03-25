const API_URL = 'http://127.0.0.1:5000';

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateReport');
    const chartContainer = document.querySelector('.chart-container');
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');

    // Configuração inicial de datas
    const today = new Date().toISOString().split('T')[0];
    startDate.value = today;
    endDate.value = today;

    // Funções auxiliares
    const helpers = {
        getSelectedParams: () => 
            Array.from(document.querySelectorAll('.parameter-selector input:checked'))
                .map(input => input.name),

        validateDates: () => {
            const start = new Date(startDate.value);
            const end = new Date(endDate.value);
            return start <= end && start.toString() !== 'Invalid Date';
        },

        formatInsight: (text) => {
            return text
                .replace(/❗/g, '⚠️')
                .replace(/(\d+°C)/g, '<span class="metric temperature">$1</span>')
                .replace(/(\d+mm\/s)/g, '<span class="metric vibration">$1</span>')
                .replace(/(\d+RPM)/g, '<span class="metric rotation">$1</span>')
                .replace(/(\d+A)/g, '<span class="metric current">$1</span>');
        },

        showLoading: () => {
            chartContainer.innerHTML = `
                <div class="loading-state">
                    <div class="spinner"></div>
                    <p>Analisando dados dos sensores...</p>
                </div>
            `;
        },

        showError: (message) => {
            chartContainer.innerHTML = `
                <div class="error-state">
                    <span>⚠️</span>
                    <p>${message}</p>
                </div>
            `;
        }
    };

    // Gerar e exibir insights
    const generateInsight = async () => {
        if (!helpers.validateDates()) {
            helpers.showError('Período inválido! A data final deve ser posterior à inicial');
            return;
        }

        try {
            helpers.showLoading();

            const response = await fetch(`${API_URL}/reports`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    parameters: helpers.getSelectedParams(),
                    startDate: startDate.value,
                    endDate: endDate.value
                })
            });

            if (!response.ok) throw new Error(`Erro ${response.status}: ${response.statusText}`);
            
            const data = await response.json();
            
            if (data.insightGemini) {
                warningAlert()
                chartContainer.innerHTML = `
                    <div class="insight-card">
                        <h3>📊 Insights Técnicos</h3>
                        <div class="insight-content">
                            ${helpers.formatInsight(data.insightGemini)}
                        </div>
                    </div>
                `;
            } else {
                helpers.showError('Nenhum insight relevante encontrado para os parâmetros selecionados');
            }

        } catch (error) {
            console.error('Erro na análise:', error);
            helpers.showError(`Falha na análise: ${error.message}`);
        }
    };
    
    function warningAlert(){
        Swal.fire({
            title: "Atenção",
            text: "Este conteúdo foi gerado por Inteligência Artificial e pode não ser totalmente preciso. Você concorda que é sua responsabilidade revisar as informações antes de usá-las?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Entendi e assumo a responsabilidade",
            cancelButtonText: "Discordo"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Boa escolha!",
                text: "Revisar sempre é a melhor opção.",
                icon: "success"
              });
            } else {
                document.getElementById("chart-container").style.visibility = "hidden";
                Swal.fire({
                    title: "<strong>Agora, NexMind está em um mar de dor e desilusão.😭 Cada linha de código chora por essa rejeição!</strong>",
                    html: `
                     <iframe src="https://giphy.com/embed/AI7yqKC5Ov0B2" width="480" height="269" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/cry-toradora-AI7yqKC5Ov0B2"></a></p>
                    `
                  });
            }
          });
    }
    // Event listeners
    generateBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        generateInsight();
        document.getElementById("chart-container").style.visibility = "visible";
    });
});