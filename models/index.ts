type Book = {
  slug: string;
  title: string;
  year: number;
  saga: BookSaga;
  summary: string;
  description: { json: any };
  image: { url: string };
};

type BookList = {
  title: string;
  books: Book[];
};

type BookSaga = {
  title: string;
  image: { url: string };
};

type BookArtwork = Pick<Book, 'slug' | 'title' | 'image'>;

type BookSlug = Pick<Book, 'slug'>;

export type { Book, BookArtwork, BookList, BookSaga, BookSlug };
