import * as jose from 'jose'

// Chave secreta para assinar o JWT (convertida para Uint8Array)
const JWT_SECRET = new TextEncoder().encode('sua-chave-secreta-muito-segura-aqui')

// Tempo de expiração do token
const TOKEN_EXPIRY = '10s'  // Alterado para 10 segundos para testes rápidos

/**
 * Gera um token JWT para o usuário
 * @param {Object} user - Dados do usuário
 * @returns {Promise<string>} Token JWT
 */
export const generateToken = async (user) => {
  const payload = {
    username: user.username,
    isAdmin: user.isAdmin || false,
    iat: Math.floor(Date.now() / 1000)
  }
  
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(JWT_SECRET)
    
  return jwt
}

/**
 * Verifica e decodifica um token JWT
 * @param {string} token - Token JWT
 * @returns {Promise<Object|null>} Dados do usuário ou null se inválido
 */
export const verifyToken = async (token) => {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET)
    return payload
  } catch (error) {
    console.error('Token inválido:', error.message)
    return null
  }
}

/**
 * Verifica se um token está expirado (versão síncrona)
 * @param {string} token - Token JWT
 * @returns {boolean} True se expirado, false caso contrário
 */
export const isTokenExpired = (token) => {
  try {
    const payload = jose.decodeJwt(token)
    if (!payload || !payload.exp) return true
    
    const currentTime = Math.floor(Date.now() / 1000)
    return payload.exp < currentTime
  } catch (error) {
    return true
  }
}

/**
 * Salva o token no localStorage
 * @param {string} token - Token JWT
 */
export const saveToken = (token) => {
  localStorage.setItem('authToken', token)
}

/**
 * Recupera o token do localStorage
 * @returns {string|null} Token JWT ou null
 */
export const getToken = () => {
  return localStorage.getItem('authToken')
}

/**
 * Remove o token do localStorage
 */
export const removeToken = () => {
  localStorage.removeItem('authToken')
}

/**
 * Verifica se o usuário está autenticado (versão assíncrona)
 * @returns {Promise<Object|null>} Dados do usuário se autenticado, null caso contrário
 */
export const isAuthenticated = async () => {
  const token = getToken()
  if (!token) return null
  
  if (isTokenExpired(token)) {
    removeToken()
    return null
  }
  
  return await verifyToken(token)
}

/**
 * Verifica se o usuário está autenticado (versão síncrona para verificação básica)
 * @returns {Object|null} Dados do usuário se autenticado, null caso contrário
 */
export const isAuthenticatedSync = () => {
  const token = getToken()
  if (!token) return null
  
  if (isTokenExpired(token)) {
    removeToken()
    return null
  }
  
  try {
    const payload = jose.decodeJwt(token)
    return payload
  } catch (error) {
    removeToken()
    return null
  }
}