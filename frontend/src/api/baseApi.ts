import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const getBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl) return '/api/v1';
  const clean = envUrl.trim().replace(/\/+$/, '');
  return clean.endsWith('/api/v1') ? clean : `${clean}/api/v1`;
};

// Base API configuration using RTK Query
const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    // Global Error Interception
    if (result.error && result.error.status === 401) {
      // Dispatch auto-logout action if unauthorized
      // api.dispatch(logout()); 
    }
    return result;
  },
  tagTypes: [
    'User', 'Student', 'Staff', 'Department', 'Clearance', 
    'Workflow', 'Document', 'Certificate', 'Notification', 
    'Message', 'Audit', 'Settings'
  ],
  endpoints: () => ({}),
});
