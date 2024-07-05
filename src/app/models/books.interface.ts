export interface BookResponse {
  bookId: number;
  etag: string;
  title: string;
  subtitle?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  categories?: string[];
  thumbnail?: string;
}
