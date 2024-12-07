// pages/Login.tsx
import React from 'react';
import { Container, Heading, VStack } from '@chakra-ui/react';
import { LoginForm } from '../components/auth/LoginForm.tsx';

export const Login: React.FC = () => {
  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Heading>ログイン</Heading>
        <LoginForm />
      </VStack>
    </Container>
  );
};