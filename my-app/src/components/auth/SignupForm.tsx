// components/auth/SignupForm.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '../../hooks/useAuth.ts';

interface SignupFormInputs {
  email: string;
  password: string;
  username: string;
  displayName: string;
}

export const SignupForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>();
  
  const { signup } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      await signup(data.email, data.password, data.username, data.displayName);
      toast({
        title: 'アカウントを作成しました',
        status: 'success',
        duration: 3000,
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'エラーが発生しました',
        description: error.message,
        status: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>メールアドレス</FormLabel>
            <Input
              type="email"
              {...register('email', {
                required: 'メールアドレスは必須です',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '有効なメールアドレスを入力してください',
                },
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel>パスワード</FormLabel>
            <Input
              type="password"
              {...register('password', {
                required: 'パスワードは必須です',
                minLength: {
                  value: 6,
                  message: 'パスワードは6文字以上である必要があります',
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.username}>
            <FormLabel>ユーザーネーム</FormLabel>
            <Input
              {...register('username', {
                required: 'ユーザーネームは必須です',
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: '英数字とアンダースコアのみ使用できます',
                },
              })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.displayName}>
            <FormLabel>表示名</FormLabel>
            <Input
              {...register('displayName', {
                required: '表示名は必須です',
              })}
            />
            <FormErrorMessage>
              {errors.displayName && errors.displayName.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={isSubmitting}
          >
            アカウントを作成
          </Button>
        </VStack>
      </form>
    </Box>
  );
};