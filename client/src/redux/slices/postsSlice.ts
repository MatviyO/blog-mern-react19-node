import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchPostsResponse } from "../services/posts/postsType";
import Api from "../../cores/services/axiosService";
import { IPost } from "../../cores/types/IPost";

// Async thunk for fetching posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await Api.get<FetchPostsResponse>("/posts");
  return data;
});
// how use: dispatch(fetchPosts())

type TPostsState = {
  items: IPost[];
  status: string;
  error: string;
};

const initialState: TPostsState = {
  items: [],
  status: "",
  error: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<{ id: string; name: string }>) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<FetchPostsResponse>) => {
        state.status = "succeeded";
        state.items = action.payload.result;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setPosts } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
