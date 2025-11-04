require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const todoRoutes = require('./routes/todos');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar ao MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware de logging para desenvolvimento
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
  });
}

// Rota de teste/health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando corretamente com MongoDB!',
    timestamp: new Date().toISOString(),
    database: 'MongoDB conectado',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rotas da API
app.use('/api/todos', todoRoutes);

// Middleware para rotas não encontradas
app.use(notFound);

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Iniciar o servidor
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 API Todo List disponível em http://localhost:${PORT}/api`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📊 Estatísticas: http://localhost:${PORT}/api/todos/stats`);
  console.log(`🔧 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM recebido, encerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor encerrado com sucesso');
  });
});

process.on('unhandledRejection', (err, promise) => {
  console.error('🔴 Unhandled Promise Rejection:', err.message);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;