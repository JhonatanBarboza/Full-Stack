# 📝 Todo List - Frontend

Frontend da aplicação Todo List criado com **React + Vite** seguindo arquitetura componentizada e as melhores práticas de desenvolvimento.

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

## 🗂️ Descrição dos Diretórios Principais

Este projeto segue uma arquitetura componentizada típica do **React**, onde cada pasta tem uma responsabilidade específica.
Abaixo, está uma explicação simples de cada parte para te ajudar a entender como tudo se conecta no frontend.

### **components/**

Aqui ficam os **componentes reutilizáveis** da aplicação — pequenos pedaços de interface que podem ser usados em várias partes do projeto.
Cada componente faz uma coisa específica:

* **Navigation.jsx** - Barra de navegação entre páginas
* **TodoForm.jsx** - Formulário para criar novas tarefas
* **TodoItem.jsx** - Como cada tarefa individual aparece na tela
* **TodoList.jsx** - Lista que agrupa todas as tarefas
* **ErrorMessage.jsx** - Componente que mostra mensagens de erro de forma elegante

Pense nos componentes como **LEGO** — pequenas peças que você combina para construir a interface completa.

### **pages/**

As páginas são **componentes maiores** que representam as **telas principais** da aplicação.
Elas combinam vários componentes menores para formar uma página completa:

* **TodosPage.jsx** - Página principal onde você vê e gerencia suas tarefas
* **DashboardPage.jsx** - Página com estatísticas e resumo das tarefas

Cada página é como uma **tela** que o usuário pode navegar.

### **hooks/**

Os **custom hooks** são funções especiais do React que encapsulam **lógica reutilizável**.
Eles permitem compartilhar comportamentos entre componentes:

* **useTodos.js** - Gerencia todo o estado das tarefas (criar, editar, deletar, carregar)

Os hooks são como **assistentes inteligentes** que cuidam da lógica complexa, deixando os componentes mais simples.

### **services/**

A camada de serviços é responsável pela **comunicação externa** — principalmente com APIs e bancos de dados:

* **api.js** - Todas as funções que fazem requisições HTTP para o backend

É como um **mensageiro** que leva e traz informações entre o frontend e o backend.

### **styles/**

Organização dos estilos CSS de forma modular:

* **components/** - Estilos específicos de cada componente
* **pages/** - Estilos das páginas principais
* **App.css** - Estilos gerais da aplicação
* **globals.css** - Estilos globais (reset, variáveis, etc.)
* **index.css** - Estilos base do projeto

Essa organização facilita a manutenção e evita conflitos entre estilos.

### **App.jsx**

É o **componente raiz** da aplicação — o primeiro componente que é renderizado.
Ele configura:

* o **roteamento** (qual página mostrar baseado na URL)
* a **estrutura geral** da aplicação (navegação + conteúdo)
* os **estilos globais**

Pense nele como a **fundação** da casa — tudo é construído em cima dele.

### **main.jsx**

É o **ponto de entrada** de toda a aplicação React.
Ele faz três coisas principais:

1. **Conecta** o React com o HTML (arquivo `index.html`)
2. **Renderiza** o componente App na tela
3. **Configura** o modo de desenvolvimento do React

É como o **interruptor principal** que liga toda a aplicação.

## ⚙️ Como o Frontend Funciona — Passo a Passo

Vamos entender como o **frontend React** funciona, desde quando o usuário abre a página até quando ele vê o resultado na tela.

### 🔄 Eventos do usuário criam novo ciclo

Quando o usuário clica em "Adicionar tarefa":

1. O `TodoForm` chama a função `onSubmit` (que vem da página)
2. A página chama `addTodo` (que vem do hook)
3. O hook faz uma requisição POST para o backend
4. O backend responde com a nova tarefa
5. O hook atualiza o estado com a nova tarefa
6. O React re-renderiza tudo automaticamente
7. O usuário vê a nova tarefa na tela

E o ciclo recomeça! 🔄


## 🔁 Resumo visual do fluxo

```
Usuário interage → Evento → Hook → Service → API (Backend)
      ↑                                           ↓
   React re-renderiza ← Estado atualizado ← Resposta chega
```

Ou seja:

> O usuário age → o React detecta → o hook processa → o service comunica → o backend responde → o estado atualiza → a tela se atualiza automaticamente.

A **mágica do React** é que você só precisa se preocupar com o **estado** — a interface se atualiza sozinha sempre que o estado muda!

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

