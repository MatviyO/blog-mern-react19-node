import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../../cores/services/axiosService";
import { FetchLoginResponse, IUserLogin } from "../types/userType";
import { handleFulfilled, handlePending, handleRejected } from "../helpers/handlerStatuses";

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
      .addCase(fetchUserLogin.pending, handlePending)
      .addCase(fetchUserLogin.fulfilled, handleFulfilled)
      .addCase(fetchUserLogin.rejected, handleRejected)

      .addCase(fetchGetMe.pending, handlePending)
      .addCase(fetchGetMe.fulfilled, handleFulfilled)
      .addCase(fetchGetMe.rejected, handleRejected)

      .addCase(fetchUserRegister.pending, handlePending)
      .addCase(fetchUserRegister.fulfilled, handleFulfilled)
      .addCase(fetchUserRegister.rejected, handleRejected);
  },
});
export const { logout } = userSlice.actions;
export const userSliceActions = userSlice.actions;
export const userReducer = userSlice.reducer;
