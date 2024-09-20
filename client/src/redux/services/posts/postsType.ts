import { IPost } from "../../../cores/types/IPost";
import { IBaseResponse } from "../../../cores/types/IBaseResponse";

export interface FetchPostsResponse extends IBaseResponse {
  result: IPost[];
}

export interface FetchPostResponse extends IBaseResponse {
  result: IPost;
}

export interface FetchTagsResponse extends IBaseResponse {
  result: string[];
}
