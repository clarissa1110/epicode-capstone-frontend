export interface Books {
  items: BookResponse[];
}

export interface BookResponse {
  id: string;
  etag: string;
  volumeInfo: VolumeInfo;
}

export interface VolumeInfo {
  title: string;
  subtitle?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  categories?: string[];
  imageLinks?: ImageLinks;
}

export interface ImageLinks {
  thumbnail?: string;
}
