import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchPostResponse, FetchPostsResponse } from "./postsType";
import { IPost, IPostForm } from "../../../cores/types/IPost";

export const postsApi = createApi({
  reducerPath: "postsApi",
  tagTypes: ["posts"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4444/",
    prepareHeaders: (headers) => {
      const userL = localStorage.getItem("user");
      if (userL) {
        const { token } = JSON.parse(userL);
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchPosts: builder.query<IPost[], void>({
      query: () => "posts",
      transformResponse: (response: FetchPostsResponse) => response.result,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "posts" as const, id: _id })),
              { type: "posts", id: "LIST" },
            ]
          : [{ type: "posts", id: "LIST" }],
    }),
    fetchPostById: builder.query<IPost, string>({
      query: (id) => `posts/${id}`,
      transformResponse: (response: FetchPostResponse) => response.result,
      providesTags: (result, error, id) => [{ type: "posts", id }],
    }),
    createPost: builder.mutation<IPostForm, Partial<IPostForm>>({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: [{ type: "posts", id: "LIST" }],
    }),
    deletePost: builder.mutation<void, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "posts", id }],
    }),
    updatePost: builder.mutation<IPost, { id: string; data: Partial<IPostForm> }>({
      query: ({ id, data }) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "posts", id }],
    }),
  }),
});

export const {
  useUpdatePostMutation,
  useFetchPostsQuery,
  useFetchPostByIdQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postsApi;
