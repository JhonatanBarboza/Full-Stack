# 📝 Todo List - Projeto Full Stack

Projeto didático de um Todo List completo, desenvolvido com **React + Vite** no frontend e **Node.js + Express** no backend, seguindo **arquitetura componentizada**.

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
- **Express.js** - Framework web minimalista
- **MongoDB** - Banco de dados NoSQL (via Docker)
- **Mongoose** - ODM para MongoDB com validações
- **CORS** - Middleware para permitir requisições cross-origin
- **dotenv** - Gerenciamento de variáveis de ambiente
- **Nodemon** - Hot reload para desenvolvimento

### Frontend
- **React 18** - Biblioteca para interfaces
- **Vite** - Build tool e dev server rápido
- **React Router DOM** - Roteamento SPA
- **CSS3** - Estilização moderna com gradientes e animações
- **Fetch API** - Requisições HTTP

### DevOps e Ferramentas
- **Docker** - Containerização do MongoDB
- **Shell Scripts** - Automação de inicialização

## 📂 Estrutura do Projeto

```
P02/
├── backend/                    # API Node.js + MongoDB
│   ├── config/
│   │   └── database.js         # Configuração MongoDB
│   ├── controllers/
│   │   └── todoController.js   # Lógica de negócio das tarefas
│   ├── middleware/
│   │   └── errorMiddleware.js  # Tratamento de erros
│   ├── models/
│   │   └── Todo.js             # Schema MongoDB (Mongoose)
│   ├── routes/
│   │   └── todos.js            # Rotas dos endpoints
│   ├── scripts/
│   │   └── seed.js             # Script para popular banco
│   ├── .env                    # Variáveis de ambiente
│   ├── .gitignore              # Arquivos ignorados pelo Git
│   ├── package.json            # Dependências backend
│   ├── server.js               # Servidor principal
│   └── README.md               # Documentação do backend
│
├── frontend/                        # Interface React
│   ├── src/
│   │   ├── components/              # Componentes reutilizáveis
│   │   │   ├── Navigation.jsx       # Barra de navegação
│   │   │   ├── TodoForm.jsx         # Formulário de tarefas
│   │   │   ├── TodoItem.jsx         # Item individual
│   │   │   ├── TodoList.jsx         # Lista de tarefas
│   │   │   └── ErrorMessage.jsx     # Componente de erro
│   │   ├── pages/                   # Páginas da aplicação
│   │   │   ├── TodosPage.jsx        # Página principal
│   │   │   └── DashboardPage.jsx    # Dashboard analítico
│   │   ├── hooks/                   # Custom hooks
│   │   │   └── useTodos.js          # Hook de gerenciamento
│   │   ├── services/                # Camada de serviços
│   │   │   └── api.js               # Comunicação com API
│   │   ├── styles/                  # Estilos organizados
│   │   │   ├── components/          # Estilos dos componentes
│   │   │   │   ├── Navigation.css
│   │   │   │   ├── TodoForm.css
│   │   │   │   ├── TodoItem.css
│   │   │   │   ├── TodoList.css
│   │   │   │   └── ErrorMessage.css
│   │   │   ├── pages/              # Estilos das páginas
│   │   │   │   ├── TodosPage.css
│   │   │   │   └── DashboardPage.css
│   │   │   ├── App.css             # Estilos principais
│   │   │   ├── globals.css         # Estilos globais
│   │   │   └── index.css           # Estilos base
│   │   ├── App.jsx                 # Roteamento principal
│   │   └── main.jsx                # Ponto de entrada
│   ├── package.json                # Dependências frontend
│   └── README.md                   # Documentação do frontend
│
├── start.sh                        # Script para iniciar tudo automaticamente
├── MONGODB_SETUP.md                # Guia de configuração MongoDB
└── README.md                       # Este arquivo (documentação principal)
```

### 📋 **Arquivos Principais Explicados:**

#### 🔧 **Backend (Node.js + MongoDB):**
- **`server.js`** - Servidor Express principal com roteamento
- **`models/Todo.js`** - Schema Mongoose com validações e transformações
- **`controllers/todoController.js`** - Lógica de negócio e operações CRUD
- **`routes/todos.js`** - Definição de endpoints da API
- **`config/database.js`** - Configuração e conexão com MongoDB
- **`middleware/errorMiddleware.js`** - Tratamento centralizado de erros
- **`scripts/seed.js`** - Popular banco com dados de exemplo
- **`.env`** - Variáveis de ambiente (MongoDB URI, porta, etc.)

#### ⚛️ **Frontend (React + Vite):**
- **`App.jsx`** - Componente raiz com React Router
- **`hooks/useTodos.js`** - Hook customizado para gerenciar estado global
- **`services/api.js`** - Camada de abstração para comunicação com backend
- **`pages/`** - Componentes de página (TodosPage, DashboardPage)
- **`components/`** - Componentes reutilizáveis (Navigation, TodoForm, etc.)
- **`styles/`** - CSS organizado por contexto (components, pages, globals)

#### 🚀 **Scripts e Configuração:**
- **`start.sh`** - Inicia MongoDB, backend e frontend automaticamente
- **`MONGODB_SETUP.md`** - Guia completo de configuração e troubleshooting

## � Pré-requisitos

### 🔧 **Software Necessário:**

#### 1. **Node.js (versão 16 ou superior)**
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### 2. **Docker (para MongoDB)**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER

# Ou instalar via Snap
sudo snap install docker
```

### 📦 **Dependências do Projeto:**

#### Backend:
```bash
cd backend
npm install
# Instala: express, mongoose, cors, dotenv, nodemon
```

#### Frontend:
```bash
cd frontend
npm install  
# Instala: react, vite, react-router-dom
```

## �🚀 Como Executar

### Método 1: Script Automático (Recomendado)
```bash
# Tornar o script executável
chmod +x start.sh

# Executar tudo automaticamente
./start.sh
```

O script automaticamente:
- ✅ Verifica e inicia MongoDB (Docker)
- ✅ Inicia o backend na porta 3001
- ✅ Inicia o frontend na porta 5173
- ✅ Mostra todas as URLs disponíveis

### Método 2: Manual

#### 1. MongoDB (escolha uma opção)
```bash
# Opção A: Docker (Recomendado)
sudo docker run -d --name mongodb -p 27017:27017 mongo:latest

# Opção B: Verificar se já está rodando
sudo docker ps | grep mongo
```

#### 2. Backend (Terminal 1)
```bash
cd backend
npm install
npm run seed    # Opcional: popular com dados de exemplo
npm run dev
```

#### 3. Frontend (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```

## �📋 Funcionalidades

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
| GET | `/api/health` | Status da API e MongoDB |
| GET | `/api/todos` | Buscar todas as tarefas |
| GET | `/api/todos/stats` | **Estatísticas das tarefas** (NOVO!) |
| POST | `/api/todos` | Criar nova tarefa |
| PUT | `/api/todos/:id` | Atualizar tarefa |
| DELETE | `/api/todos/:id` | Deletar tarefa |