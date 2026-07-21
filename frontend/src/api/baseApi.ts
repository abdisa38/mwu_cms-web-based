import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

// Base API configuration using RTK Query
const baseQuery = fetchBaseQuery({
  baseUrl: '/api/v1', // Leverages Vite proxy
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
