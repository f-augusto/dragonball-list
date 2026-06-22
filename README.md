# Shopping List App

App simples de lista de compras com backend Node.js, frontend React/Vite e testes com Jest e Playwright.

## Pipeline de CI

Esta aplicação usa uma pipeline de CI com as seguintes caracteristicas:

- Objetivo: Execução de testes pré-deploy

- Execuções (GH Actions):
  - Executa a cada push na main
  - Executa semanalmente
  - Executa manualmente

- Atualizar variáveis de ambiente:
  - Cria um .env ficticio para mostrar o uso de Secrets
  - Para aplicações é importante deixar senhas e tokens fora do código

- Inspeção de Código (Lint + Prettier):
  - Realiza análise estática do código buscando erros de padrões
  - Auxilia a manter as convenções do projeto, padronizar e melhorar a qualidade do código

- Testes unitários (Jest)
  - Roda primeiro para ter feedback rápido
  - Utiliza estratégia de matriz para evitar duplicidade de passos e melhorar paralelismo
  - Publica os resultados utilizando uma Action para exibir detalhes do resultado
  - Gera artefatos do coverage

- Teste E2E (Playwright)
  - Executa após os unitários
  - Inicia os servidores de frontend e backend como pré-requisito dos testes
  - Publica os resultados jUnit
  - Salva o .html gerado nos artefatos

- Deploy
  - Após todos os testes finalizarem é realizado o deploy (ficticio)

- Evoluções
  - Quando a suite E2E aumentar o ideal é ter tag de @smoke para não travar o deploy

## Requisitos

- Node.js 18+ ou compatível
- npm 9+ ou compatível

## Instalação

No diretório raiz do projeto:

```bash
cd e:\github\app
npm install
```

Instale o browser do Playwright:

```bash
cd e:\github\app\e2e
npx playwright install chromium
```

## Arquitetura de pastas

```
app/
├── backend/                    # Servidor Node.js com API REST
│   ├── src/
│   │   └── index.js           # Express server com endpoints /items
│   ├── tests/
│   │   └── app.test.js        # Testes de integração (supertest)
│   ├── package.json           # Dependências: express, jest, supertest, jest-junit
│   └── test-results/          # Relatórios JUnit (backend-junit.xml)
│
├── frontend/                   # Aplicação React com Vite
│   ├── src/
│   │   ├── App.jsx            # Componente principal com lista de compras
│   │   ├── App.test.jsx       # Testes unitários (Jest + jsdom)
│   │   ├── styles.css         # Tema
│   │   └── main.jsx           # Entry point do React
│   ├── index.html             # HTML principal
│   ├── vite.config.js         # Config Vite (porta 3000)
│   ├── jest.config.js         # Config Jest (jsdom)
│   ├── package.json           # Dependências: react, vite, jest, jest-junit
│   └── test-results/          # Relatórios JUnit (frontend-junit.xml)
│
├── e2e/                        # Testes end-to-end com Playwright
│   ├── tests/
│   │   └── shopping-list.spec.js  # Testes E2E (fluxo completo)
│   ├── playwright.config.js       # Config Playwright (Chrome, xUnit)
│   ├── package.json               # Dependências: @playwright/test
│   └── test-results/              # Relatórios
│
├── package.json                # Scripts e workspaces npm
├── README.md                   # Este arquivo
└── .gitignore                  # Arquivos ignorados no git

```

### Fluxo de comunicação

```
┌─────────────────┐         fetch API          ┌──────────────────┐
│   Frontend      │ ───────────────────────→   │     Backend      │
│   :3000         │ ←───────────────────────   │     :4000        │
│   React/Vite    │       JSON response        │   Express API    │
└─────────────────┘                            └──────────────────┘
        ↑
        │ testa UI
        │ e2e tests
        │
┌──────────────────┐
│   E2E Tests      │
│   Playwright     │
└──────────────────┘
```

## Executar

0. Crie o arquivo .env seguindo o .env.example utilizando o personagem correto

1. Inicie o backend:

```bash
npm run dev:backend
```

2. Em outro terminal, inicie o frontend:

```bash
npm run dev:frontend
```

3. Abra o navegador em:

```text
http://localhost:3000/
```

## Testes

- Testes do backend:

```bash
npm run test:backend
```

- Testes do frontend:

```bash
npm run test:frontend
```

- Testes E2E com Playwright (precisam da aplicação rodando):

```bash
npm run test:e2e
```

## Relatórios E2E

Após rodar os testes E2E, o Playwright gera:

- relatório HTML em `./e2e/test-report`
- relatório JUnit em `./e2e/test-results/results.xml`
