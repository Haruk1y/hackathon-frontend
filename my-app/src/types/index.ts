// types/index.ts

export interface User {
    id: string;
    firebase_uid: string;
    username: string;
    display_name: string;
    profile_image?: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
  }
  
  export interface Post {
    id: string;
    user_id: string;
    content: string;
    summary?: string;
    is_reply: boolean;
    parent_post_id?: string;
    like_count: number;
    reply_count: number;
    created_at: string;
    updated_at: string;
    user: User;
  }
  
  export interface Like {
    id: string;
    user_id: string;
    post_id: string;
    created_at: string;
    user: User;
    post: Post;
  }
  
  export interface ApiResponse<T> {
    data: T;
    error?: string;
  }
  
  export interface CreatePostRequest {
    content: string;
  }
  
  export interface CreateReplyRequest {
    content: string;
  }
  
  export interface SignupRequest {
    username: string;
    displayName: string;
  }