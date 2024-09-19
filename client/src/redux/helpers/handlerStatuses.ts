import { PayloadAction } from "@reduxjs/toolkit";
import { FetchLoginResponse } from "../types/userType";
import { TUserState } from "../slices/userSlice";

const handlePending = (state: TUserState) => {
  state.status = "loading";
};

const handleFulfilled = (state: TUserState, action: PayloadAction<FetchLoginResponse>) => {
  state.status = "succeeded";
  state.user = action.payload.result;
  state.error = "";
};

const handleRejected = (state: TUserState, action: any) => {
  state.status = "failed";
  state.error = action.error.message || "Something went wrong";
};

export { handleFulfilled, handlePending, handleRejected };
