import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { store } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { toast } from 'sonner';

// Create enterprise Axios instance
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from Redux store directly
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Global Errors & 401s
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    
    // Check if offline
    if (!navigator.onLine) {
      toast.error('You are offline. Please check your internet connection.');
      return Promise.reject(error);
    }

    if (error.response) {
      const { status, data } = error.response;
      
      // Auto-logout on 401 Unauthorized
      if (status === 401) {
        toast.error('Session expired. Please log in again.');
        store.dispatch(logout());
        // Redirect logic is handled inside the App Router / AuthGuard
      }
      
      // Handle Forbidden
      if (status === 403) {
        toast.error('You do not have permission to perform this action.');
      }
      
      // Handle Validation Errors
      if (status === 422 || status === 400) {
        const msg = (data as any)?.message || 'Validation failed. Please check your inputs.';
        toast.error(msg);
      }
      
      // Handle Server Errors
      if (status >= 500) {
        toast.error('A server error occurred. Our team has been notified.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      toast.error('Unable to connect to the server. Please try again later.');
    }

    return Promise.reject(error);
  }
);
