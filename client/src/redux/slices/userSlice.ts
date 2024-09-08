import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Api from "../../cores/services/axiosService";
import { FetchLoginResponse, IUserLogin } from "./userType";

export const fetchUserLogin = createAsyncThunk("user/fetchLogin", async (form: IUserLogin) => {
  const { data } = await Api.post<FetchLoginResponse>("/auth/login", form);
  return data;
});
// how use: dispatch(fetchPosts())

type TUserState = {
  user: IUserLogin | null;
  status: string;
  error: string;
};

const initialState: TUserState = {
  user: null,
  status: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserLogin.fulfilled, (state, action: PayloadAction<FetchLoginResponse>) => {
        state.status = "succeeded";
        state.user = action.payload.result;
        state.error = '';
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const postsReducer = userSlice.reducer;
