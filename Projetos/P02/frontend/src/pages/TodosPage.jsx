import { useTodos } from '../hooks/useTodos';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import ErrorMessage from '../components/ErrorMessage';
import './TodosPage.css';

const TodosPage = () => {
  const { 
    todos, 
    loading, 
    error, 
    stats, 
    addTodo, 
    toggleTodo, 
    deleteTodo, 
    clearError 
  } = useTodos();

  const handleAddTodo = async (title, description) => {
    if (!title.trim()) {
      throw new Error('Digite o título da tarefa');
    }
    return await addTodo(title, description);
  };

  return (
    <div className="todos-page">
      <header className="page-header">
        <h1>Gerenciar Tarefas</h1>
        <p>Organize suas tarefas de forma simples</p>
      </header>

      <main className="page-main">
        <TodoForm onSubmit={handleAddTodo} loading={loading} />
        
        <ErrorMessage message={error} onClose={clearError} />
        
        {loading && <div className="loading">Carregando...</div>}
        
        <TodoList 
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          stats={stats}
        />
      </main>
    </div>
  );
};

export default TodosPage;