require('dotenv').config();
const mongoose = require('mongoose');
const Todo = require('../models/Todo');
const connectDB = require('../config/database');

const sampleTodos = [
  {
    title: 'Estudar React',
    description: 'Completar o curso de React e praticar com projetos pessoais',
    completed: false
  },
  {
    title: 'Configurar MongoDB',
    description: 'Integrar MongoDB com a aplicação de Todo List',
    completed: true
  },
  {
    title: 'Implementar autenticação',
    description: 'Adicionar sistema de login e registro de usuários',
    completed: false
  },
  {
    title: 'Criar dashboard',
    description: 'Desenvolver página de estatísticas e relatórios',
    completed: true
  },
  {
    title: 'Testar API',
    description: 'Escrever testes unitários para todos os endpoints',
    completed: false
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Iniciando seed do banco de dados...');
    
    // Conectar ao MongoDB
    await connectDB();
    
    // Limpar dados existentes
    console.log('🗑️ Limpando dados existentes...');
    await Todo.deleteMany({});
    
    // Inserir dados de exemplo
    console.log('📝 Inserindo dados de exemplo...');
    const todos = await Todo.insertMany(sampleTodos);
    
    console.log(`✅ ${todos.length} tarefas inseridas com sucesso!`);
    console.log('📊 Dados inseridos:');
    todos.forEach((todo, index) => {
      console.log(`   ${index + 1}. ${todo.title} - ${todo.completed ? '✅' : '⏳'}`);
    });
    
    console.log('🎉 Seed concluído com sucesso!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Erro durante o seed:', error);
    process.exit(1);
  }
};

// Executar seed se o arquivo for chamado diretamente
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;