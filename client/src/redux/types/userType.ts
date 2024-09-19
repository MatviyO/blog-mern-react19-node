import { IBaseResponse } from "../../cores/types/IBaseResponse";

export interface IUserLogin {
  email: string;
  password: string;
  token?: string;
}

export interface IUserRegister {
  email: string;
  password: string;
  fullName: string;
}

export interface User {
  _id: string;
  imageUrl: string;
  createdAt: string;
  email: string;
  fullName: string;
  password: string;
  token: string;
  updatedAt: string;
  __v: number;
}

export interface FetchLoginResponseDispatch {
  payload: {
    result: User;
  };
}

export interface FetchLoginResponse extends IBaseResponse {
  result: User;
}
