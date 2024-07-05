import { BookResponse } from "./books.interface";

export interface Bookshelf {
    bookshelfId: number,
    name: string,
    bookList: BookResponse[]
}
