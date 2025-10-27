import { useState, useEffect } from 'react';
import { useTodos } from '../hooks/useTodos';
import './DashboardPage.css';

const DashboardPage = () => {
  const { todos, loading, error } = useTodos();
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0
  });

  // Calcular estatísticas
  useEffect(() => {
    if (todos.length > 0) {
      const completed = todos.filter(todo => todo.completed).length;
      const pending = todos.length - completed;
      const completionRate = todos.length > 0 ? Math.round((completed / todos.length) * 100) : 0;

      setStats({
        total: todos.length,
        completed,
        pending,
        completionRate
      });
    } else {
      setStats({
        total: 0,
        completed: 0,
        pending: 0,
        completionRate: 0
      });
    }
  }, [todos]);

  // Obter tarefas recentes (últimas 5)
  const getRecentTodos = () => {
    return [...todos]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  };

  // Formatar data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading">
          Carregando estatísticas...
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Visão geral das suas tarefas e produtividade</p>
      </div>

      <div className="dashboard-main">
        {/* Grid de Estatísticas */}
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <h3>Total de Tarefas</h3>
              <p className="stat-number">{stats.total}</p>
            </div>
          </div>

          <div className="stat-card completed">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>Concluídas</h3>
              <p className="stat-number">{stats.completed}</p>
            </div>
          </div>

          <div className="stat-card pending">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <h3>Pendentes</h3>
              <p className="stat-number">{stats.pending}</p>
            </div>
          </div>

          <div className="stat-card completion">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <h3>Taxa de Conclusão</h3>
              <p className="stat-number">{stats.completionRate}%</p>
            </div>
          </div>
        </div>

        {/* Barra de Progresso */}
        <div className="progress-section">
          <h2>Progresso Geral</h2>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${stats.completionRate}%` }}
            ></div>
          </div>
          <p className="progress-text">
            {stats.completed} de {stats.total} tarefas concluídas ({stats.completionRate}%)
          </p>
        </div>

        {/* Grid do Dashboard */}
        <div className="dashboard-grid">
          {/* Tarefas Recentes */}
          <div className="dashboard-section">
            <h2>🕒 Tarefas Recentes</h2>
            {todos.length > 0 ? (
              <ul className="recent-list">
                {getRecentTodos().map(todo => (
                  <li key={todo.id} className={`recent-item ${todo.completed ? 'completed' : ''}`}>
                    <span className="recent-status">
                      {todo.completed ? '✅' : '⏳'}
                    </span>
                    <div className="recent-content">
                      <span className="recent-title">{todo.title}</span>
                      <span className="recent-date">
                        {formatDate(todo.createdAt)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-section">
                Nenhuma tarefa encontrada
              </div>
            )}
          </div>

          {/* Resumo de Atividade */}
          <div className="dashboard-section">
            <h2>📋 Resumo de Atividade</h2>
            <div className="activity-summary">
              <div className="activity-item">
                <strong>Tarefas criadas hoje:</strong>
                <span>{todos.filter(todo => {
                  const today = new Date();
                  const todoDate = new Date(todo.createdAt);
                  return todoDate.toDateString() === today.toDateString();
                }).length}</span>
              </div>
              
              <div className="activity-item">
                <strong>Tarefas concluídas hoje:</strong>
                <span>{todos.filter(todo => {
                  if (!todo.completed || !todo.updatedAt) return false;
                  const today = new Date();
                  const todoDate = new Date(todo.updatedAt);
                  return todoDate.toDateString() === today.toDateString();
                }).length}</span>
              </div>

              {stats.total > 0 && (
                <div className="activity-item">
                  <strong>Produtividade:</strong>
                  <span className={`productivity ${stats.completionRate >= 70 ? 'high' : stats.completionRate >= 40 ? 'medium' : 'low'}`}>
                    {stats.completionRate >= 70 ? '🔥 Excelente' : 
                     stats.completionRate >= 40 ? '👍 Boa' : '💪 Pode melhorar'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <p>❌ Erro ao carregar dados: {error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;