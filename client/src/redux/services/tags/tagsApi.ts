import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchTagsResponse } from "../posts/postsType";

export const tagsApi = createApi({
  reducerPath: "tagsApi",
  tagTypes: ["tags"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4444/",
  }),
  endpoints: (builder) => ({
    fetchTags: builder.query<string[], void>({
      query: () => "tags",
      transformResponse: (response: FetchTagsResponse) => response.result,
    }),
  }),
});

export const { useFetchTagsQuery } = tagsApi;
