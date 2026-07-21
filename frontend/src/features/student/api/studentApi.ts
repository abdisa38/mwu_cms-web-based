import { baseApi } from '@/api/baseApi';

export const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Dashboard
    getStudentDashboardStats: builder.query<any, void>({
      query: () => '/student/dashboard',
      providesTags: ['Clearance', 'Document', 'Notification'],
    }),

    // Clearances
    getMyClearances: builder.query<any, void>({
      query: () => '/clearances/my-requests',
      providesTags: ['Clearance'],
    }),
    
    getClearanceById: builder.query<any, string>({
      query: (id) => `/clearances/${id}`,
      providesTags: (result, error, id) => [{ type: 'Clearance', id }],
    }),
    
    startClearance: builder.mutation<any, any>({
      query: (data) => ({
        url: '/clearances',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Clearance'],
    }),

    // Documents
    getMyDocuments: builder.query<any, void>({
      query: () => '/documents',
      providesTags: ['Document'],
    }),
    
    uploadDocument: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/documents/upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Document'],
    }),

    deleteDocument: builder.mutation<any, string>({
      query: (id) => ({
        url: `/documents/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Document'],
    }),

    // Certificates
    getMyCertificates: builder.query<any, void>({
      query: () => '/certificates/my-certificates',
      providesTags: ['Certificate'],
    }),

    // Profile & Settings
    updateProfile: builder.mutation<any, any>({
      query: (data) => ({
        url: '/users/me',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    
    changePassword: builder.mutation<any, any>({
      query: (data) => ({
        url: '/auth/update-password',
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetStudentDashboardStatsQuery,
  useGetMyClearancesQuery,
  useGetClearanceByIdQuery,
  useStartClearanceMutation,
  useGetMyDocumentsQuery,
  useUploadDocumentMutation,
  useDeleteDocumentMutation,
  useGetMyCertificatesQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = studentApi;
