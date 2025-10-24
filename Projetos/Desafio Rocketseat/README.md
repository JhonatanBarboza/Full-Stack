# 🚀 API de Gerenciamento de Tarefas - Desafio Rocketseat

## Fundamentos do Node.js

### Sobre o desafio

Nesse desafio você irá desenvolver uma API em Node.js para realizar o gerenciamento completo de tarefas (CRUD). As funcionalidades essenciais incluem a criação, listagem com filtros por título e descrição, atualização, remoção e a marcação de tarefas como concluídas. O principal diferencial do projeto é a implementação de uma rotina de importação de tarefas em massa a partir de um arquivo CSV, utilizando a biblioteca ⁠csv-parse.

Curso de NODE.JS da Rocketseat.

## ✅ Status do Projeto: IMPLEMENTADO

### 🛠️ Tecnologias Utilizadas
- **Node.js** (puro, sem frameworks)
- **csv-parse** (para importação de CSV)
- **HTTP nativo** do Node.js
- **ES Modules**

### 🚀 Como executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar o servidor:**
   ```bash
   npm start
   # ou para desenvolvimento:
   npm run dev
   ```

3. **Acessar:** `http://localhost:3333`

### 📋 Endpoints disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/tasks` | Listar tarefas (com filtro opcional) |
| POST | `/tasks` | Criar nova tarefa |
| PUT | `/tasks/:id` | Atualizar tarefa |
| DELETE | `/tasks/:id` | Deletar tarefa |
| PATCH | `/tasks/:id/complete` | Marcar/desmarcar como concluída |
| POST | `/tasks/import` | Importar tarefas do CSV |

### 📄 Exemplos de uso

Ver arquivo `INSTRUCTIONS.md` para exemplos detalhados com curl.

### 📁 Estrutura do projeto
```
├── server.js          # Servidor HTTP principal
├── database.js        # Banco de dados em memória
├── routes.js          # Definição das rotas
├── utils.js           # Funções utilitárias  
├── tasks.csv          # Arquivo de exemplo para importação
├── package.json       # Configurações do projeto
├── INSTRUCTIONS.md    # Instruções detalhadas
└── README.md          # Este arquivo
```

