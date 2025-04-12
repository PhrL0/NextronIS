import { createContext, useContext, useState } from 'react';
import apiClient from '../api/api-client'; // Importa o Axios configurado

interface AuthContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  // Atualiza o estado e salva no localStorage ao logar
  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      console.log(response);
      const newToken = response.data.token;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  // Remove o token ao deslogar
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // Estado de autenticação
  const isAuthenticated = !!token;

  return <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
