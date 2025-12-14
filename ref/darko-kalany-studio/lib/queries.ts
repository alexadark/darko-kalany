
// PAGE BUILDER
export const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0] {
  title,
  pageBuilder[]{
    ...,
    _type == 'featuredProjectsBlock' => {
        ...,
        projects[]->{ 
            _id, 
            title, 
            category, 
            year, 
            client, 
            description, 
            "image": mainImage.asset->url 
        }
    },
    _type == 'serviceListBlock' => {
        ...,
        services[]->{
            _id,
            title,
            description,
            features
        }
    },
    _type == 'galleryBlock' => {
        ...,
        images[]{
            "src": asset->url,
            title,
            category,
            aspectRatio,
            "_key": _key
        }
    },
    _type == 'pricingBlock' => {
        ...,
        tiers[]->{
            name,
            price,
            description,
            features,
            isPopular
        }
    },
    _type == 'faqBlock' => {
        ...,
        faqs[]->{
            question,
            answer
        }
    }
  }
}`;

// PROJECTS
export const PROJECTS_QUERY = `*[_type == "project"] | order(year desc) {
  _id,
  title,
  "slug": slug.current,
  category,
  description,
  mainImage,
  year,
  client
}`;

export const PROJECT_DETAIL_QUERY = `*[_type == "project" && _id == $id][0] {
  _id,
  title,
  "slug": slug.current,
  category,
  description,
  mainImage,
  year,
  client,
  content
}`;

// SERVICES
export const SERVICES_QUERY = `*[_type == "service"] {
  _id,
  title,
  description,
  features
}`;

// PRICING
export const PRICING_QUERY = `*[_type == "pricingTier"] | order(order asc) {
  name,
  price,
  description,
  features,
  isPopular
}`;

// TESTIMONIALS
export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] {
  _id,
  quote,
  author,
  role,
  company
}`;
