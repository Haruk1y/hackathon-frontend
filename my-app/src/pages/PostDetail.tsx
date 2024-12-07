// pages/PostDetail.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  VStack,
  Box,
  Divider,
  Text,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { PostCard } from '../components/post/PostCard.tsx';
import { ReplyForm } from '../components/post/ReplyForm.tsx';
import { useReplies } from '../hooks/useReplies.ts';

export const PostDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { postWithReplies, isLoading, error } = useReplies(postId ?? '');

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }

  if (error || !postWithReplies) {
    return (
      <Center h="100vh">
        <Text>投稿の読み込みに失敗しました</Text>
      </Center>
    );
  }

  const { post, replies } = postWithReplies;

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6}>
        <PostCard post={post} />
        <Divider />
        <Box w="100%">
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            リプライを投稿
          </Text>
          <ReplyForm postId={post.id} />
        </Box>
        <Divider />
        <Box w="100%">
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            リプライ一覧
          </Text>
          <VStack spacing={4} align="stretch">
            {replies.map((reply) => (
              <PostCard key={reply.id} post={reply} />
            ))}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};