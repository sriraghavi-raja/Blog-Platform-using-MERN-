import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000/api/auth',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response) => {
        return {
          _id: response._id,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          age: response.age,
          token: response.token
        };
      },
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
      transformResponse: (response) => {
        if (!response._id || !response.token) {
          throw new Error('Invalid response from server');
        }
        return {
          _id: response._id,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          age: response.age,
          token: response.token
        };
      },
    }),
    getProfile: builder.query({
      query: () => '/profile',
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: '/profile',
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { 
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = authApi;