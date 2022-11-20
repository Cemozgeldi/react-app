import React from 'react'
import { useFormik } from 'formik'
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react'
import * as Yup from 'yup'
import { register } from '../api/auth'
import { useUser } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

const formValidation = Yup.object().shape({
  name: Yup.string().required('İsim alanı gerekli'),
  email: Yup.string().email('Email geçersiz').required('Email gerekli'),
  password: Yup.string()
    .min(6, 'Parola minimum 6 karakterden oluşmalı')
    .max(20, 'Parola en fazla 20 karakterden oluşabilir')
    .required('Parola gerekli'),
  passwordConfirm: Yup.string()
    .required('Parola tekrarı gerekli')
    .oneOf([Yup.ref('password')], 'Parolalar eşleşmedi')
})

export default function RegisterForm({ openLoginForm }) {
  const { setToken } = useUser()
  const navigate = useNavigate()

  const form = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      rememberMe: false
    },
    validationSchema: formValidation,
    async onSubmit(values) {
      try {
        const { token } = await register(values)

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
            name="name"
            placeholder="İsim"
            value={form.values.name}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {form.errors.name && (
            <Text fontSize="xs" color="red.500" mt={1}>
              {form.errors.name}
            </Text>
          )}
        </Box>

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

        <Box>
          <Input
            type="password"
            name="passwordConfirm"
            placeholder="Parola (Tekrar)"
            value={form.values.passwordConfirm}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {form.errors.passwordConfirm && (
            <Text fontSize="xs" color="red.500" mt={1}>
              {form.errors.passwordConfirm}
            </Text>
          )}
        </Box>

        <Button type="submit" colorScheme="blue">
          Kayıt ol
        </Button>

        <Text fontSize="xs" onClick={openLoginForm}>
          Zaten üye misin? Giriş yap
        </Text>
      </VStack>
    </form>
  )
}
