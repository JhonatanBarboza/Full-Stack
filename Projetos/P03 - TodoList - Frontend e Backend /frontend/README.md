# 📝 Todo List - Frontend

Frontend da aplicação Todo List criado com **React + Vite** seguindo arquitetura componentizada e as melhores práticas de desenvolvimento.

## 🚀 Como executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- Backend da aplicação rodando na porta 3001

### Passos para execução

1. **Clone o repositório** (se ainda não tiver feito):
```bash
git clone <url-do-repositorio>
cd Full-Stack/Projetos/P02/frontend
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Execute o script**:
```bash
./start.sh
```

3. **Ou para executar na manualmente, primeiro rode o backend**:
```bash
# Em outro terminal, na pasta backend
cd ../backend
node server.js
```

4. **Depois execute o servidor de desenvolvimento**:
```bash
npm run dev
```

5. **Acesse a aplicação**: `http://localhost:5173`

## ✨ Funcionalidades

### 📋 Lista de Tarefas
- ✅ Criar tarefas com **título e descrição**
- ✅ Marcar/desmarcar como concluída
- ✅ Editar tarefas existentes
- ✅ Deletar tarefas
- ✅ Visualizar data de criação
- ✅ Checkboxes personalizadas
- ✅ Animações e transições suaves

### 📊 Dashboard
- ✅ **Estatísticas visuais**: Total, Concluídas, Pendentes
- ✅ **Taxa de conclusão** em porcentagem
- ✅ **Barra de progresso** visual
- ✅ **Tarefas recentes** (últimas 5)
- ✅ **Resumo de atividade** diária
- ✅ **Indicador de produtividade**

### 🎯 Recursos Técnicos
- ✅ **Navegação SPA** com React Router
- ✅ **Estados de loading** e tratamento de erros
- ✅ **API service layer** para comunicação com backend
- ✅ **Custom hooks** para gerenciamento de estado
- ✅ **Interface responsiva** para todos os dispositivos

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca principal
- **Vite** - Build tool e desenvolvimento
- **React Router DOM** - Navegação entre páginas
- **CSS3** - Estilização com gradientes e animações
- **Fetch API** - Comunicação com backend

## 📁 Estrutura do Projeto

```
frontend/
├── public/                    # Arquivos públicos
├── src/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── Navigation.jsx    # Barra de navegação
│   │   ├── TodoForm.jsx      # Formulário de nova tarefa
│   │   ├── TodoItem.jsx      # Item individual da tarefa
│   │   ├── TodoList.jsx      # Lista de tarefas
│   │   └── ErrorMessage.jsx  # Componente de erro
│   ├── pages/               # Páginas da aplicação
│   │   ├── TodosPage.jsx    # Página principal (lista)
│   │   └── DashboardPage.jsx # Página de estatísticas
│   ├── hooks/               # Custom hooks
│   │   └── useTodos.js      # Hook para gerenciar todos
│   ├── services/            # Camada de serviços
│   │   └── api.js           # Comunicação com API
│   ├── styles/              # Estilos organizados
│   │   ├── components/      # Estilos dos componentes
│   │   ├── pages/           # Estilos das páginas
│   │   ├── App.css          # Estilos principais
│   │   ├── globals.css      # Estilos globais
│   │   └── index.css        # Estilos base
│   ├── App.jsx              # Componente raiz com roteamento
│   └── main.jsx             # Ponto de entrada
├── package.json
└── README.md
```

## 🎨 Design System

### 🎯 Componentes Principais

#### Navigation
- Barra superior com navegação entre páginas
- Estado ativo visual
- Design responsivo

#### TodoForm
- Formulário com título e descrição
- Validação de campos
- Estados de loading

#### TodoItem
- Checkbox personalizada
- Texto riscado para concluídas
- Botão de deletar com confirmação visual
- Data de criação formatada

#### Dashboard
- Cards de estatísticas com ícones
- Barra de progresso animada
- Lista de tarefas recentes
- Indicadores de produtividade

## 🔧 Arquitetura

### Custom Hooks
- **useTodos**: Gerencia estado global das tarefas
- Lógica centralizada para CRUD operations
- Loading states e error handling

### Service Layer
- **api.js**: Abstração da comunicação HTTP
- Endpoints organizados e reutilizáveis
- Tratamento de erros centralizado

### Routing
- **React Router**: Navegação SPA
- Rotas organizadas no App.jsx
- Navegação declarativa

## 📱 Responsividade

- **Desktop**: Layout em duas colunas, espacçamento otimizado
- **Tablet**: Ajustes de grid e espaçamento
- **Mobile**: Layout em coluna única, botões touch-friendly

## 🚀 Scripts Disponíveis

```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Build para produção
npm run preview    # Preview do build
npm run lint       # Linting do código
```

## 🔗 Integração com Backend

A aplicação se comunica com uma API REST em `http://localhost:3001` com os seguintes endpoints:

- `GET /todos` - Listar todas as tarefas
- `POST /todos` - Criar nova tarefa
- `PUT /todos/:id` - Atualizar tarefa
- `DELETE /todos/:id` - Deletar tarefa

