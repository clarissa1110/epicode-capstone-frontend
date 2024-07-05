import { Bookshelf } from "./bookshelf.interface";

export interface User {
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    avatarUrl: string,
    bookshelves: Bookshelf[]
}
