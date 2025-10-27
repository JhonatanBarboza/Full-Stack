// Middleware para tratar erros não capturados
const errorHandler = (err, req, res, next) => {
  console.error('🔴 Erro não tratado:', err);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Erro interno do servidor';

  // Erros específicos do MongoDB/Mongoose
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'ID inválido';
  }

  if (err.name === 'ValidationError') {
    statusCode = 400;
    const validationErrors = Object.values(err.errors).map(error => error.message);
    message = 'Dados inválidos: ' + validationErrors.join(', ');
  }

  if (err.code === 11000) {
    statusCode = 400;
    message = 'Dados duplicados detectados';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// Middleware para rotas não encontradas
const notFound = (req, res, next) => {
  const error = new Error(`Rota não encontrada: ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: error.message
  });
};

module.exports = {
  errorHandler,
  notFound
};