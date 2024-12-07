// hooks/useReplies.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../services/api/client.ts';
import { Post, CreateReplyRequest } from '../types';

export const useReplies = (postId: string) => {
  const queryClient = useQueryClient();

  // リプライ一覧の取得
  const { data: replies, isLoading, error } = useQuery<Post[]>({
    queryKey: ['replies', postId],
    queryFn: async () => {
      const response = await apiClient.get(`/posts/${postId}/replies`);
      return response.data;
    },
  });

  // 投稿と全リプライの取得
  const { data: postWithReplies } = useQuery({
    queryKey: ['post', postId, 'with-replies'],
    queryFn: async () => {
      const response = await apiClient.get(`/posts/${postId}/with-replies`);
      return response.data;
    },
  });

  // リプライの作成
  const createReplyMutation = useMutation({
    mutationFn: async (newReply: CreateReplyRequest) => {
      const response = await apiClient.post(`/posts/${postId}/replies`, newReply);
      return response.data;
    },
    onSuccess: () => {
      // リプライ一覧と投稿詳細を再取得
      queryClient.invalidateQueries({ queryKey: ['replies', postId] });
      queryClient.invalidateQueries({ queryKey: ['post', postId, 'with-replies'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] }); // メインの投稿一覧も更新
    },
  });

  return {
    replies,
    postWithReplies,
    isLoading,
    error,
    createReply: createReplyMutation.mutate,
  };
};