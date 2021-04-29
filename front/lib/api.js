async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.STRAPI_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export async function getProducers() {
  const data = fetchAPI(`
    query {
      producers {
        title_en
        title_de
        location_en
        location_de
        people_en
        people_de
        experience_en
        experience_de
        distance
        products_en
        products_de
        imageSide
        link
        coverImage {
          url
          width
          height
        }
      }
    }
  `);
  return data;
}

export async function getLocal() {
  const data = fetchAPI(`
    query {
      local {
        title_en
        title_de
        content_en
        content_de
      }
    }
  `);
  return data;
}

export async function getSoul() {
  const data = fetchAPI(`
    query {
      soul {
        title_en
        title_de
        content_en
        content_de
      }
    }
  `);
  return data;
}

export async function getEvent() {
  const data = fetchAPI(`
    query {
      event {
        title_en
        title_de
        content_en
        content_de
        galleryImages {
          url
          width
          height
        }
      }
    }
  `);
  return data;
}

export async function getDaily() {
  const data = fetchAPI(`
    query {
      daily {
        title_en
        title_de
        content_en
        content_de
      }
    }
  `);
  return data;
}

export async function getSeasonal() {
  const data = fetchAPI(`
    query {
      seasonal {
        title_en
        title_de
        content_en
        content_de
      }
    }
  `);
  return data;
}

export async function getAllPostsWithSlug() {
  const data = fetchAPI(`
    {
      posts {
        slug
      }
    }
  `);
  return data?.allPosts;
}

export async function getAllPostsForSoul() {
  const data = await fetchAPI(`
    query {
      posts(sort: "date:desc", limit: 10) {
        title_en
        title_de
        excerpt_en
        excerpt_de
        slug
        date
        coverImage {
          url
        }
      }
    }
  `)
  return data?.posts;
}

export async function getPostAndMorePosts(slug) {
  const data = await fetchAPI(
    `
  query PostBySlug($where: JSON, $where_ne: JSON) {
    posts(where: $where) {
      title_en
      title_de
      excerpt_en
      excerpt_de
      content_en
      content_de
      slug
      date
      coverImage {
        url
      }
      video {
        url
      }
    }

    morePosts: posts(sort: "date:desc", limit: 3, where: $where_ne) {
      title_en
      title_de
      excerpt_en
      excerpt_de
      content_en
      content_de
      slug
      date
      coverImage {
        url
      }
    }
  }
  `,
    {
      variables: {
        where: {
          slug,
        },
        where_ne: {
          slug_ne: slug,
        },
      },
    },
  );
  return data;
}
