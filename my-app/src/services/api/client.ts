// services/api/client.ts

import axios from 'axios';
import { getAuth } from 'firebase/auth';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://uttc-x-backend-7tpdcc3giq-an.a.run.app/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // CORS認証を有効化
});

// リクエストインターセプター
apiClient.interceptors.request.use(async (config) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (user) {
            const token = await user.getIdToken(true); // forceRefresh=true
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    } catch (error) {
        console.error('Error in request interceptor:', error);
        return Promise.reject(error);
    }
}, (error) => {
    return Promise.reject(error);
});

// レスポンスインターセプター
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        // 認証エラーのデバッグ用ログ
        if (error.response?.status === 401) {
            console.error('Authentication error:', error);
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                console.log('Current user exists:', user.uid);
            } else {
                console.log('No current user');
            }
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;