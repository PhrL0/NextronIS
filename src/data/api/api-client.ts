import axios from 'axios';

// Cria a instância do Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepta requisições para adicionar o token JWT
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepta respostas para tratar erros (ex: token expirado)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.data.code == 'FST_JWT_NO_AUTHORIZATION_IN_HEADER') {
      console.warn('Token expirado. Redirecionando para login...');
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redireciona usuário
    }
    return Promise.reject(error);
  }
);

export default apiClient;
