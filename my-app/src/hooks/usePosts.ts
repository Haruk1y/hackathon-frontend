// hooks/usePosts.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/api/client.ts';
import { Post, CreatePostRequest } from '../types';

export const usePosts = () => {
  const queryClient = useQueryClient();

  // 投稿一覧の取得
  const { data: posts, isLoading, error } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await apiClient.get('/posts');
      return response.data;
    },
  });

  // 新規投稿の作成
  const createPostMutation = useMutation({
    mutationFn: async (newPost: CreatePostRequest) => {
      const response = await apiClient.post('/posts', newPost);
      return response.data;
    },
    onSuccess: () => {
      // 投稿一覧を再取得
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // いいねの追加
  const addLikeMutation = useMutation({
    mutationFn: async (postId: string) => {
      const response = await apiClient.post(`/posts/${postId}/likes`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // いいねの削除
  const removeLikeMutation = useMutation({
    mutationFn: async (postId: string) => {
      const response = await apiClient.delete(`/posts/${postId}/likes`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return {
    posts,
    isLoading,
    error,
    createPost: createPostMutation.mutate,
    addLike: addLikeMutation.mutate,
    removeLike: removeLikeMutation.mutate,
  };
};