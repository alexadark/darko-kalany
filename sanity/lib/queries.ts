import { groq } from 'next-sanity';

// Page queries
export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    pageBuilder[] {
      _key,
      _type,
      sectionTitle,
      sectionSubtitle,
      spacing,
      anchorId,
      ...,
      // Expand project references in featuredProjectsBlock
      _type == "featuredProjectsBlock" => {
        ...,
        projects[]-> {
          _id,
          title,
          slug,
          excerpt,
          featuredImage,
          client,
          year,
          categories[]->{ _id, title }
        }
      }
    },
    seo
  }
`;

export const PAGES_QUERY = groq`
  *[_type == "page"] | order(title asc) {
    _id,
    title,
    slug
  }
`;

// Post queries
export const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    content,
    author,
    publishedAt,
    categories[]->{ _id, title, slug },
    tags[]->{ _id, title, slug },
    seo
  }
`;

export const POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    categories[]->{ _id, title, slug }
  }
`;

// Project queries
export const PROJECT_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    gallery,
    content,
    client,
    year,
    services,
    url,
    categories[]->{ _id, title, slug },
    tags[]->{ _id, title, slug },
    seo
  }
`;

export const PROJECTS_QUERY = groq`
  *[_type == "project"] | order(year desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    client,
    year,
    featured
  }
`;
