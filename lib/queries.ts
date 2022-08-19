export const queries = {
  ALL_BOOKS_IMAGES: `
    query {
      bookCollection {
        items {
          slug
          title
          image {
            url
          }
        }
      }
    }`,
};
