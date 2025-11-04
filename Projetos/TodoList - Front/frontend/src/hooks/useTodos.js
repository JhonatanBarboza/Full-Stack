import { useState, useEffect } from 'react';
import todoService from '../services/api';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError('');
      const todosData = await todoService.getAllTodos();
      setTodos(todosData);
    } catch (err) {
      setError(err.message || 'Erro ao carregar tarefas');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title, description = '') => {
    try {
      setLoading(true);
      setError('');
      const newTodo = await todoService.createTodo(title, description);
      setTodos(prev => [...prev, newTodo]);
      return newTodo;
    } catch (err) {
      setError(err.message || 'Erro ao adicionar tarefa');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id, updates) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, updates);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
      return updatedTodo;
    } catch (err) {
      setError(err.message || 'Erro ao atualizar tarefa');
      throw err;
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err.message || 'Erro ao deletar tarefa');
      throw err;
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const updatedTodo = await todoService.toggleTodo(id, completed);
      setTodos(prev => prev.map(todo => 
        todo.id === id ? updatedTodo : todo
      ));
      return updatedTodo;
    } catch (err) {
      setError(err.message || 'Erro ao atualizar tarefa');
      throw err;
    }
  };

  const clearError = () => setError('');

  // Estatísticas derivadas
  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length,
    completionRate: todos.length > 0 ? ((todos.filter(todo => todo.completed).length / todos.length) * 100).toFixed(1) : 0
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return {
    todos,
    loading,
    error,
    stats,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearError,
    refreshTodos: loadTodos
  };
};