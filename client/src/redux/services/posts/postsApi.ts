import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {FetchPostsResponse} from "./postsType";
import {IPost} from "../../../cores/types/IPost";

export const postsApi = createApi({
    reducerPath: 'postsApi',
    tagTypes: ['posts'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4444/'
    }),
    endpoints: (builder) => ({
        fetchPosts: builder.query<IPost[], void>({
            query: () => 'posts',
            transformResponse: (response: FetchPostsResponse) => response.result,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'posts' as const, id: _id })),
                        { type: 'posts', id: 'LIST' },
                    ]
                    : [{ type: 'posts', id: 'LIST' }],
        }),
        addPost: builder.mutation<void, { name: string }>({
            query: (newUser) => ({
                url: 'users',
                method: 'POST',
                body: newUser,
            }),
        }),
    }),
});

export const { useFetchPostsQuery, useAddPostMutation } = postsApi;