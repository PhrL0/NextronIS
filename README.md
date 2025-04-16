## Documentação Detalhada dos Principais Diretórios

- ### Assets/

Armazena imagens, fontes e estilos que definem a identidade visual do app.

Exemplo: global.css é carregado em todo o projeto.

- ### context/

Contém os contextos do React que fornecem dados globais, como o estado de autenticação via AuthContext.tsx.

- ### data/

Reúne a configuração de comunicação com a API, centralizando o cliente HTTP e os endpoints, facilitando a manutenção.

- ### generate-api/

Código gerado automaticamente (ex.: por OpenAPI) com APIs e modelos, garantindo consistência entre frontend e backend.

- ### hooks/

Hooks genéricos e reutilizáveis que não dependem de uma feature específica.

- ### lib/

Funções auxiliares e bibliotecas internas que podem ser utilizadas em qualquer lugar do aplicativo.

- ### schemas/

Define schemas para validações e estruturas de dados usados no projeto (ex.: schema de usuário).

- ### shared/

Componentes, hooks, utils e constantes que são comuns a diversas partes do app, organizados seguindo o Atomic Design:

atoms: Elementos básicos como ícones, avatars, etc.

molecules: Combinações de átomos para componentes menores, como modais.

organisms: Componentes mais complexos, como header e footer.

Essa pasta garante consistência visual e evita duplicação de código.

- ### features/

Cada subpasta representa uma funcionalidade ou domínio específico da parte interna do app (após autenticação).

Dentro de cada feature (ex.: auth, dashboard, machines) os arquivos são organizados segundo Atomic Design para os componentes e também possuem:

hooks: Custom hooks e lógica específica da feature.

pages: Páginas internas que pertencem à feature (por exemplo, o perfil do usuário em auth ou a listagem de máquinas).

services: Funções para comunicação com o backend, isolando a lógica de negócio.

O uso de um "slice" (ex.: authSlice.ts) ajuda a centralizar o gerenciamento de estado.

- ### pages/

external/: Contém as páginas públicas – aquelas acessadas sem autenticação (ex.: landing, login, register, error).

app/: Armazena as páginas que compõem a aplicação interna, disponíveis após o login (ex.: HomePage, ai-page, settings-page e as páginas específicas de módulos, como as de máquinas).

Essa divisão facilita a navegação e o gerenciamento das rotas, deixando claro o que é acessível publicamente e o que depende do estado autenticado.

- ### utils/

Reúne funções utilitárias que auxiliam em tarefas comuns, como a geração de PDFs, Excel ou validação de dados.

Arquivos Raiz (App.tsx, main.tsx, providers.tsx, types.ts, vite-env.d.ts):

São os pontos de entrada e configuração global do app, responsáveis por iniciar o React, aplicar os providers (como contextos e temas) e definir os tipos globais.
