import React from 'react'
import { useFormik } from 'formik'
import { Box, Button, Checkbox, Input, Text, VStack } from '@chakra-ui/react'
import * as Yup from 'yup'
import { login } from '../api/auth'
import { useUser } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

const formValidation = Yup.object().shape({
  email: Yup.string().email('Email geçersiz').required('Email gerekli'),
  password: Yup.string()
    .min(6, 'Parola minimum 6 karakterden oluşmalı')
    .max(20, 'Parola en fazla 20 karakterden oluşabilir')
    .required('Parola gerekli')
})

export default function LoginForm({ openRegisterForm }) {
  const { setToken } = useUser()
  const navigate = useNavigate()

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validationSchema: formValidation,
    async onSubmit(values) {
      try {
        const { token } = await login(values)

        if (values.rememberMe) localStorage.setItem('TOKEN', token)
        else localStorage.removeItem('TOKEN')

        setToken(token)
        navigate('/')
      } catch (error) {
        console.error(error)
      }
    }
  })

  return (
    <form onSubmit={form.handleSubmit}>
      <VStack spacing={3} alignItems="stretch">
        <Box>
          <Input
            type="email"
            name="email"
            placeholder="E-posta"
            value={form.values.email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {form.errors.email && (
            <Text fontSize="xs" color="red.500" mt={1}>
              {form.errors.email}
            </Text>
          )}
        </Box>

        <Box>
          <Input
            type="password"
            name="password"
            placeholder="Parola"
            value={form.values.password}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {form.errors.password && (
            <Text fontSize="xs" color="red.500" mt={1}>
              {form.errors.password}
            </Text>
          )}
        </Box>

        <Checkbox
          checked={form.values.rememberMe}
          name="rememberMe"
          onChange={form.handleChange}
          onBlur={form.handleBlur}>
          Beni hatırla
        </Checkbox>

        <Button type="submit" colorScheme="blue">
          Giriş Yap
        </Button>

        <Text fontSize="xs" onClick={openRegisterForm}>
          Üyeliğin yok mu? Hemen kayıt ol
        </Text>
      </VStack>
    </form>
  )
}
