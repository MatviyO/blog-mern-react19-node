import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchPostsResponse } from "../services/posts/postsType";
import Api from "../../cores/services/axiosService";
import { IPost } from "../../cores/types/IPost";

export const fetchPosts = () =>
  createAsyncThunk("posts/fetchPosts", async () => {
    const { data } = await Api.get<FetchPostsResponse>("/posts");
    return data;
  });
// how use: dispatch(fetchPosts())

type TPostsState = {
  posts: IPost[];
  status: string;
  error: string;
};

const initialState: TPostsState = {
  posts: [],
  status: "",
  error: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ id: string; name: string }>) {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload.result;
    });
  },
});

export const { setUser } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
