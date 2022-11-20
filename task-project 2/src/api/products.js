import { api } from '../lib/axios'

export async function getProducts(token) {
  const response = await api.get('product/all', {
    headers: {
      'access-token': token
    }
  })

  return response.data
}

export async function getProductById(token, id) {
  const response = await api.get(`product/get/${id}`, {
    headers: {
      'access-token': token
    }
  })

  return response.data
}
