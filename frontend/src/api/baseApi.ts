import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

// Base API configuration using RTK Query
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    prepareHeaders: (headers, { getState }) => {
      // Get the token from Redux state
      const token = (getState() as RootState).auth.token;

      // If we have a token, set the Authorization header
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['User', 'Student', 'Clearance'], // Used for cache invalidation
  endpoints: () => ({}), // Endpoints will be injected from other files
});
