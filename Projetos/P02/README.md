# 📝 Todo List - Projeto Full Stack

Projeto didático de um sistema de gerenciamento de tarefas (Todo List) completo, desenvolvido com **React + Vite** no frontend e **Node.js + Express** no backend, seguindo **arquitetura componentizada** e as melhores práticas de desenvolvimento.

## 🎯 Objetivo

Este projeto serve como exemplo prático de implementação de uma aplicação Full Stack moderna e didática, demonstrando:

- **Arquitetura componentizada** com separação de responsabilidades
- **Múltiplas páginas** com navegação SPA
- **Dashboard analítico** com estatísticas e gráficos
- Comunicação entre frontend e backend
- CRUD completo (Create, Read, Update, Delete)
- API RESTful bem estruturada
- Interface responsiva e moderna
- Tratamento de erros e loading states
- **Organização de código** para projetos escaláveis

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **CORS** - Middleware para permitir requisições cross-origin
- **UUID** - Geração de IDs únicos
- **Nodemon** - Hot reload para desenvolvimento

### Frontend
- **React 18** - Biblioteca para interfaces
- **Vite** - Build tool e dev server rápido
- **React Router DOM** - Roteamento SPA
- **CSS3** - Estilização moderna com gradientes e animações
- **Fetch API** - Requisições HTTP

## 📂 Estrutura do Projeto

```
P02/
├── backend/                    # API Node.js
│   ├── package.json
│   ├── server.js              # Servidor principal
│   └── README.md
│
├── frontend/                      # Interface React
│   ├── src/
│   │   ├── components/            # Componentes reutilizáveis
│   │   │   ├── Navigation.jsx     # Barra de navegação
│   │   │   ├── TodoForm.jsx       # Formulário de tarefas
│   │   │   ├── TodoItem.jsx       # Item individual
│   │   │   ├── TodoList.jsx       # Lista de tarefas
│   │   │   └── ErrorMessage.jsx   # Componente de erro
│   │   ├── pages/                 # Páginas da aplicação
│   │   │   ├── TodosPage.jsx      # Página principal (Implementa com componentes reutilizáveis)
│   │   │   └── DashboardPage.jsx  # Dashboard analítico (Implementado em uma unica página)
│   │   ├── hooks/                 # Custom hooks
│   │   │   └── useTodos.js        # Hook de gerenciamento
│   │   ├── services/              # Camada de serviços
│   │   │   └── api.js             # Comunicação com API
│   │   ├── styles/                # Estilos organizados
│   │   │   ├── components/        # Estilos dos componentes
│   │   │   ├── pages/             # Estilos das páginas
│   │   │   └── globals.css        # Estilos globais
│   │   ├── App.jsx                # Roteamento principal
│   │   └── main.jsx               # Ponto de entrada
│   ├── package.json
│   └── README.md
│
└── README.md                  # Este arquivo
```

## 🚀 Como Executar

### 1. Backend (Terminal 1)
```bash
cd backend
npm install
npm run dev
```
O servidor estará rodando em: `http://localhost:3001`

### 2. Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```
A interface estará disponível em: `http://localhost:5173`

## 📋 Funcionalidades

### 📝 Lista de Tarefas (TodosPage)
- **Create**: Adicionar novas tarefas com título e descrição
- **Read**: Listar todas as tarefas com seus detalhes
- **Update**: Marcar como concluída/pendente e editar conteúdo
- **Delete**: Remover tarefas
- **Navigation**: Navegação fluida entre páginas

### 📊 Dashboard Analítico (DashboardPage)
- **Estatísticas visuais**: Total, Concluídas, Pendentes
- **Taxa de conclusão** em porcentagem
- **Barra de progresso** visual animada
- **Tarefas recentes** (últimas 5 criadas)
- **Resumo de atividade** diária
- **Indicador de produtividade** inteligente

## 🔧 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/health` | Status da API |
| GET | `/api/todos` | Buscar todas as tarefas |
| POST | `/api/todos` | Criar nova tarefa |
| PUT | `/api/todos/:id` | Atualizar tarefa |
| DELETE | `/api/todos/:id` | Deletar tarefa |
