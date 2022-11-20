import { Box, Container } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../api/products'
import { useUser } from '../contexts/UserContext'

export default function ProductPage() {
  const [product, setProduct] = useState(null)
  const { token } = useUser()
  const params = useParams()

  useEffect(() => {
    getProductById(token, params.id).then((data) => setProduct(data.product))
  }, [token, params.id])

  if (!product) return <Box>Yükleniyor</Box>

  return (
    <Container maxW="container.xl" pt={8} backgroundColor="white">
      <Box
        as="img"
        src={`https://assignment-api.piton.com.tr${product.image}`}
        width="full"
        objectFit="cover"
        rounded="xl"
        maxW="20rem"
      />
    </Container>
  )
}
