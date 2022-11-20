import { Container } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getProducts } from '../api/products'
import ProductList from '../components/ProductList'
import { useUser } from '../contexts/UserContext'

export default function HomePage() {
  const [products, setProducts] = useState([])
  const { token } = useUser()

  useEffect(() => {
    getProducts(token).then((data) => setProducts(data.products))
  }, [token])

  return (
    <Container maxW="container.xl" pt={8}>
      <ProductList products={products} />
    </Container>
  )
}
