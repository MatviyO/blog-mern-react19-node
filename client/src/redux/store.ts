import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "./services/posts/postsApi";
import { postsReducer } from "./slices/postsSlice";
import { tagsApi } from "./services/tags/tagsApi";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware).concat(tagsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
