// pages/Signup.tsx
import React from 'react';
import { Container, Heading, VStack } from '@chakra-ui/react';
import { SignupForm } from '../components/auth/SignupForm.tsx';

export const Signup: React.FC = () => {
  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Heading>アカウント作成</Heading>
        <SignupForm />
      </VStack>
    </Container>
  );
};