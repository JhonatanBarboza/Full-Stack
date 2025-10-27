# Todo List - Backend

Backend simples para aplicação de Todo List usando Node.js e Express.

## 🚀 Como executar

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor em modo de desenvolvimento:
```bash
npm run dev
```

3. O servidor estará rodando em: `http://localhost:3001`

## 📋 Endpoints da API

### GET /api/health
Verifica se a API está funcionando.

### GET /api/todos
Retorna todas as tarefas.

### POST /api/todos
Cria uma nova tarefa.
```json
{
  "title": "Minha nova tarefa"
}
```

### PUT /api/todos/:id
Atualiza uma tarefa existente.
```json
{
  "title": "Tarefa atualizada",
  "completed": true
}
```

### DELETE /api/todos/:id
Remove uma tarefa.

## 🛠️ Tecnologias utilizadas

- Node.js
- Express.js
- CORS
- UUID (para geração de IDs únicos)

## 📁 Estrutura do projeto

```
backend/
├── package.json
├── server.js
└── README.md
```