import React, { useState, useEffect } from 'react'
import './App.css'
import { 
  generateToken, 
  verifyToken, 
  isAuthenticated, 
  isAuthenticatedSync,
  saveToken, 
  removeToken, 
  getToken 
} from './authUtils'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedUser, setLoggedUser] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  
  // Estados para cadastro de novos usuários
  const [showRegister, setShowRegister] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [users, setUsers] = useState([])
  
  // Carregar usuários do localStorage ao inicializar
  useEffect(() => {
    const savedUsers = localStorage.getItem('users')
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    } else {
      // Usuário admin padrão
      const defaultUsers = [{ username: 'admin', password: '123456', isAdmin: true }]
      setUsers(defaultUsers)
      localStorage.setItem('users', JSON.stringify(defaultUsers))
    }

    // Verificar se há um token válido ao carregar a aplicação
    const checkAuth = async () => {
      const authData = await isAuthenticated()
      if (authData) {
        setIsLoggedIn(true)
        setLoggedUser(authData.username)
        setIsAdmin(authData.isAdmin || false)
      }
    }
    
    checkAuth()
  }, [])
  
  // Verificar periodicamente se o token ainda é válido
  useEffect(() => {
    const checkTokenValidity = async () => {
      if (isLoggedIn) {
        const authData = await isAuthenticated()
        if (!authData) {
          // Token expirado ou inválido, fazer logout
          handleLogout()
          setMessage('Sessão expirada. Faça login novamente.')
        }
      }
    }

    // Verificar a cada 6 segundos 
    const interval = setInterval(checkTokenValidity, 0.1 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [isLoggedIn])
  
  // Salvar usuários no localStorage sempre que a lista mudar
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users))
    }
  }, [users])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validação simples
    if (!username || !password) {
      setMessage('Por favor, preencha todos os campos.')
      return
    }

    // Verificar se o usuário existe na lista de usuários
    const user = users.find(u => u.username === username && u.password === password)
    
    if (user) {
      try {
        // Gerar token JWT
        const token = await generateToken(user)
        
        // Salvar token no localStorage
        saveToken(token)
        
        setMessage('Login realizado com sucesso!')
        setIsLoggedIn(true)
        setLoggedUser(user.username)
        setIsAdmin(user.isAdmin || false)
        setUsername('')
        setPassword('')
      } catch (error) {
        setMessage('Erro ao gerar token de autenticação.')
        console.error('Erro JWT:', error)
      }
    } else {
      setMessage('Usuário ou senha incorretos.')
    }
  }
  
  const handleRegister = (e) => {
    e.preventDefault()
    
    // Validação simples
    if (!newUsername || !newPassword) {
      setMessage('Por favor, preencha todos os campos.')
      return
    }
    
    // Verificar se o usuário já existe
    const userExists = users.find(u => u.username === newUsername)
    if (userExists) {
      setMessage('Usuário já existe!')
      return
    }
    
    // Adicionar novo usuário
    const newUser = { username: newUsername, password: newPassword, isAdmin: false }
    setUsers([...users, newUser])
    setMessage('Usuário cadastrado com sucesso!')
    setNewUsername('')
    setNewPassword('')
    setShowRegister(false) // Volta para a lista de usuários após o cadastro
  }
  
  const handleDeleteUser = (userToDelete) => {
    // Não permitir deletar o próprio usuário logado
    if (userToDelete.username === loggedUser) {
      setMessage('Você não pode deletar seu próprio usuário!')
      return
    }
    
    // Não permitir deletar o último admin
    const adminUsers = users.filter(u => u.isAdmin)
    if (userToDelete.isAdmin && adminUsers.length === 1) {
      setMessage('Não é possível deletar o último administrador!')
      return
    }
    
    // Confirmar exclusão
    if (window.confirm(`Tem certeza que deseja deletar o usuário "${userToDelete.username}"?`)) {
      const updatedUsers = users.filter(u => u.username !== userToDelete.username)
      setUsers(updatedUsers)
      setMessage(`Usuário "${userToDelete.username}" deletado com sucesso!`)
    }
  }
  
  const handleLogout = () => {
    // Remover token do localStorage
    removeToken()
    
    setIsLoggedIn(false)
    setLoggedUser('')
    setIsAdmin(false)
    setMessage('')
    setShowRegister(false)
  }

  return (
    <div className="app">
      <div className="login-container">
        {!isLoggedIn ? (
          <>
            <h1>Login</h1>
            {!showRegister ? (
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="username">Usuário:</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Digite seu usuário"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">Senha:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                  />
                </div>
                
                <button type="submit" className="login-button">
                  Entrar
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="login-form">
                <h2>Cadastrar Novo Usuário</h2>
                <div className="form-group">
                  <label htmlFor="newUsername">Usuário:</label>
                  <input
                    type="text"
                    id="newUsername"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Digite o nome do usuário"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="newPassword">Senha:</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Digite a senha"
                  />
                </div>
                
                <button type="submit" className="login-button">
                  Cadastrar
                </button>
                
                <button 
                  type="button" 
                  className="login-button"
                  onClick={() => setShowRegister(false)}
                >
                  Voltar ao Login
                </button>
              </form>
            )}
            
            {message && (
              <div className={`message ${message.includes('sucesso') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}
            
            <div className="demo-info">
              <p><strong>Credenciais de admin:</strong></p>
              <p>Usuário: admin</p>
              <p>Senha: 123456</p>
            </div>
          </>
        ) : (
          <div className="dashboard">
            <h1>Bem-vindo, {loggedUser}!</h1>
            
            {isAdmin && (
              <div className="admin-panel">
                <h2>Painel do Administrador</h2>
                
                {!showRegister ? (
                  <>
                    <button 
                      className="login-button"
                      onClick={() => setShowRegister(true)}
                    >
                      Cadastrar Novo Usuário
                    </button>
                    
                    <div className="users-list">
                      <h3>Usuários Cadastrados:</h3>
                      <ul>
                        {users.map((user, index) => (
                          <li key={index} className="user-item">
                            <span className="user-info">
                              {user.username} {user.isAdmin && '(Admin)'}
                            </span>
                            <button 
                              className="delete-button"
                              onClick={() => handleDeleteUser(user)}
                              title={`Deletar usuário ${user.username}`}
                            >
                              🗑️
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleRegister} className="login-form">
                    <h3>Cadastrar Novo Usuário</h3>
                    <div className="form-group">
                      <label htmlFor="newUsername">Usuário:</label>
                      <input
                        type="text"
                        id="newUsername"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder="Digite o nome do usuário"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="newPassword">Senha:</label>
                      <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Digite a senha"
                      />
                    </div>
                    
                    <button type="submit" className="login-button">
                      Cadastrar
                    </button>
                    
                    <button 
                      type="button" 
                      className="login-button"
                      onClick={() => setShowRegister(false)}
                    >
                      Cancelar
                    </button>
                  </form>
                )}
              </div>
            )}
            
            <button className="logout-button" onClick={handleLogout}>
              Sair
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App