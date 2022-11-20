import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://assignment-api.piton.com.tr/api/v1'
})
