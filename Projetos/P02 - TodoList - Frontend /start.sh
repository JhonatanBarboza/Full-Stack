#!/bin/bash

# Script para iniciar o projeto Todo List Full Stack

echo "🚀 Iniciando Todo List Full Stack..."
echo ""

# Função para matar processos ao sair
cleanup() {
    echo ""
    echo "🛑 Encerrando serviços..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

# Capturar Ctrl+C
trap cleanup SIGINT

# Diretório base do projeto
PROJECT_DIR="/home/jhonatan/Documentos/Full-Stack/Projetos/P02"

# Verificar se os diretórios existem
if [ ! -d "$PROJECT_DIR/backend" ]; then
    echo "❌ Diretório backend não encontrado!"
    exit 1
fi

if [ ! -d "$PROJECT_DIR/frontend" ]; then
    echo "❌ Diretório frontend não encontrado!"
    exit 1
fi

# Iniciar backend
echo "🔧 Iniciando backend na porta 3001..."
cd "$PROJECT_DIR/backend"
node server.js &
BACKEND_PID=$!

# Aguardar um pouco para o backend inicializar
sleep 2

# Iniciar frontend
echo "🎨 Iniciando frontend na porta 5173..."
cd "$PROJECT_DIR/frontend"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Serviços iniciados com sucesso!"
echo ""
echo "🔗 URLs disponíveis:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3001/api"
echo "   Health:   http://localhost:3001/api/health"
echo ""
echo "⚡ Pressione Ctrl+C para encerrar todos os serviços"
echo ""

# Manter o script rodando
wait