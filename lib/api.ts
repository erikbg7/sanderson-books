import { queries } from './queries';

const fetchGraphQL = async (query: string, preview = false) => {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
};

const getAllBooksImages = async () => {
  const entries = await fetchGraphQL(queries.ALL_BOOKS_IMAGES);
  const books = entries.data.bookCollection.items;
  return books;
};

const getAllSagas = async () => {
  const entries = await fetchGraphQL(queries.ALL_SAGAS);
  const sagas = entries.data.sagaCollection.items;
  return sagas;
};

const getBooksImagesBySaga = async (sagaTitle: string) => {
  const entries = await fetchGraphQL(queries.BOOKS_IMAGES_BY_SAGA.replace('$sagaTitle', sagaTitle));
  const books = entries.data.bookCollection.items;
  return { books, title: sagaTitle };
};

const getAllBooksSlugs = async () => {
  const entries = await fetchGraphQL(queries.ALL_BOOKS_SLUGS);
  const slugs = entries.data.bookCollection.items;
  return slugs;
};

const getBookBySlug = async (slug: string) => {
  const entries = await fetchGraphQL(queries.BOOK_BY_SLUG.replace('$slug', slug));
  const book = entries.data.bookCollection.items[0];
  return book;
};

export { getAllBooksImages, getAllSagas, getBooksImagesBySaga, getAllBooksSlugs, getBookBySlug };
