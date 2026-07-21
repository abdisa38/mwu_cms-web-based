import { baseApi } from '@/api/baseApi';

export const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Dashboard Stats
    getStaffDashboardStats: builder.query<any, void>({
      query: () => '/staff/dashboard',
      providesTags: ['StaffQueue'],
    }),

    // Clearance Queue
    getDepartmentQueue: builder.query<any, { status?: string; page?: number; limit?: number; search?: string }>({
      query: (params) => {
        let url = '/staff/queue?';
        if (params.status) url += `status=${params.status}&`;
        if (params.page) url += `page=${params.page}&`;
        if (params.limit) url += `limit=${params.limit}&`;
        if (params.search) url += `search=${params.search}`;
        return url;
      },
      providesTags: ['StaffQueue'],
    }),

    getQueueItemDetails: builder.query<any, string>({
      query: (clearanceId) => `/staff/queue/${clearanceId}`,
      providesTags: (result, error, id) => [{ type: 'StaffQueue', id }],
    }),

    // Workflow Actions
    approveClearance: builder.mutation<any, { clearanceId: string; remarks?: string }>({
      query: ({ clearanceId, remarks }) => ({
        url: `/staff/queue/${clearanceId}/approve`,
        method: 'POST',
        body: { remarks },
      }),
      invalidatesTags: ['StaffQueue'],
    }),

    rejectClearance: builder.mutation<any, { clearanceId: string; remarks: string }>({
      query: ({ clearanceId, remarks }) => ({
        url: `/staff/queue/${clearanceId}/reject`,
        method: 'POST',
        body: { remarks },
      }),
      invalidatesTags: ['StaffQueue'],
    }),
    
    // Students Management
    getDepartmentStudents: builder.query<any, { page?: number; search?: string }>({
      query: (params) => {
        let url = '/staff/students?';
        if (params.page) url += `page=${params.page}&`;
        if (params.search) url += `search=${params.search}`;
        return url;
      },
      providesTags: ['User'],
    }),
    
    // Reports
    getDepartmentReports: builder.query<any, { startDate?: string; endDate?: string }>({
      query: (params) => {
        let url = '/staff/reports?';
        if (params.startDate) url += `startDate=${params.startDate}&`;
        if (params.endDate) url += `endDate=${params.endDate}`;
        return url;
      },
    }),
  }),
});

export const {
  useGetStaffDashboardStatsQuery,
  useGetDepartmentQueueQuery,
  useGetQueueItemDetailsQuery,
  useApproveClearanceMutation,
  useRejectClearanceMutation,
  useGetDepartmentStudentsQuery,
  useGetDepartmentReportsQuery,
} = staffApi;
