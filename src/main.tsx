import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './global/app';
import './global/index.css';
import { Providers } from './global/providers';

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
