import { api } from '../lib/axios'

export async function register({ name, email, password }) {
  const response = await api.post('user/register', { name, email, password })
  return response.data
}

export async function login({ email, password }) {
  const response = await api.post('user/login', { email, password })
  return response.data
}
