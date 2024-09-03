import {IAuthor} from "./IAuthor";

export interface IPost {
    _id: string;
    title: string;
    description: string;
    tags: string[];
    viewsCount: number;
    author: IAuthor;
    createdAt: string;
    updatedAt: string;
    imageUrl?: string;
}
