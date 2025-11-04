# 📝 Todo List - Backend

Backend para aplicação de Todo List usando **Node.js**, **Express** e **MongoDB**.

## 📁 Estrutura do Projeto

```
backend/
├── config/
│   └── database.js         # Configuração do MongoDB
├── controllers/
│   └── todoController.js   # Lógica de negócio das tarefas
├── middleware/
│   └── errorMiddleware.js  # Middleware de tratamento de erros
├── models/
│   └── Todo.js             # Schema/Model do MongoDB
├── routes/
│   └── todos.js            # Rotas dos endpoints
├── scripts/
│   └── seed.js             # Script para popular banco
├── .env                    # Variáveis de ambiente
├── .gitignore              # Arquivos ignorados pelo Git
├── package.json            # Dependências e scripts
├── server.js               # Arquivo principal da aplicação
└── README.md               # Este arquivo
```

## 🗂️ Descrição dos Diretórios Principais

Este projeto segue uma estrutura comum em aplicações **Node.js**, onde cada pasta tem uma função específica.
Abaixo, está uma explicação simples de cada parte para te ajudar a entender como tudo se conecta.

### **config/**

Guarda as **configurações principais** do projeto — por exemplo, o código que faz a **conexão com o banco de dados** (como o MongoDB).
Pense nessa pasta como o lugar onde o servidor “descobre” **como** e **onde** ele deve se conectar.

### **controllers/**

Aqui ficam as **regras do que o servidor deve fazer** quando alguém faz uma requisição.
Por exemplo: se o usuário pedir para criar uma nova tarefa, o *controller* recebe essa solicitação, conversa com o banco de dados e devolve uma resposta.
É como o “cérebro” do sistema.

### **middleware/**

Os *middlewares* são **funções intermediárias** que acontecem **entre** a requisição do usuário e a resposta do servidor.
Eles podem:

* verificar se o usuário está logado,
* tratar erros,
* ou registrar informações sobre cada acesso.

Pense neles como **filtros** que cuidam de tarefas antes da resposta final.

### **models/**

Aqui ficam os **modelos de dados** (também chamados de *schemas*).
Eles definem **como as informações são guardadas** no banco de dados — por exemplo:

“Uma tarefa tem um título, uma data e um status (feita ou não feita).”

Esses modelos ajudam o MongoDB a entender o formato correto dos dados.

### **routes/**

As rotas dizem **quais caminhos o usuário pode acessar** e **o que acontece em cada um**.
Por exemplo:

* `GET /todos` → listar tarefas
* `POST /todos` → criar uma tarefa
* `DELETE /todos/:id` → apagar uma tarefa

As rotas são como **placas de trânsito** que indicam o caminho que cada requisição deve seguir.

### **scripts/**

Essa pasta guarda **pequenos programas auxiliares** — como os que preenchem o banco de dados automaticamente, limpam dados ou executam testes simples.

### **.env**

Arquivo que guarda **informações sensíveis** do projeto, como a senha do banco de dados, a porta do servidor ou chaves secretas.
Esses dados **não devem ser enviados para o GitHub**, por segurança.

### **.gitignore**

Lista os arquivos e pastas que o Git deve **ignorar** (como `node_modules` ou `.env`).
Isso evita enviar arquivos desnecessários ou confidenciais para o repositório.


### **package.json**

É o **coração do projeto Node.js**.
Guarda:

* as **dependências** (bibliotecas que o projeto usa),
* os **scripts** para rodar o servidor,
* e o nome do projeto.

Quando alguém baixa teu projeto, o `package.json` diz tudo o que é necessário para rodá-lo.

### **server.js**

É o **ponto de partida** da aplicação — o primeiro arquivo que o Node.js executa.
Ele faz três coisas principais:

1. **Carrega as configurações** (como o banco de dados).
2. **Cria o servidor** que escuta as requisições.
3. **Liga as rotas** que dizem o que fazer em cada requisição.

Pense nele como o **botão “Ligar Servidor”**.


## ⚙️ Como o Backend Funciona — Passo a Passo

Imagina que o **backend** é o **cérebro** de um sistema.
Ele é responsável por receber pedidos (requisições), processar informações e devolver respostas.
Vamos ver o caminho completo que uma requisição percorre dentro do projeto 👇

---

### 🧭 1. O usuário faz um pedido

Tudo começa quando o **usuário** faz algo no **frontend**, como clicar em um botão “Adicionar tarefa”.
Isso envia uma **requisição HTTP** para o backend, por exemplo:

```
POST /todos
```

Essa requisição chega até o **servidor** (arquivo `server.js`).

---

### 💻 2. O servidor recebe a requisição

O `server.js` é o **ponto de entrada** da aplicação.
Ele é o primeiro a “ouvir” as requisições e direcioná-las para o lugar certo.

Ele faz isso com a ajuda das **rotas**.

```js
// Exemplo simples
app.post('/todos', criarTarefa);
```

Aqui, o servidor diz:

> “Quando alguém enviar um pedido para `/todos`, execute a função `criarTarefa`.”

---

### 🚏 3. A rota leva até o controller

A **rota** é como uma **placa de trânsito** que indica o caminho.
Ela diz qual função deve ser chamada quando chega um tipo específico de requisição (GET, POST, PUT, DELETE).

Cada rota chama um **controller** correspondente.

```js
// routes/todoRoutes.js
router.post('/todos', todoController.criarTarefa);
```

---

### 🧠 4. O controller processa o pedido

O **controller** é o **cérebro** da operação.
Ele decide o que fazer com o pedido do usuário.
Por exemplo:

* pegar os dados que vieram do frontend,
* salvar no banco de dados,
* ou buscar informações e devolvê-las.

```js
// controllers/todoController.js
import Todo from '../models/Todo.js';

export const criarTarefa = async (req, res) => {
  const novaTarefa = new Todo(req.body);
  const tarefaSalva = await novaTarefa.save();
  res.status(201).json(tarefaSalva);
};
```

---

### 🗃️ 5. O controller fala com o model

Os **models** são os responsáveis por conversar com o **banco de dados (MongoDB)**.
Eles dizem **como os dados são armazenados** e oferecem funções prontas para criar, ler, atualizar ou deletar informações (as operações **CRUD**).

```js
// models/Todo.js
import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  texto: String,
  completo: Boolean
});

export default mongoose.model('Todo', TodoSchema);
```

---

### 🔄 6. O model fala com o banco de dados

O model usa o **Mongoose** (uma biblioteca do Node.js) para mandar comandos para o **MongoDB Atlas**.
Ele cria novas tarefas, lê informações ou atualiza registros — tudo de forma automática e segura.

---

### 🧩 7. O middleware pode agir no meio do caminho

Antes da resposta voltar, os **middlewares** entram em ação se necessário.
Eles podem, por exemplo:

* verificar se o usuário está logado,
* formatar os dados,
* ou registrar logs de acesso.

São como “guardas” que verificam se tudo está certo antes de continuar.

---

### 📤 8. O servidor envia a resposta

Depois que o controller termina, o servidor envia uma **resposta** para o frontend.

Por exemplo:

```json
{
  "mensagem": "Tarefa criada com sucesso!",
  "id": "672f2b6c9b4c27a7d4e4d9aa"
}
```

O frontend então mostra isso na tela — e o usuário vê o resultado.

---

## 🔁 Resumo visual do fluxo

```
Usuário → Rota → Controller → Model → Banco de Dados
     ↑                                  ↓
     └────────────── Resposta ───────────┘
```

Ou, em outras palavras:

> O usuário pede → o servidor entende → o controller processa → o model salva/busca → o servidor responde.



## 🚀 Como executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- MongoDB instalado localmente OU MongoDB Atlas

### Instalação e Execução

1. **Instale as dependências**:
```bash
npm install
```

2. **Configure as variáveis de ambiente**:
   - Copie o arquivo `.env` e ajuste as configurações conforme necessário
   - Para MongoDB local: `mongodb://localhost:27017/todolist`
   - Para MongoDB Atlas: Configure sua string de conexão

3. **Popule o banco com dados de exemplo** (opcional):
```bash
npm run seed
```

4. **Execute o servidor**:
```bash
# Desenvolvimento (com hot reload)
npm run dev

# Produção
npm start
```

5. **O servidor estará rodando em**: `http://localhost:3001`



## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **CORS** - Middleware para Cross-Origin Resource Sharing
- **dotenv** - Gerenciamento de variáveis de ambiente
- **Nodemon** - Hot reload para desenvolvimento


## 🔧 Configuração

### Variáveis de Ambiente (.env)
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/todolist
NODE_ENV=development
```

### Configuração para MongoDB Atlas
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todolist?retryWrites=true&w=majority
```

## 📊 Schema do Banco de Dados

### Modelo Todo
```javascript
{
  title: String (obrigatório, máx 200 chars),
  description: String (opcional, máx 1000 chars),
  completed: Boolean (padrão: false),
  createdAt: Date (automático),
  updatedAt: Date (atualizado automaticamente)
}
```

---

**Desenvolvido para demonstrar integração Node.js + MongoDB**