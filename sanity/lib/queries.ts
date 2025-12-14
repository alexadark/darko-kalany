import groq from "groq";

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
    author,
    categories[]->{ _id, title, slug }
  }
`;

// Posts with pagination
export const POSTS_PAGINATED_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    author,
    categories[]->{ _id, title, slug }
  }
`;

export const POSTS_COUNT_QUERY = groq`
  count(*[_type == "post"])
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
    featured,
    categories[]->{ _id, title, slug }
  }
`;

// Projects with pagination
export const PROJECTS_PAGINATED_QUERY = groq`
  *[_type == "project"] | order(year desc) [$start...$end] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    client,
    year,
    featured,
    categories[]->{ _id, title, slug }
  }
`;

export const PROJECTS_COUNT_QUERY = groq`
  count(*[_type == "project"])
`;

// Site Settings (singleton)
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    logo,
    contactEmail,
    contactPhone,
    contactAddress,
    socialLinks,
    projectsPerPage,
    postsPerPage
  }
`;

// Navigation (singleton)
export const NAVIGATION_QUERY = groq`
  *[_type == "navigation"][0] {
    items[] {
      _key,
      label,
      link,
      children[] {
        _key,
        label,
        link
      }
    },
    ctaText,
    ctaLink
  }
`;

// Footer (singleton)
export const FOOTER_QUERY = groq`
  *[_type == "footer"][0] {
    tagline,
    menuLinks[] {
      _key,
      label,
      link
    },
    studioLinks[] {
      _key,
      label,
      link
    },
    copyright,
    designCredit
  }
`;

// Layout query (combines navigation, footer, settings)
export const LAYOUT_QUERY = groq`
{
  "settings": *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    logo,
    contactEmail,
    socialLinks,
    projectsPerPage,
    postsPerPage
  },
  "navigation": *[_type == "navigation"][0] {
    items[] {
      _key,
      label,
      link,
      children[] {
        _key,
        label,
        link
      }
    },
    ctaText,
    ctaLink
  },
  "footer": *[_type == "footer"][0] {
    tagline,
    menuLinks[] {
      _key,
      label,
      link
    },
    studioLinks[] {
      _key,
      label,
      link
    },
    copyright,
    designCredit
  }
}
`;

// Categories query
export const CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug
  }
`;
