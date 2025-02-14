const API_BASE_URL = 'http://127.0.0.1:5000/';


const getHeaders = () => ({
  'Content-Type': 'application/json',
});


const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro na requisição');
  }
  return response.json();
};

//GET
export const fetchGeminiData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/getGemini`, {
      method: 'GET',
      headers: getHeaders()
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
};

//POST
export const sendChatMessage = async (message) => {
  try {
    const response = await fetch(`${API_BASE_URL}/postGemini`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        message,
        context: {
          timestamp: new Date().toISOString(),
          user_id: 'user-123'
        }
      })
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    throw error;
  }
};