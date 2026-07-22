import { baseApi } from './baseApi';

export const publicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicStats: builder.query<
      { success: boolean; data: { totalStudentsCleared: number; totalDepartments: number; avgApprovalTimeHours: number } },
      void
    >({
      query: () => ({
        url: '/reports/public/stats',
        method: 'GET',
      }),
    }),
    verifyCertificate: builder.mutation<
      { success: boolean; data: any },
      string
    >({
      query: (certificateNumber) => ({
        url: `/certificates/verify/${certificateNumber}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetPublicStatsQuery, useVerifyCertificateMutation } = publicApi;
