import React from 'react'
import { Box, Card, Grid, Heading } from '@chakra-ui/react'
import { BsHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function ProductList({ products }) {
  return (
    <Grid
      templateColumns={[
        'repeat(1, 1fr)',
        'repeat(2, 1fr)',
        'repeat(3, 1fr)',
        'repeat(4, 1fr)'
      ]}
      gap={6}>
      {products.map((product) => (
        <Card as={Link} to={`/product/${product.id}`} key={product.id} p={4}>
          <Box
            as="img"
            src={`https://assignment-api.piton.com.tr${product.image}`}
            width="full"
            maxHeight="20rem"
            objectFit="cover"
            rounded="xl"
          />
          <Heading size="sm" mt={4}>
            {product.name}
          </Heading>

          <Box as={BsHeartFill} mt={2} />
        </Card>
      ))}
    </Grid>
  )
}
