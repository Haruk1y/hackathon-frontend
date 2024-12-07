// components/post/PostForm.tsx

import React from 'react';
import { Box, Button, Textarea, VStack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { usePosts } from '../../hooks/usePosts.ts';

interface PostFormInputs {
  content: string;
}

export const PostForm: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<PostFormInputs>();
  const { createPost } = usePosts();
  const toast = useToast();

  const onSubmit = async (data: PostFormInputs) => {
    try {
      await createPost(data);
      toast({
        title: '投稿を作成しました',
        status: 'success',
        duration: 3000,
      });
      reset();
    } catch (error) {
      toast({
        title: '投稿の作成に失敗しました',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" width="100%" bg="white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <Textarea
            {...register('content', {
              required: '投稿内容を入力してください',
              maxLength: {
                value: 280,
                message: '投稿は280文字以内で入力してください',
              },
            })}
            placeholder="いまどうしてる？"
            resize="vertical"
            minHeight="120px"  // 高さを増加
            fontSize="lg"      // フォントサイズを大きく
            p={4}             // パディングを追加
          />
          {errors.content && (
            <Box color="red.500" fontSize="sm" width="100%">
              {errors.content.message}
            </Box>
          )}
          <Button
            type="submit"
            colorScheme="blue"
            width="100%"
            size="lg"        // ボタンサイズを大きく
            isLoading={isSubmitting}
          >
            投稿する
          </Button>
        </VStack>
      </form>
    </Box>
  );
};