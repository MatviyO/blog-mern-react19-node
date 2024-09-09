import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Api from "../../cores/services/axiosService";
import { FetchLoginResponse, IUserLogin } from "../types/userType";

export const fetchUserLogin = createAsyncThunk("user/fetchLogin", async (form: IUserLogin) => {
  const { data } = await Api.post<FetchLoginResponse>("/auth/login", form);
  return data;
});

export const fetchUserRegister = createAsyncThunk(
  "user/fetchRegister",
  async (form: IUserLogin) => {
    const { data } = await Api.post<FetchLoginResponse>("/auth/register", form);
    return data;
  },
);

export const fetchGetMe = createAsyncThunk("user/fetchUser", async () => {
  const { data } = await Api.get<FetchLoginResponse>("/auth/getUser");
  return data;
});

export type TUserState = {
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
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserLogin.fulfilled, (state, action: PayloadAction<FetchLoginResponse>) => {
        state.status = "succeeded";
        state.user = action.payload.result;
        state.error = "";
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchGetMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGetMe.fulfilled, (state, action: PayloadAction<FetchLoginResponse>) => {
        state.status = "succeeded";
        state.user = action.payload.result;
        state.error = "";
      })
      .addCase(fetchGetMe.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchUserRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserRegister.fulfilled, (state, action: PayloadAction<FetchLoginResponse>) => {
        state.status = "succeeded";
        state.user = action.payload.result;
        state.error = "";
      })
      .addCase(fetchUserRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});
export const { logout } = userSlice.actions;
export const userSliceActions = userSlice.actions;
export const userReducer = userSlice.reducer;
