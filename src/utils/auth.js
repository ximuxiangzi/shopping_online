const TokenKey = 'success_token'

const ExpiresInKey = 'success_expires'

export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}

export function getExpiresIn() {
  return sessionStorage.getItem(ExpiresInKey) || -1
}

export function setExpiresIn(time) {
  return sessionStorage.setItem(ExpiresInKey, time)
}

export function removeExpiresIn() {
  return sessionStorage.removeItem(ExpiresInKey)
}
