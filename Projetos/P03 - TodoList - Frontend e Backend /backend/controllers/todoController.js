const Todo = require('../models/Todo');
const mongoose = require('mongoose');

// Helper function para validar ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Helper function para resposta de erro
const sendErrorResponse = (res, statusCode, message, error = null) => {
  const response = {
    success: false,
    message
  };
  
  if (process.env.NODE_ENV === 'development' && error) {
    response.error = error.message;
  }
  
  return res.status(statusCode).json(response);
};

// Helper function para resposta de sucesso
const sendSuccessResponse = (res, statusCode, data, message) => {
  return res.status(statusCode).json({
    success: true,
    data,
    message
  });
};

// @desc    Buscar todas as tarefas
// @route   GET /api/todos
// @access  Public
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    
    sendSuccessResponse(res, 200, todos, `${todos.length} tarefa(s) encontrada(s)`);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    sendErrorResponse(res, 500, 'Erro interno do servidor ao buscar tarefas', error);
  }
};

// @desc    Criar nova tarefa
// @route   POST /api/todos
// @access  Public
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validação
    if (!title || title.trim() === '') {
      return sendErrorResponse(res, 400, 'Título da tarefa é obrigatório');
    }

    // Criar nova tarefa
    const newTodo = new Todo({
      title: title.trim(),
      description: description ? description.trim() : ''
    });

    const savedTodo = await newTodo.save();
    
    sendSuccessResponse(res, 201, savedTodo, 'Tarefa criada com sucesso');
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    
    // Verificar se é erro de validação do Mongoose
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return sendErrorResponse(res, 400, 'Dados inválidos: ' + validationErrors.join(', '));
    }
    
    sendErrorResponse(res, 500, 'Erro interno do servidor ao criar tarefa', error);
  }
};

// @desc    Atualizar tarefa
// @route   PUT /api/todos/:id
// @access  Public
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // Validar ObjectId
    if (!isValidObjectId(id)) {
      return sendErrorResponse(res, 400, 'ID da tarefa inválido');
    }

    // Buscar tarefa existente
    const existingTodo = await Todo.findById(id);
    if (!existingTodo) {
      return sendErrorResponse(res, 404, 'Tarefa não encontrada');
    }

    // Preparar dados para atualização
    const updateData = {};
    
    if (title !== undefined) {
      if (!title || title.trim() === '') {
        return sendErrorResponse(res, 400, 'Título não pode estar vazio');
      }
      updateData.title = title.trim();
    }
    
    if (description !== undefined) {
      updateData.description = description ? description.trim() : '';
    }
    
    if (completed !== undefined) {
      updateData.completed = Boolean(completed);
    }

    // Atualizar tarefa
    const updatedTodo = await Todo.findByIdAndUpdate(
      id, 
      updateData, 
      { 
        new: true, // Retornar documento atualizado
        runValidators: true // Executar validações do schema
      }
    );

    sendSuccessResponse(res, 200, updatedTodo, 'Tarefa atualizada com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return sendErrorResponse(res, 400, 'Dados inválidos: ' + validationErrors.join(', '));
    }
    
    sendErrorResponse(res, 500, 'Erro interno do servidor ao atualizar tarefa', error);
  }
};

// @desc    Deletar tarefa
// @route   DELETE /api/todos/:id
// @access  Public
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar ObjectId
    if (!isValidObjectId(id)) {
      return sendErrorResponse(res, 400, 'ID da tarefa inválido');
    }

    // Deletar tarefa
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return sendErrorResponse(res, 404, 'Tarefa não encontrada');
    }

    sendSuccessResponse(res, 200, deletedTodo, 'Tarefa deletada com sucesso');
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    sendErrorResponse(res, 500, 'Erro interno do servidor ao deletar tarefa', error);
  }
};

// @desc    Obter estatísticas das tarefas
// @route   GET /api/todos/stats
// @access  Public
const getTodoStats = async (req, res) => {
  try {
    const totalTodos = await Todo.countDocuments();
    const completedTodos = await Todo.countDocuments({ completed: true });
    const pendingTodos = totalTodos - completedTodos;
    
    // Tarefas criadas hoje
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const todayTodos = await Todo.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow }
    });

    // Tarefas concluídas hoje
    const completedToday = await Todo.countDocuments({
      completed: true,
      updatedAt: { $gte: today, $lt: tomorrow }
    });

    const stats = {
      total: totalTodos,
      completed: completedTodos,
      pending: pendingTodos,
      completionRate: totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0,
      createdToday: todayTodos,
      completedToday: completedToday
    };

    sendSuccessResponse(res, 200, stats, 'Estatísticas recuperadas com sucesso');
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    sendErrorResponse(res, 500, 'Erro interno do servidor ao buscar estatísticas', error);
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoStats
};