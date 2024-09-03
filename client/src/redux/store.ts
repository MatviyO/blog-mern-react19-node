import { configureStore } from '@reduxjs/toolkit';
import {postsApi} from "./services/posts/postsApi";
import {postsReducer} from "./slices/postsSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        [postsApi.reducerPath]: postsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;