import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userInfo?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Post', 'User'],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => 'posts',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Post', id })), 'Post']
          : ['Post'],
    }),
    getUserPosts: builder.query({
      query: (userId) => `posts/user/${userId}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Post', id })), 'Post']
          : ['Post'],
    }),
    getPostById: builder.query({
      query: (postId) => `posts/${postId}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    createPost: builder.mutation({
      query: (post) => ({
        url: 'posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...post }) => ({
        url: `posts/${id}`,
        method: 'PUT',
        body: post,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetUserPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = api;