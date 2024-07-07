import { Bookshelf } from "./bookshelf.interface";

export interface User {
    userId: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    avatarUrl: string,
    bookshelves: Bookshelf[]
}
