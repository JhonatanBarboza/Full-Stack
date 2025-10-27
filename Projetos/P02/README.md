# 📝 Todo List - Projeto Full Stack

Projeto didático de um sistema de gerenciamento de tarefas (Todo List) completo, desenvolvido com **React + Vite** no frontend e **Node.js + Express** no backend.

## 🎯 Objetivo

Este projeto serve como exemplo prático de implementação de uma aplicação Full Stack simples e didática, demonstrando:

- Comunicação entre frontend e backend
- CRUD completo (Create, Read, Update, Delete)
- API RESTful
- Interface responsiva e moderna
- Tratamento de erros
- Boas práticas de desenvolvimento

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **CORS** - Middleware para permitir requisições cross-origin
- **UUID** - Geração de IDs únicos
- **Nodemon** - Hot reload para desenvolvimento

### Frontend
- **React 18** - Biblioteca para interfaces
- **Vite** - Build tool e dev server
- **CSS3** - Estilização com gradientes e animações
- **Fetch API** - Requisições HTTP

## 📂 Estrutura do Projeto

```
P02/
├── backend/                 # API Node.js
│   ├── package.json
│   ├── server.js           # Servidor principal
│   └── README.md
│
├── frontend/               # Interface React
│   ├── src/
│   │   ├── App.jsx        # Componente principal
│   │   ├── App.css        # Estilos da aplicação
│   │   ├── index.css      # Estilos globais
│   │   └── main.jsx       # Ponto de entrada
│   ├── package.json
│   └── README.md
│
└── README.md              # Este arquivo
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

### ✅ Operações CRUD
- **Create**: Adicionar novas tarefas com título e descrição
- **Read**: Listar todas as tarefas com seus detalhes
- **Update**: Marcar como concluída/pendente e editar conteúdo
- **Delete**: Remover tarefas

### ✨ Interface
- Design moderno com tons de branco, cinza e azul
- Caixas de seleção customizadas e elegantes
- Campo de título e descrição para tarefas
- Animações suaves de interação
- Layout responsivo para mobile
- Estados de loading e erro
- Contador de tarefas concluídas
- Feedback visual para ações

## 🔧 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/health` | Status da API |
| GET | `/api/todos` | Buscar todas as tarefas |
| POST | `/api/todos` | Criar nova tarefa |
| PUT | `/api/todos/:id` | Atualizar tarefa |
| DELETE | `/api/todos/:id` | Deletar tarefa |

## 💡 Conceitos Demonstrados

### Backend
- Estruturação de API RESTful
- Middlewares (CORS, JSON parser)
- Tratamento de erros
- Validação de dados (título obrigatório, descrição opcional)
- Resposta padronizada da API
- Suporte a título e descrição nas tarefas

### Frontend
- Hooks do React (useState, useEffect)
- Requisições assíncronas
- Gerenciamento de estado
- Componentização
- CSS responsivo com design moderno
- Tratamento de erros na UI
- Formulário com múltiplos campos
- Caixas de seleção customizadas

## 🎨 Screenshots

A aplicação possui uma interface moderna e intuitiva:
- Header com título e descrição
- Formulário para adicionar tarefas
- Lista de tarefas com ações
- Contador de tarefas concluídas
- Estados de loading e erro
- Design responsivo

## 🔮 Possíveis Melhorias

- [ ] Persistência em banco de dados
- [ ] Autenticação de usuários
- [ ] Edição inline de tarefas
- [ ] Filtros (todas, pendentes, concluídas)
- [ ] Drag & drop para reordenar
- [ ] Categorias de tarefas
- [ ] Data de vencimento
- [ ] Modo escuro/claro

## 📝 Licença

Este projeto é livre para uso educacional e didático.

---

**Desenvolvido como exemplo de implementação Full Stack simples e didática** 🚀