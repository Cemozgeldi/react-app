import { Card, Center, Container } from '@chakra-ui/react'
import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

export default function AuthPage() {
  const [activeForm, setActiveForm] = useState('login')

  const openLoginForm = () => setActiveForm('login')
  const openRegisterForm = () => setActiveForm('register')

  return (
    <Center minHeight="100vh">
      <Container>
        <Card p={4} width="full" maxWidth="25rem" mx="auto">
          {activeForm === 'login' ? (
            <LoginForm openRegisterForm={openRegisterForm} />
          ) : (
            <RegisterForm openLoginForm={openLoginForm} />
          )}
        </Card>
      </Container>
    </Center>
  )
}
