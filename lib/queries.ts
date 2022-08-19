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
  BOOKS_IMAGES_BY_SAGA: `
    query {
      bookCollection(where: {saga: { title_contains: "$sagaTitle" }}) {
      items {
        slug
        title
        image {
          url
          }
        }
      }
    }`,
  ALL_SAGAS: `
    query {
      sagaCollection {
        items {
          title
        }
      }
    }`,
};
