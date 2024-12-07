// components/post/PostCard.tsx

import React from 'react';
import { Box, HStack, Text, IconButton, VStack, Avatar } from '@chakra-ui/react';
import { usePosts } from '../../hooks/usePosts.ts';
import { Post } from '../../types';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { addLike, removeLike } = usePosts();
  const [isLiked, setIsLiked] = React.useState(false);

  const handleLikeClick = async () => {
    try {
      if (isLiked) {
        await removeLike(post.id);
      } else {
        await addLike(post.id);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" mb={4}>
      <HStack spacing={4} align="start">
        <Avatar size="sm" name={post.user.display_name} src={post.user.profile_image} />
        <VStack align="stretch" flex={1} spacing={2}>
          <HStack justify="space-between">
            <Text fontWeight="bold">{post.user.display_name}</Text>
            <Text color="gray.500" fontSize="sm">
              {new Date(post.created_at).toLocaleString()}
            </Text>
          </HStack>
          <Text>{post.content}</Text>
          {post.summary && (
            <Text fontSize="sm" color="gray.600" mt={2}>
              要約: {post.summary}
            </Text>
          )}
          <HStack spacing={4}>
            <IconButton
              aria-label="いいね"
              icon={isLiked ? <span>❤️</span> : <span>🤍</span>}
              variant="ghost"
              onClick={handleLikeClick}
            />
            <Text fontSize="sm">{post.like_count}</Text>
            <Text fontSize="sm">返信 {post.reply_count}</Text>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};