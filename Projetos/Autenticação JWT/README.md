# 🔐 Sistema de Autenticação JWT com React

![Image](https://github.com/user-attachments/assets/e9da8182-e0e2-4544-9d2b-af32aece60b4)

## 📋 Descrição

Este projeto é um sistema completo de autenticação JWT (JSON Web Token) desenvolvido em React com Vite. O sistema oferece funcionalidades de login, cadastro de usuários, gerenciamento de sessões e um painel administrativo para gestão de usuários.

## ✨ Funcionalidades

### 🔑 Autenticação
- **Login seguro** com validação de credenciais
- **Tokens JWT** com tempo de expiração configurável (7 segundos para demonstração)
- **Verificação automática** de validade do token
- **Logout** com remoção segura do token

### 👤 Gerenciamento de Usuários
- **Cadastro de novos usuários** (apenas admins)
- **Lista de usuários cadastrados** com informações de permissão
- **Exclusão de usuários** com botão de lixeira
- **Proteções de segurança** (não pode deletar a si mesmo ou último admin)

### 🛡️ Segurança
- **Validação de tokens** em tempo real
- **Expiração automática** de sessões
- **Confirmação de exclusão** de usuários
- **Diferentes níveis de acesso** (admin/usuário comum)

### 🎨 Interface
- **Design responsivo** e moderno
- **Feedback visual** com mensagens de sucesso/erro
- **Interface intuitiva** com alternância entre views
- **Animações suaves** e hover effects

## 🚀 Tecnologias Utilizadas

- **React 18.2.0** - Biblioteca JavaScript para interfaces de usuário
- **Vite 5.0.8** - Ferramenta de build rápida e moderna
- **JOSE 6.1.0** - Biblioteca para operações JWT
- **CSS3** - Estilização com Flexbox e Grid
- **JavaScript ES6+** - Funcionalidades modernas do JavaScript

## 📁 Estrutura do Projeto

```
Autenticação JWT/
├── src/
│   ├── App.jsx          # Componente principal com toda a lógica
│   ├── App.css          # Estilos da aplicação
│   ├── authUtils.js     # Utilitários para JWT e autenticação
│   ├── main.jsx         # Ponto de entrada da aplicação
│   └── index.css        # Estilos globais
├── public/              # Arquivos estáticos
├── package.json         # Dependências e scripts
├── vite.config.js       # Configuração do Vite
├── index.html           # Arquivo HTML principal
└── README.md           # Documentação do projeto
```

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd "Autenticação JWT"
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o projeto**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   - Abra seu navegador e acesse: `http://localhost:5173`

## 👥 Credenciais Padrão

O sistema vem com um usuário administrador pré-configurado:

- **Usuário:** `admin`
- **Senha:** `123456`
- **Permissão:** Administrador

## 📚 Como Usar

### 1. **Fazendo Login**
- Insira suas credenciais nos campos de usuário e senha
- Clique em "Entrar"
- Se as credenciais estiverem corretas, você será redirecionado para o dashboard

### 2. **Painel Administrativo**
- Usuários com permissão de admin terão acesso ao painel administrativo
- Visualize a lista de todos os usuários cadastrados
- Cadastre novos usuários clicando em "Cadastrar Novo Usuário"

### 3. **Cadastrando Usuários**
- No painel admin, clique em "Cadastrar Novo Usuário"
- A lista de usuários será substituída pelo formulário de cadastro
- Preencha os campos e clique em "Cadastrar"
- Após o cadastro, você retornará automaticamente à lista de usuários

### 4. **Excluindo Usuários**
- Na lista de usuários, cada usuário tem um botão de lixeira (🗑️)
- Clique no botão para excluir um usuário
- Confirme a exclusão na janela de confirmação

### 5. **Sessões e Segurança**
- Os tokens JWT expiram automaticamente (configurado para 7 segundos)
- Ao expirar, você será automaticamente deslogado
- Use o botão "Sair" para fazer logout manual

## ⚙️ Configurações

### Tempo de Expiração do Token
No arquivo `src/authUtils.js`, você pode alterar o tempo de expiração:

```javascript
const TOKEN_EXPIRY = '7s'  // Altere para o tempo desejado (ex: '1h', '30m', '24h')
```

### Chave Secreta JWT
Para produção, altere a chave secreta no arquivo `src/authUtils.js`:

```javascript
const JWT_SECRET = new TextEncoder().encode('sua-chave-secreta-muito-segura-aqui')
```

## 🔒 Recursos de Segurança

### Validações Implementadas
- ✅ **Não permite deletar o próprio usuário logado**
- ✅ **Não permite deletar o último administrador**
- ✅ **Confirmação obrigatória antes de excluir usuários**
- ✅ **Verificação automática de expiração de tokens**
- ✅ **Validação de campos obrigatórios**
- ✅ **Verificação de usuários duplicados**

### Proteções JWT
- ✅ **Assinatura digital dos tokens**
- ✅ **Verificação de integridade**
- ✅ **Tempo de expiração configurável**
- ✅ **Armazenamento seguro no localStorage**
