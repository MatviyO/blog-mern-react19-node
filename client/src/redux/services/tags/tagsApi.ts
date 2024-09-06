import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tagsApi = createApi({
  reducerPath: "tagsApi",
  tagTypes: ["tags"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4444/",
  }),
  endpoints: (builder) => ({
    fetchPosts: builder.query<string[], void>({
      query: () => "tags",
    }),
  }),
});

export const { useFetchPostsQuery: useFetchTagsQuery } = tagsApi;
