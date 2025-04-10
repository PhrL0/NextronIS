// src/types.ts

// Representa uma máquina na sua aplicação
export interface Machine {
  id: number; // ou string, se usar UUID
  name: string;
  status: string;
  temperature: number;
  vibration: number;
  usage: number;
}

// Representa o usuário autenticado
export interface User {
  username: string;
  // Adicione outras propriedades conforme necessário (ex.: email, roles, etc.)
}

// Define o tipo do contexto de autenticação
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

// Props para o componente de gráfico
export interface ChartComponentProps {
  machines: Machine[];
}

// Props para o componente de listagem de máquinas (CRUD)
export interface MachineListProps {
  machines: Machine[];
  setMachines: React.Dispatch<React.SetStateAction<Machine[]>>;
}

// Valores do formulário de login
export interface LoginFormValues {
  username: string;
  password: string;
}
