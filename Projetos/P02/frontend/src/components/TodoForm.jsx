import { useState } from 'react';
import './TodoForm.css';

const TodoForm = ({ onSubmit, loading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }

    try {
      await onSubmit(title.trim(), description.trim());
      setTitle('');
      setDescription('');
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="input-group">
        <div className="input-fields">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título da tarefa..."
            className="todo-input"
            disabled={loading}
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição (opcional)..."
            className="todo-description"
            disabled={loading}
            rows="2"
          />
        </div>
        <button 
          type="submit" 
          className="add-button"
          disabled={loading || !title.trim()}
        >
          {loading ? 'Salvando...' : '+ Adicionar'}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;