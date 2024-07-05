import { BookResponse } from "./books.interface";

export interface Bookshelf {
    bookshelfId: number,
    userId: number,
    name: string,
    bookList: BookResponse[]
}
