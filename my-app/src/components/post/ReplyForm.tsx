// components/post/ReplyForm.tsx

import React from 'react';
import { Box, Button, Textarea, VStack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useReplies } from '../../hooks/useReplies.ts';

interface ReplyFormInputs {
  content: string;
}

interface ReplyFormProps {
  postId: string;
  onReplySuccess?: () => void;
}

export const ReplyForm: React.FC<ReplyFormProps> = ({ postId, onReplySuccess }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ReplyFormInputs>();
  const { createReply } = useReplies(postId);
  const toast = useToast();

  const onSubmit = async (data: ReplyFormInputs) => {
    try {
      await createReply(data);
      toast({
        title: 'リプライを投稿しました',
        status: 'success',
        duration: 3000,
      });
      reset();
      onReplySuccess?.();
    } catch (error) {
      toast({
        title: 'リプライの投稿に失敗しました',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <Textarea
            {...register('content', {
              required: 'リプライ内容を入力してください',
              maxLength: {
                value: 280,
                message: 'リプライは280文字以内で入力してください',
              },
            })}
            placeholder="リプライを投稿"
            resize="vertical"
          />
          {errors.content && (
            <Box color="red.500" fontSize="sm">
              {errors.content.message}
            </Box>
          )}
          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={isSubmitting}
          >
            リプライする
          </Button>
        </VStack>
      </form>
    </Box>
  );
};