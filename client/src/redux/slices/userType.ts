import { IBaseResponse } from "../../cores/types/IBaseResponse";

export interface IUserLogin {
  email: string;
  password: string;
}

export interface FetchLoginResponse extends IBaseResponse {
  result: IUserLogin;
}
