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
  BOOK_BY_SLUG: `
    query {
      bookCollection(where: {slug: "$slug" }) {
        items {
          slug
          title
          summary
          year
          saga {
            title
            image {
              url
            }
          }
          description {
            json
          }
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
  ALL_BOOKS_SLUGS: `
    query {
      bookCollection {
        items {
          slug
        }
      }
    }`,
};
