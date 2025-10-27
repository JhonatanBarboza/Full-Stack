import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id, todo.completed)}
            className="checkbox-input"
          />
          <span className="checkbox-custom"></span>
        </label>
        <div className="todo-text">
          <div className="todo-title">{todo.title}</div>
          {todo.description && (
            <div className="todo-description-display">{todo.description}</div>
          )}
        </div>
        <span className="todo-date">
          {new Date(todo.createdAt).toLocaleDateString('pt-BR')}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-button"
        title="Deletar tarefa"
      >
        🗑️
      </button>
    </li>
  );
};

export default TodoItem;