import TodoItem from './TodoItem';
import '../styles/components/TodoList.css';

const TodoList = ({ todos, onToggle, onDelete, stats }) => {
  if (todos.length === 0) {
    return (
      <div className="todos-container">
        <div className="empty-state">
          <p>Nenhuma tarefa ainda!</p>
          <p>Que tal adicionar sua primeira tarefa?</p>
        </div>
      </div>
    );
  }

  return (
    <div className="todos-container">
      <div className="todos-header">
        <h2>Suas Tarefas ({stats.total})</h2>
        <span className="completed-count">
          {stats.completed} concluídas
        </span>
      </div>

      <ul className="todos-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;