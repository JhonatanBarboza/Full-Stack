# 📝 Todo List - Backend

Backend robusto para aplicação de Todo List usando **Node.js**, **Express** e **MongoDB** com arquitetura modular e profissional.

## 🌟 Características

- **MongoDB** para persistência de dados
- **Mongoose** para modelagem e validação
- **Arquitetura MVC** organizada
- **Middleware personalizado** para tratamento de erros
- **Validação robusta** de dados
- **Logging** para desenvolvimento
- **Environment variables** para configuração
- **Graceful shutdown** para produção

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

## 📋 Endpoints da API

### Health Check
```http
GET /api/health
```
Verifica se a API e MongoDB estão funcionando.

### Tarefas

#### Listar todas as tarefas
```http
GET /api/todos
```

#### Obter estatísticas
```http
GET /api/todos/stats
```
Retorna estatísticas como total, concluídas, pendentes, etc.

#### Criar nova tarefa
```http
POST /api/todos
Content-Type: application/json

{
  "title": "Minha nova tarefa",
  "description": "Descrição opcional da tarefa"
}
```

#### Atualizar tarefa
```http
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Tarefa atualizada",
  "description": "Nova descrição",
  "completed": true
}
```

#### Deletar tarefa
```http
DELETE /api/todos/:id
```

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **CORS** - Middleware para Cross-Origin Resource Sharing
- **dotenv** - Gerenciamento de variáveis de ambiente
- **Nodemon** - Hot reload para desenvolvimento

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
│   └── Todo.js            # Schema/Model do MongoDB
├── routes/
│   └── todos.js           # Rotas dos endpoints
├── scripts/
│   └── seed.js            # Script para popular banco
├── .env                   # Variáveis de ambiente
├── .gitignore            # Arquivos ignorados pelo Git
├── package.json          # Dependências e scripts
├── server.js             # Arquivo principal da aplicação
└── README.md             # Este arquivo
```

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

## 🛡️ Validações e Tratamento de Erros

- **Validação de entrada**: Título obrigatório, limites de caracteres
- **Validação de ObjectId**: IDs do MongoDB válidos
- **Middleware de erro**: Tratamento centralizado de erros
- **Logging**: Logs detalhados para debugging
- **Graceful shutdown**: Encerramento limpo da aplicação

## 📈 Funcionalidades Avançadas

### Estatísticas
- Total de tarefas
- Tarefas concluídas/pendentes
- Taxa de conclusão
- Tarefas criadas hoje
- Tarefas concluídas hoje

### Middleware Personalizado
- Tratamento de erros MongoDB/Mongoose
- Logging de requisições
- Validação de dados
- CORS configurado

## 🔮 Próximos Passos

### Funcionalidades
- [ ] Autenticação JWT
- [ ] Paginação para listas grandes
- [ ] Filtros e busca avançada
- [ ] Categorias de tarefas
- [ ] Data de vencimento
- [ ] Upload de arquivos

### Melhorias Técnicas
- [ ] Testes unitários (Jest)
- [ ] Documentação da API (Swagger)
- [ ] Rate limiting
- [ ] Caching (Redis)
- [ ] Monitoramento (Health checks)
- [ ] Docker containerization

## 🧪 Scripts Disponíveis

```bash
npm start      # Executa em produção
npm run dev    # Executa em desenvolvimento (hot reload)
npm run seed   # Popula banco com dados de exemplo
```

## 📝 Exemplos de Uso

### Criar Tarefa
```bash
curl -X POST http://localhost:3001/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Estudar MongoDB", "description": "Aprender sobre NoSQL"}'
```

### Obter Estatísticas
```bash
curl http://localhost:3001/api/todos/stats
```

---

**Desenvolvido com 💙 para demonstrar integração Node.js + MongoDB**