import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Providers } from './providers';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Elemento raiz não encontrado!');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
