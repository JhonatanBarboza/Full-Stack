# API de Gerenciamento de Tarefas - Instruções de Uso

## Como executar o projeto

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar o servidor:**
   ```bash
   npm start
   # ou para modo desenvolvimento com watch:
   npm run dev
   ```

3. **O servidor será iniciado em:** `http://localhost:3333`

## Endpoints da API

### 1. Listar tarefas
- **GET** `/tasks`
- **Query params:** `search` (opcional) - filtra por título ou descrição
- **Exemplo:** `GET /tasks?search=Node.js`

### 2. Criar tarefa
- **POST** `/tasks`
- **Body:**
  ```json
  {
    "title": "Minha tarefa",
    "description": "Descrição da tarefa"
  }
  ```

### 3. Atualizar tarefa
- **PUT** `/tasks/:id`
- **Body:**
  ```json
  {
    "title": "Título atualizado",
    "description": "Descrição atualizada"
  }
  ```

### 4. Deletar tarefa
- **DELETE** `/tasks/:id`

### 5. Marcar/desmarcar como concluída
- **PATCH** `/tasks/:id/complete`

### 6. Importar tarefas do CSV
- **POST** `/tasks/import`
- Importa tarefas do arquivo `tasks.csv`

## Testando com curl

```bash
# Listar tarefas
curl http://localhost:3333/tasks

# Criar tarefa
curl -X POST http://localhost:3333/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Estudar Node.js","description":"Aprender os fundamentos"}'

# Importar do CSV
curl -X POST http://localhost:3333/tasks/import

# Buscar tarefas
curl "http://localhost:3333/tasks?search=Node"

# Marcar como concluída (substitua ID_DA_TAREFA pelo ID real)
curl -X PATCH http://localhost:3333/tasks/ID_DA_TAREFA/complete

# Deletar tarefa
curl -X DELETE http://localhost:3333/tasks/ID_DA_TAREFA
```

## Estrutura do Projeto

- `server.js` - Servidor HTTP principal
- `database.js` - Banco de dados em memória
- `routes.js` - Definição das rotas da API
- `utils.js` - Funções utilitárias
- `tasks.csv` - Arquivo de exemplo para importação
- `package.json` - Configurações do projeto

## Funcionalidades Implementadas

✅ **CRUD completo de tarefas**
- Criar, listar, atualizar e deletar tarefas
- Cada tarefa tem: id, title, description, created_at, updated_at, completed_at

✅ **Filtros de busca**
- Busca por título e descrição

✅ **Marcar tarefas como concluídas**
- Toggle de status de conclusão

✅ **Importação em massa via CSV**
- Usando a biblioteca csv-parse
- Arquivo de exemplo incluído

✅ **API RESTful**
- Implementação com Node.js puro (sem frameworks)
- Responses em JSON
- Status codes apropriados