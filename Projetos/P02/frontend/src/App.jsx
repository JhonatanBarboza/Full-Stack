import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://localhost:3001/api'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Buscar todas as tarefas
  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/todos`)
      const data = await response.json()
      
      if (data.success) {
        setTodos(data.data)
      } else {
        setError('Erro ao carregar tarefas')
      }
    } catch (err) {
      setError('Erro de conexão com o servidor')
      console.error('Erro:', err)
    } finally {
      setLoading(false)
    }
  }

  // Adicionar nova tarefa
  const addTodo = async (e) => {
    e.preventDefault()
    
    if (!newTodo.trim()) {
      setError('Digite o título da tarefa')
      return
    }

    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          title: newTodo,
          description: newDescription 
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setTodos([...todos, data.data])
        setNewTodo('')
        setNewDescription('')
        setError('')
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Erro ao adicionar tarefa')
      console.error('Erro:', err)
    } finally {
      setLoading(false)
    }
  }

  // Marcar como concluída/não concluída
  const toggleTodo = async (id, completed) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: !completed })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setTodos(todos.map(todo => 
          todo.id === id ? data.data : todo
        ))
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Erro ao atualizar tarefa')
      console.error('Erro:', err)
    }
  }

  // Deletar tarefa
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE'
      })
      
      const data = await response.json()
      
      if (data.success) {
        setTodos(todos.filter(todo => todo.id !== id))
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Erro ao deletar tarefa')
      console.error('Erro:', err)
    }
  }

  // Carregar tarefas ao montar o componente
  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo List</h1>
        <p>Organize suas tarefas de forma simples e elegante</p>
      </header>

      <main className="app-main">
        {/* Formulário para adicionar nova tarefa */}
        <form onSubmit={addTodo} className="todo-form">
          <div className="input-group">
            <div className="input-fields">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Título da tarefa..."
                className="todo-input"
                disabled={loading}
              />
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Descrição (opcional)..."
                className="todo-description"
                disabled={loading}
                rows="2"
              />
            </div>
            <button 
              type="submit" 
              className="add-button"
              disabled={loading || !newTodo.trim()}
            >
              {loading ? 'Carregando...' : '+ Adicionar'}
            </button>
          </div>
        </form>

        {/* Mensagem de erro */}
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError('')} className="close-error">×</button>
          </div>
        )}

        {/* Loading */}
        {loading && <div className="loading">Carregando...</div>}

        {/* Lista de tarefas */}
        <div className="todos-container">
          <div className="todos-header">
            <h2>Suas Tarefas ({todos.length})</h2>
            <span className="completed-count">
              {todos.filter(todo => todo.completed).length} concluídas
            </span>
          </div>

          {todos.length === 0 ? (
            <div className="empty-state">
              <p>Nenhuma tarefa ainda!</p>
              <p>Que tal adicionar sua primeira tarefa?</p>
            </div>
          ) : (
            <ul className="todos-list">
              {todos.map(todo => (
                <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <div className="todo-content">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id, todo.completed)}
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
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-button"
                    title="Deletar tarefa"
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Feito com ❤️ usando React + Vite + Node.js</p>
      </footer>
    </div>
  )
}

export default App
