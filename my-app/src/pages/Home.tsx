// pages/Home.tsx

import React from 'react';
import { Container, VStack, Heading, Box } from '@chakra-ui/react';
import { PostForm } from '../components/post/PostForm.tsx';
import { PostCard } from '../components/post/PostCard.tsx';
import { usePosts } from '../hooks/usePosts.ts';

export const Home: React.FC = () => {
  const { posts, isLoading, error } = usePosts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Heading>ホーム</Heading>
        <PostForm />
        <Box w="100%">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Box>
      </VStack>
    </Container>
  );
};