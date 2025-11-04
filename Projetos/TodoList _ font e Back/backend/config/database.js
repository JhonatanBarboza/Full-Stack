const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    
    // Event listeners para monitorar a conexão
    mongoose.connection.on('error', (err) => {
      console.error('❌ Erro na conexão com MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB desconectado');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconectado');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('💾 Conexão com MongoDB fechada devido ao encerramento da aplicação');
        process.exit(0);
      } catch (error) {
        console.error('❌ Erro ao fechar conexão com MongoDB:', error);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('❌ Erro ao conectar com MongoDB:', error.message);
    
    // Verificar tipos de erro comuns
    if (error.name === 'MongoNetworkError') {
      console.log('💡 Dica: Verifique se o MongoDB está rodando localmente ou se a URL de conexão está correta');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;