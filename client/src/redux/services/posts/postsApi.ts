import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchPostResponse, FetchPostsResponse } from "./postsType";
import { IPost } from "../../../cores/types/IPost";

export const postsApi = createApi({
  reducerPath: "postsApi",
  tagTypes: ["posts"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4444/",
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
  }),
});

export const { useFetchPostsQuery, useFetchPostByIdQuery } = postsApi;
