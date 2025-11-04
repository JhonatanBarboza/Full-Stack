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
PROJECT_DIR="/home/jhonatan/Documentos/Full-Stack/Projetos/P03"

# Verificar se os diretórios existem
if [ ! -d "$PROJECT_DIR/backend" ]; then
    echo "❌ Diretório backend não encontrado!"
    exit 1
fi

if [ ! -d "$PROJECT_DIR/frontend" ]; then
    echo "❌ Diretório frontend não encontrado!"
    exit 1
fi

# Verificar se MongoDB está rodando
echo "🔍 Verificando MongoDB..."
if ! sudo docker ps | grep -q mongo; then
    echo "⚠️  MongoDB não encontrado! Iniciando container..."
    sudo docker run -d --name mongodb -p 27017:27017 mongo:latest
    echo "✅ MongoDB iniciado com sucesso!"
    sleep 3
else
    echo "✅ MongoDB já está rodando!"
fi

# Iniciar backend
echo "🔧 Iniciando backend na porta 3001..."
cd "$PROJECT_DIR/backend"
npm run dev &
BACKEND_PID=$!

# Aguardar um pouco para o backend inicializar
sleep 3

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
echo "   Stats:    http://localhost:3001/api/todos/stats"
echo ""
echo "⚡ Pressione Ctrl+C para encerrar todos os serviços"
echo ""

# Manter o script rodando
wait