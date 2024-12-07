// services/api/client.ts

import axios from 'axios';
import { getAuth } from 'firebase/auth';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプター
apiClient.interceptors.request.use(async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      try {
        const token = await user.getIdToken();
        // 修正: Bearerトークンの形式で正しく設定
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Sending token:", token); // デバッグ用
      } catch (error) {
        console.error("Error getting token:", error);
      }
    } else {
      console.log("No current user"); // デバッグ用
    }
    
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

// レスポンスインターセプター
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 認証エラーの場合はログインページにリダイレクト
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;