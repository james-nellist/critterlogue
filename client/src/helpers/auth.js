import { Buffer } from 'buffer'
import { useNavigate } from 'react-router-dom'

const tokenName = 'user-token'
const userEmail = 'user-email'

export const getToken = () => localStorage.getItem(tokenName)
export const setToken = (token) => localStorage.setItem(tokenName, token)

export const getEmail = () => localStorage.getItem(userEmail)
export const setEmail = (email) => localStorage.setItem(userEmail, email)

export const getPayload = () => {
  const token = getToken()
  if (!token) return false
  const splitToken = token.split('.')
  const payloadString = splitToken[1]
  return JSON.parse(Buffer.from(payloadString, 'base64'))
}

export const isAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const timeNow = Date.now() / 1000
  return (payload.exp > timeNow) ? true : false
}

export const handleLogout = (navigate) => {
  localStorage.removeItem(tokenName)
  navigate('/auth/login/')
}

export const setHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }
}

export const userIsOwner  = (post) => {
  const payload = getPayload()
  if (!payload) return false
  if (post){
    const ownerId = post.owner ? post.owner.id : null
    const addedById = post.addedBy ? post.addedBy._id : null
    return payload.sub === ownerId || payload.sub === addedById
  }
}
// comment
