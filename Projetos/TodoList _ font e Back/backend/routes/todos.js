const express = require('express');
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoStats
} = require('../controllers/todoController');

const router = express.Router();

// @route   GET /api/todos/stats
// @desc    Obter estatísticas das tarefas
// @access  Public
router.get('/stats', getTodoStats);

// @route   GET /api/todos
// @desc    Buscar todas as tarefas
// @access  Public
router.get('/', getTodos);

// @route   POST /api/todos
// @desc    Criar nova tarefa
// @access  Public
router.post('/', createTodo);

// @route   PUT /api/todos/:id
// @desc    Atualizar tarefa
// @access  Public
router.put('/:id', updateTodo);

// @route   DELETE /api/todos/:id
// @desc    Deletar tarefa
// @access  Public
router.delete('/:id', deleteTodo);

module.exports = router;