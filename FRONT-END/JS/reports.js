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

    // Event listeners
    generateBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        generateInsight();
    });
});