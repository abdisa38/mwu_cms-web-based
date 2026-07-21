import { baseApi } from '@/api/baseApi';

export const registrarApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Dashboard Stats
    getRegistrarDashboardStats: builder.query<any, void>({
      query: () => '/registrar/dashboard',
      providesTags: ['RegistrarQueue'],
    }),

    // Global Clearance Queue (Pending Final Approval, Completed, Rejected)
    getGlobalQueue: builder.query<any, { status?: string; page?: number; limit?: number; search?: string }>({
      query: (params) => {
        let url = '/registrar/queue?';
        if (params.status) url += `status=${params.status}&`;
        if (params.page) url += `page=${params.page}&`;
        if (params.limit) url += `limit=${params.limit}&`;
        if (params.search) url += `search=${params.search}`;
        return url;
      },
      providesTags: ['RegistrarQueue'],
    }),

    getGlobalQueueDetails: builder.query<any, string>({
      query: (clearanceId) => `/registrar/queue/${clearanceId}`,
      providesTags: (result, error, id) => [{ type: 'RegistrarQueue', id }],
    }),

    // Final Approvals
    finalApproveClearance: builder.mutation<any, { clearanceId: string; remarks?: string }>({
      query: ({ clearanceId, remarks }) => ({
        url: `/registrar/queue/${clearanceId}/approve`,
        method: 'POST',
        body: { remarks },
      }),
      invalidatesTags: ['RegistrarQueue', 'Certificates'],
    }),

    finalRejectClearance: builder.mutation<any, { clearanceId: string; remarks: string }>({
      query: ({ clearanceId, remarks }) => ({
        url: `/registrar/queue/${clearanceId}/reject`,
        method: 'POST',
        body: { remarks },
      }),
      invalidatesTags: ['RegistrarQueue'],
    }),
    
    // Certificates Management
    getAllCertificates: builder.query<any, { page?: number; search?: string }>({
      query: (params) => {
        let url = '/registrar/certificates?';
        if (params.page) url += `page=${params.page}&`;
        if (params.search) url += `search=${params.search}`;
        return url;
      },
      providesTags: ['Certificates'],
    }),

    // Staff Management
    getAllStaff: builder.query<any, { page?: number; search?: string; role?: string }>({
      query: (params) => {
        let url = '/registrar/staff?';
        if (params.page) url += `page=${params.page}&`;
        if (params.search) url += `search=${params.search}&`;
        if (params.role) url += `role=${params.role}`;
        return url;
      },
      providesTags: ['User'],
    }),

    createStaff: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: '/registrar/staff',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    
    // System Settings
    getSystemSettings: builder.query<any, void>({
      query: () => '/registrar/settings',
      providesTags: ['SystemSettings'],
    }),

    updateSystemSettings: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: '/registrar/settings',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['SystemSettings'],
    }),
  }),
});

export const {
  useGetRegistrarDashboardStatsQuery,
  useGetGlobalQueueQuery,
  useGetGlobalQueueDetailsQuery,
  useFinalApproveClearanceMutation,
  useFinalRejectClearanceMutation,
  useGetAllCertificatesQuery,
  useGetAllStaffQuery,
  useCreateStaffMutation,
  useGetSystemSettingsQuery,
  useUpdateSystemSettingsMutation,
} = registrarApi;
