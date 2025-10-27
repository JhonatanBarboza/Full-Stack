const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Simulando um banco de dados em memória
let todos = [
  {
    id: uuidv4(),
    title: 'Exemplo de tarefa',
    description: 'Esta é uma tarefa de exemplo para demonstrar o funcionamento do sistema',
    completed: false,
    createdAt: new Date().toISOString()
  }
];

// Rotas da API

// GET /api/todos - Buscar todas as tarefas
app.get('/api/todos', (req, res) => {
  try {
    res.json({
      success: true,
      data: todos,
      message: 'Tarefas recuperadas com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// POST /api/todos - Criar nova tarefa
app.post('/api/todos', (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Título da tarefa é obrigatório'
      });
    }

    const newTodo = {
      id: uuidv4(),
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: false,
      createdAt: new Date().toISOString()
    };

    todos.push(newTodo);

    res.status(201).json({
      success: true,
      data: newTodo,
      message: 'Tarefa criada com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// PUT /api/todos/:id - Atualizar tarefa
app.put('/api/todos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todoIndex = todos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Tarefa não encontrada'
      });
    }

    // Atualizar apenas os campos fornecidos
    if (title !== undefined) {
      todos[todoIndex].title = title.trim();
    }
    if (description !== undefined) {
      todos[todoIndex].description = description.trim();
    }
    if (completed !== undefined) {
      todos[todoIndex].completed = completed;
    }

    todos[todoIndex].updatedAt = new Date().toISOString();

    res.json({
      success: true,
      data: todos[todoIndex],
      message: 'Tarefa atualizada com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// DELETE /api/todos/:id - Deletar tarefa
app.delete('/api/todos/:id', (req, res) => {
  try {
    const { id } = req.params;

    const todoIndex = todos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Tarefa não encontrada'
      });
    }

    const deletedTodo = todos.splice(todoIndex, 1)[0];

    res.json({
      success: true,
      data: deletedTodo,
      message: 'Tarefa deletada com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
});

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando corretamente!',
    timestamp: new Date().toISOString()
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📝 API Todo List disponível em http://localhost:${PORT}/api`);
  console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
});