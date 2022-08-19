const fetchGraphQL = async(query: any, preview = false) =>{
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
  ).then((response) => response.json())
}


export async function getAllPostsForHome() {
  const entries = await fetchGraphQL(
    `query {
      bookCollection(preview: false) {
        items {
          title
        }
      }
    }`,
  )

  const books = entries.data.bookCollection.items;
  return books
}



