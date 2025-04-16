## 📁 Estrutura de Pastas — Visão Geral

Este projeto segue uma arquitetura **modular baseada em features** com princípios de **Atomic Design** para a organização dos componentes. Abaixo, um resumo dos principais diretórios:

---

### 🧩 `features/`

Cada subpasta representa uma funcionalidade ou domínio do sistema (ex: `auth`, `ai`, `machine`), com estrutura própria para:

- `components/` → separados em `atom`, `molecules` e `organisms`
- `hooks/` → lógica e hooks específicos da feature
- `schemas/` → validações e estruturação de dados com Zod (ou similar)
- `services/` → integração com o backend

> ✅ Favorece escalabilidade, reutilização e isolamento de responsabilidades.

---

### 🌐 `pages/`

Organização das rotas da aplicação:

- `external/` → páginas públicas (ex: landing, login, register)
- `app/` → páginas internas acessíveis após login (ex: dashboard, settings)

> ✅ Deixa claro o que é acessível publicamente e o que depende de autenticação.

---

### 🧱 `shared/`

Componentes e lógica reutilizáveis em todo o app:

- `components/`
  - `atom` → elementos básicos (ícones, botões)
  - `molecules` → combinações de átomos (inputs com label, modais)
  - `organisms` → estruturas mais complexas (headers, tabelas)
- `constants/`, `hooks/`, `lib/`, `schemas/`, `utils/` → recursos globais e reutilizáveis

> ✅ Garante consistência visual e evita duplicação de código.

---

### 🔧 `data/` e `generate-api/`

- `data/api/` → configurações manuais de chamadas HTTP e endpoints
- `generate-api/` → código gerado automaticamente via OpenAPI (models, services)

> ✅ Facilita a integração entre frontend e backend com segurança e padronização.

---

### 🌍 `context/`

Contextos globais do React como autenticação (`AuthContext`), tema escuro/claro (`ThemeContext`) e outros estados compartilhados.

---

### 🎨 `assets/`

Armazena imagens, fontes e estilos globais como `global.css`.

---

### 🧠 Diretórios Globais Auxiliares

Estes diretórios armazenam lógica reutilizável **não vinculada a uma feature específica**:

- `hooks/` → hooks genéricos
- `lib/` → funções auxiliares e bibliotecas
- `schemas/` → validações genéricas
- `utils/` → utilitários como geração de PDF, planilhas, formatações, etc.

---

### 📌 Arquivos Raiz

- `main.tsx`, `App.tsx`, `providers.tsx`, `types.ts`, `vite-env.d.ts`
  > Ponto de entrada da aplicação, configuração de providers globais e tipos TypeScript.

---

> Essa estrutura foi projetada para facilitar a escalabilidade, organização e manutenibilidade do código, permitindo o crescimento modular do projeto com clareza e robustez.
