import Cookies from 'js-cookie'

// 这是获取token的 key
const TokenKey = 'hrsass-ihrm-token'

// 从缓存中读取token
export function getToken() {
  return Cookies.get(TokenKey)
}

// 设置缓存中的token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 删除缓存中的token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
