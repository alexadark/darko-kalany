# Command: /sync

Complete analysis of the reference site in `ref/` and creation of all corresponding components, schemas, routes, and data.

---

## Table of Contents

1. [Overview](#overview)
2. [Project Architecture](#project-architecture)
3. [Phase 1: Analysis](#phase-1-analysis)
4. [Phase 2: Sanity Configuration](#phase-2-sanity-configuration)
5. [Phase 3: Global Layout](#phase-3-global-layout)
6. [Phase 4: PageBuilder Blocks](#phase-4-pagebuilder-blocks)
7. [Phase 5: Content Types](#phase-5-content-types)
8. [Phase 6: Seed Data](#phase-6-seed-data)
9. [Phase 7: Verification](#phase-7-verification)
10. [Common Errors](#common-errors)
11. [Complete Checklist](#complete-checklist)

---

## Overview

This system uses **React Router 7** (framework mode) with **Sanity CMS**:

| Concept | Description |
|---------|-------------|
| **Normal Pages** | Composed of blocks via pageBuilder (Home, About, Contact, etc.) |
| **Content Types** | Documents with list + detail views (Projects, Blog) |
| **Global Layout** | Header, Footer, Navigation via Sanity singletons |
| **Visual Editing** | Sanity Presentation Tool support |

---

## Project Architecture

```
├── app/
│   ├── routes/
│   │   ├── home.tsx              # Home page
│   │   ├── page.tsx              # Catch-all for dynamic pages
│   │   ├── projects.tsx          # Projects list
│   │   ├── projects.$slug.tsx    # Project detail
│   │   ├── blog.tsx              # Blog list
│   │   └── blog.$slug.tsx        # Blog post detail
│   ├── routes.ts                 # Routes configuration
│   └── root.tsx                  # Layout with Header/Footer
├── components/
│   ├── blocks/                   # Block components
│   │   ├── Hero.tsx
│   │   ├── Gallery.tsx
│   │   ├── ContactForm.tsx
│   │   └── index.tsx             # Exports + BlockRenderer
│   ├── shared/                   # Shared components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── projects/                 # Project components
│   │   └── ProjectCard.tsx
│   └── blog/                     # Blog components
│       └── PostCard.tsx
├── sanity/
│   ├── schemas/
│   │   ├── blocks/               # Block schemas
│   │   ├── documents/            # Page, Post, Project, singletons
│   │   ├── objects/              # SEO, spacing, richText
│   │   └── index.ts              # Export all schemas
│   ├── lib/
│   │   ├── queries.ts            # GROQ queries
│   │   └── image.ts              # urlFor helper
│   └── structure.ts              # Custom Studio structure
└── seed/
    └── content.ndjson            # Seed data
```

---

## Phase 1: Analysis

### Step 1.1: Read reference files

```
ref/
├── components/
│   ├── Header.tsx / Navbar.tsx
│   ├── Footer.tsx
│   └── blocks/ or sections/
├── constants.ts                  # Navigation, static content
└── pages/ or routes/
```

### Step 1.2: Identify elements

**A. Global Layout:**
- [ ] Header (logo, navigation, CTA, mobile menu)
- [ ] Footer (columns, links, social, copyright)

**B. PageBuilder Blocks:**
- [ ] Hero (variations: centered, left, full screen, with video)
- [ ] Features / Services
- [ ] Gallery / Portfolio (with filters?)
- [ ] CTA (Call to Action)
- [ ] Testimonials
- [ ] Pricing
- [ ] FAQ
- [ ] Contact Form

**C. Content Types:**
- [ ] Projects (list + detail)
- [ ] Blog/Posts (list + detail)

**D. Data to extract:**
- [ ] Navigation items (labels, links, submenus)
- [ ] Contact info (email, phone, address)
- [ ] Social links (platforms, URLs)
- [ ] Form options (project types, budgets)
- [ ] Text content from each section

### Step 1.3: Questions to ask

1. "I've identified X sections. Do you want to create all of them?"
2. "Some match existing blocks. Should I adapt or create new ones?"
3. "Should I create Projects and/or Blog?"
4. "Here's the extracted navigation. Is it correct?"

---

## Phase 2: Sanity Configuration

### 2.1 siteSettings Schema

**File:** `sanity/schemas/documents/siteSettings.ts`

```typescript
import { defineType, defineField, defineArrayMember } from 'sanity';
import { CogIcon } from '@sanity/icons';

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'contact', title: 'Contact' },
    { name: 'social', title: 'Social' },
    { name: 'pagination', title: 'Pagination' },
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      group: 'general',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'general',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'contactAddress',
      title: 'Contact Address',
      type: 'text',
      rows: 3,
      group: 'contact',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      group: 'social',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter/X', value: 'twitter' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Facebook', value: 'facebook' },
                ],
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        }),
      ],
    }),
    defineField({
      name: 'projectsPerPage',
      title: 'Projects Per Page',
      type: 'number',
      initialValue: 6,
      group: 'pagination',
    }),
    defineField({
      name: 'postsPerPage',
      title: 'Posts Per Page',
      type: 'number',
      initialValue: 6,
      group: 'pagination',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
});
```

### 2.2 navigation Schema

**File:** `sanity/schemas/documents/navigation.ts`

```typescript
import { defineType, defineField, defineArrayMember } from 'sanity';
import { MenuIcon } from '@sanity/icons';

export const navigationType = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'children',
              title: 'Dropdown Items',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', type: 'string' }),
                    defineField({ name: 'link', type: 'string' }),
                  ],
                }),
              ],
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'link' },
          },
        }),
      ],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Main Navigation' };
    },
  },
});
```

### 2.3 footer Schema

**File:** `sanity/schemas/documents/footer.ts`

```typescript
import { defineType, defineField, defineArrayMember } from 'sanity';
import { BlockElementIcon } from '@sanity/icons';

const linkItem = defineArrayMember({
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string' }),
    defineField({ name: 'link', title: 'Link', type: 'string' }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'link' },
  },
});

export const footerType = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'menuLinks',
      title: 'Menu Links',
      type: 'array',
      of: [linkItem],
    }),
    defineField({
      name: 'studioLinks',
      title: 'Studio Links',
      type: 'array',
      of: [linkItem],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      description: 'Use {year} to insert the year dynamically',
    }),
    defineField({
      name: 'designCredit',
      title: 'Design Credit',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Footer' };
    },
  },
});
```

### 2.4 Studio Structure

**File:** `sanity/structure.ts`

```typescript
import type { StructureBuilder } from 'sanity/structure';
import {
  CogIcon,
  MenuIcon,
  BlockElementIcon,
  DocumentsIcon,
  ProjectsIcon,
  ComposeIcon,
  TagIcon,
} from '@sanity/icons';

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Configuration Group
      S.listItem()
        .title('Configuration')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Configuration')
            .items([
              S.listItem()
                .title('Site Settings')
                .icon(CogIcon)
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                ),
              S.listItem()
                .title('Navigation')
                .icon(MenuIcon)
                .child(
                  S.document()
                    .schemaType('navigation')
                    .documentId('navigation')
                ),
              S.listItem()
                .title('Footer')
                .icon(BlockElementIcon)
                .child(
                  S.document()
                    .schemaType('footer')
                    .documentId('footer')
                ),
            ])
        ),
      S.divider(),
      // Pages
      S.listItem()
        .title('Pages')
        .icon(DocumentsIcon)
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages')),
      // Projects
      S.listItem()
        .title('Projects')
        .icon(ProjectsIcon)
        .schemaType('project')
        .child(S.documentTypeList('project').title('Projects')),
      // Blog Posts
      S.listItem()
        .title('Blog Posts')
        .icon(ComposeIcon)
        .schemaType('post')
        .child(S.documentTypeList('post').title('Blog Posts')),
      S.divider(),
      // Taxonomies
      S.listItem()
        .title('Taxonomies')
        .icon(TagIcon)
        .child(
          S.list()
            .title('Taxonomies')
            .items([
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('tag').title('Tags'),
            ])
        ),
    ]);
```

### 2.5 Register in sanity.config.ts

```typescript
import { structure } from './sanity/structure';

export default defineConfig({
  // ...
  plugins: [
    structureTool({ structure }),
    // ...
  ],
});
```

### 2.6 Export schemas

**File:** `sanity/schemas/documents/index.ts`

```typescript
export { pageType } from './page';
export { postType } from './post';
export { projectType } from './project';
export { siteSettingsType } from './siteSettings';
export { navigationType } from './navigation';
export { footerType } from './footer';
```

**File:** `sanity/schemas/index.ts`

```typescript
import { siteSettingsType, navigationType, footerType, pageType, postType, projectType } from './documents';
// ... other imports

export const schemaTypes = [
  // Objects
  spacingType, seoType, richTextType, linkType,
  // Blocks
  heroBlock, ctaBlock, galleryBlock, contactFormBlock, /* etc */
  // Taxonomies
  categoryType, tagType,
  // Documents
  pageType, postType, projectType,
  // Singletons
  siteSettingsType, navigationType, footerType,
];
```

---

## Phase 3: Global Layout

### 3.1 GROQ Queries

**File:** `sanity/lib/queries.ts` - Add:

```typescript
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
```

### 3.2 Header Component

**File:** `app/components/shared/Header.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

interface NavigationItem {
  _key: string;
  label: string;
  link: string;
  children?: Array<{ _key: string; label: string; link: string }>;
}

interface HeaderProps {
  navigation?: {
    items?: NavigationItem[];
    ctaText?: string;
    ctaLink?: string;
  };
  settings?: {
    siteName?: string;
    logo?: { asset?: { _ref: string } };
  };
}

export function Header({ navigation, settings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const siteName = settings?.siteName || 'Site Name';
  const navItems = navigation?.items || [];
  const ctaText = navigation?.ctaText || 'Contact Us';
  const ctaLink = navigation?.ctaLink || '/contact';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (link: string) => {
    if (link === '/') return location.pathname === '/';
    return location.pathname.startsWith(link);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="font-heading text-xl uppercase tracking-tighter text-white">
            {siteName}
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item._key}
                to={item.link}
                className={`font-mono text-sm uppercase tracking-wider transition-colors ${
                  isActive(item.link) ? 'text-primary' : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link to={ctaLink} className="btn-primary">
              {ctaText}
            </Link>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item) => (
              <Link
                key={item._key}
                to={item.link}
                className={`font-heading text-3xl uppercase ${
                  isActive(item.link) ? 'text-primary' : 'text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
```

### 3.3 Footer Component

**File:** `app/components/shared/Footer.tsx`

```typescript
import { Link } from 'react-router';
import { Instagram, Linkedin, Twitter, Youtube, Facebook } from 'lucide-react';

interface FooterProps {
  footer?: {
    tagline?: string;
    menuLinks?: Array<{ _key: string; label: string; link: string }>;
    studioLinks?: Array<{ _key: string; label: string; link: string }>;
    copyright?: string;
    designCredit?: string;
  };
  settings?: {
    siteName?: string;
    contactEmail?: string;
    socialLinks?: Array<{ platform: string; url: string }>;
  };
}

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  twitter: Twitter,
  facebook: Facebook,
};

export function Footer({ footer, settings }: FooterProps) {
  const siteName = settings?.siteName || 'Site Name';
  const tagline = footer?.tagline || '';
  const contactEmail = settings?.contactEmail || '';
  const menuLinks = footer?.menuLinks || [];
  const studioLinks = footer?.studioLinks || [];
  const socialLinks = settings?.socialLinks || [];

  const currentYear = new Date().getFullYear();
  const copyright = (footer?.copyright || '© {year} All rights reserved.')
    .replace('{year}', String(currentYear));

  return (
    <footer className="bg-neutral-950 border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="font-heading text-2xl uppercase tracking-tighter mb-4 text-white">
              {siteName}
            </h3>
            {tagline && (
              <p className="text-gray-400 text-sm font-mono leading-relaxed">{tagline}</p>
            )}
          </div>

          {menuLinks.length > 0 && (
            <div>
              <h4 className="text-white font-mono uppercase text-xs tracking-widest mb-6">Menu</h4>
              <ul className="space-y-4">
                {menuLinks.map((link) => (
                  <li key={link._key}>
                    <Link to={link.link} className="text-gray-400 hover:text-primary text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {studioLinks.length > 0 && (
            <div>
              <h4 className="text-white font-mono uppercase text-xs tracking-widest mb-6">Studio</h4>
              <ul className="space-y-4">
                {studioLinks.map((link) => (
                  <li key={link._key}>
                    <Link to={link.link} className="text-gray-400 hover:text-primary text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="text-white font-mono uppercase text-xs tracking-widest mb-6">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = socialIcons[social.platform];
                if (!Icon) return null;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
            {contactEmail && (
              <div className="mt-8">
                <a href={`mailto:${contactEmail}`} className="text-gray-500 text-xs hover:text-primary transition-colors">
                  {contactEmail}
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-mono">{copyright}</p>
          {footer?.designCredit && (
            <p className="text-gray-700 text-xs font-mono uppercase">{footer.designCredit}</p>
          )}
        </div>
      </div>
    </footer>
  );
}
```

### 3.4 Integration in root.tsx

**File:** `app/root.tsx`

```typescript
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { LAYOUT_QUERY } from "@/sanity/lib/queries";

export async function loader({ request }: Route.LoaderArgs) {
  const { preview, options } = await getPreviewData(request);
  const layoutData = await loadQuery<LayoutData>(LAYOUT_QUERY, {}, options);

  return {
    preview,
    layout: layoutData.data,
    ENV: { /* ... */ },
  };
}

export default function App() {
  const data = useRouteLoaderData<typeof loader>("root");
  const location = useLocation();
  const layout = data?.layout;
  const isStudio = location.pathname.startsWith("/studio");

  return (
    <>
      {!isStudio && <Header navigation={layout?.navigation} settings={layout?.settings} />}
      <Outlet />
      {!isStudio && <Footer footer={layout?.footer} settings={layout?.settings} />}
      {data?.preview && <SanityVisualEditing />}
    </>
  );
}

// IMPORTANT: ErrorBoundary must also include Header/Footer
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const data = useRouteLoaderData<typeof loader>("root");
  const location = useLocation();
  const layout = data?.layout;
  const isStudio = location.pathname.startsWith("/studio");

  return (
    <>
      {!isStudio && <Header navigation={layout?.navigation} settings={layout?.settings} />}
      <main className="min-h-screen bg-black flex items-center justify-center p-4">
        {/* Error content */}
      </main>
      {!isStudio && <Footer footer={layout?.footer} settings={layout?.settings} />}
    </>
  );
}
```

---

## Phase 4: PageBuilder Blocks

### 4.1 ContactForm Block

**Schema:** `sanity/schemas/blocks/contactForm.ts`

```typescript
import { defineType, defineField } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons';

export const contactFormBlock = defineType({
  name: 'contactFormBlock',
  title: 'Contact Form',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    // Shared fields
    defineField({ name: 'sectionTitle', title: 'Section Title', type: 'string' }),
    defineField({ name: 'sectionSubtitle', title: 'Section Subtitle', type: 'string' }),
    defineField({ name: 'spacing', title: 'Spacing', type: 'spacing' }),
    defineField({ name: 'anchorId', title: 'Anchor ID', type: 'slug' }),
    // Specific fields
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'email', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'text', rows: 3 }),
    defineField({
      name: 'projectTypes',
      title: 'Project Types',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'budgetRanges',
      title: 'Budget Ranges',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'submitButtonText', title: 'Submit Button Text', type: 'string' }),
  ],
  preview: {
    select: { title: 'sectionTitle', subtitle: 'heading' },
    prepare({ title, subtitle }) {
      return { title: title || 'Contact Form', subtitle };
    },
  },
});
```

**Component:** `app/components/blocks/ContactForm.tsx`

```typescript
'use client';

import { useState } from 'react';

interface ContactFormProps {
  heading?: string;
  description?: string;
  email?: string;
  address?: string;
  projectTypes?: string[];
  budgetRanges?: string[];
  submitButtonText?: string;
}

export function ContactForm({
  heading = 'Contact',
  description = 'Tell us about your project.',
  email = 'hello@example.com',
  address = '',
  projectTypes = ['Other'],
  budgetRanges = ['$1k - $5k'],
  submitButtonText = 'Send',
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Thank you for your inquiry!');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-5xl md:text-7xl font-heading text-white mb-6">{heading}</h2>
          <p className="text-gray-400 text-lg font-light mb-12">{description}</p>
          <div className="space-y-8 font-mono text-sm">
            <div>
              <h4 className="text-gray-500 uppercase mb-2">Email</h4>
              <a href={`mailto:${email}`} className="text-white text-xl hover:text-primary transition-colors">
                {email}
              </a>
            </div>
            {address && (
              <div>
                <h4 className="text-gray-500 uppercase mb-2">Studio</h4>
                <p className="text-white whitespace-pre-line">{address}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/5 p-8 md:p-12 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields */}
            <button type="submit" className="btn-primary w-full">
              {isSubmitting ? 'Sending...' : submitButtonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
```

### 4.2 Gallery Block with filters

**Add to schema:** `enableFilters` field

```typescript
defineField({
  name: 'enableFilters',
  title: 'Enable Filters',
  type: 'boolean',
  initialValue: false,
}),
```

**Component with filters:**

```typescript
const [activeFilter, setActiveFilter] = useState<string>('all');

const categories = useMemo(() => {
  const cats = images.map((img) => img.category).filter(Boolean);
  return [...new Set(cats)];
}, [images]);

const filteredImages = useMemo(() => {
  if (activeFilter === 'all') return images;
  return images.filter((img) => img.category === activeFilter);
}, [images, activeFilter]);

// Render filter buttons
{enableFilters && categories.length > 0 && (
  <div className="mb-12 flex flex-wrap gap-3">
    <button
      onClick={() => setActiveFilter('all')}
      className={activeFilter === 'all' ? 'bg-primary text-black' : 'text-gray-400'}
    >
      All
    </button>
    {categories.map((cat) => (
      <button key={cat} onClick={() => setActiveFilter(cat)}>
        {cat}
      </button>
    ))}
  </div>
)}
```

---

## Phase 5: Content Types

### 5.1 Routes Configuration

**File:** `app/routes.ts`

```typescript
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  // API routes
  route("api/preview-mode/enable", "routes/api.preview-mode.enable.tsx"),
  route("api/preview-mode/disable", "routes/api.preview-mode.disable.tsx"),
  // Studio
  route("studio/*", "routes/studio.tsx"),
  // IMPORTANT: Content types BEFORE catch-all
  route("projects", "routes/projects.tsx"),
  route("projects/:slug", "routes/projects.$slug.tsx"),
  route("blog", "routes/blog.tsx"),
  route("blog/:slug", "routes/blog.$slug.tsx"),
  // Catch-all MUST be last
  route("*", "routes/page.tsx"),
] satisfies RouteConfig;
```

### 5.2 Queries with pagination

```typescript
export const PROJECTS_PAGINATED_QUERY = groq`
  *[_type == "project"] | order(year desc) [$start...$end] {
    _id, title, slug, excerpt, featuredImage, client, year, featured,
    categories[]->{ _id, title, slug }
  }
`;

export const PROJECTS_COUNT_QUERY = groq`count(*[_type == "project"])`;

export const POSTS_PAGINATED_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc) [$start...$end] {
    _id, title, slug, excerpt, featuredImage, publishedAt, author,
    categories[]->{ _id, title, slug }
  }
`;

export const POSTS_COUNT_QUERY = groq`count(*[_type == "post"])`;
```

### 5.3 ProjectCard Component

**File:** `app/components/projects/ProjectCard.tsx`

```typescript
import { Link } from 'react-router';
import { urlFor } from '@/sanity/lib/image';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    featuredImage?: { asset?: { _ref: string }; alt?: string };
    categories?: Array<{ _id: string; title: string }>;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const category = project.categories?.[0];

  return (
    <Link to={`/projects/${project.slug.current}`} className="group block relative overflow-hidden">
      <div className="aspect-[4/3] relative overflow-hidden bg-neutral-900">
        {project.featuredImage?.asset && (
          <img
            src={urlFor(project.featuredImage).width(800).height(600).url()}
            alt={project.featuredImage.alt || project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
        <div className="absolute top-4 right-4 w-10 h-10 bg-primary text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <ArrowUpRight size={20} />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {category && (
          <span className="text-primary font-mono text-xs uppercase tracking-wider">{category.title}</span>
        )}
        <h3 className="text-xl font-heading text-white group-hover:text-primary transition-colors">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
```

---

## Phase 6: Seed Data

### 6.1 NDJSON Format

Each line = one complete JSON document. **IMPORTANT:** Field names must match schemas EXACTLY.

### 6.2 Complete Example

**File:** `seed/content.ndjson`

```jsonl
{"_type": "siteSettings", "_id": "siteSettings", "siteName": "My Site", "siteDescription": "Site description", "contactEmail": "hello@example.com"}
{"_type": "navigation", "_id": "navigation", "items": [{"_key": "n1", "label": "Home", "link": "/"}, {"_key": "n2", "label": "About", "link": "/about"}], "ctaText": "Contact", "ctaLink": "/contact"}
{"_type": "footer", "_id": "footer", "tagline": "Your tagline here.", "copyright": "© {year} All rights reserved."}
{"_type": "category", "_id": "cat-design", "title": "Design", "slug": {"_type": "slug", "current": "design"}}
{"_type": "page", "_id": "page-home", "title": "Home", "slug": {"_type": "slug", "current": "/"}, "pageBuilder": [{"_type": "heroBlock", "_key": "hero1", "heading": "Welcome"}]}
```

### 6.3 Important Rules

| Rule | Correct Example | Incorrect Example |
|------|-----------------|-------------------|
| `_key` required in arrays | `{"_key": "abc123", ...}` | `{...}` without _key |
| Fields = schema names | `enableFilters` | `showFilters` |
| References | `{"_type": "reference", "_ref": "cat-1", "_key": "r1"}` | `{"_ref": "cat-1"}` |
| Slug format | `{"_type": "slug", "current": "my-slug"}` | `"my-slug"` |

---

## Phase 7: Verification

### 7.1 Import data

```bash
npx sanity dataset import seed/content.ndjson production --replace
```

### 7.2 Build

```bash
npm run build
```

### 7.3 Manual Tests

- [ ] Homepage displays with Header/Footer
- [ ] Navigation works
- [ ] Dynamic pages work
- [ ] 404 page has Header/Footer
- [ ] /projects lists projects
- [ ] /projects/[slug] shows detail
- [ ] Visual Editing works

---

## Common Errors

### 1. 404 Page without Header/Footer

**Cause:** ErrorBoundary doesn't render Header/Footer
**Solution:** See section 3.4

### 2. Pages return 404 despite seed data

**Cause:** Data not imported
**Solution:**
```bash
npx sanity dataset import seed/content.ndjson production --replace
```

### 3. Catch-all route before content types

**Incorrect:**
```typescript
route("*", "routes/page.tsx"),
route("projects", "routes/projects.tsx"), // Never reached!
```

**Correct:**
```typescript
route("projects", "routes/projects.tsx"),
route("*", "routes/page.tsx"), // Last
```

### 4. Incorrect field names in seed data

| Schema | Seed Data |
|--------|-----------|
| `enableLightbox` | `enableLightbox` (not `showLightbox`) |
| `enableFilters` | `enableFilters` (not `showFilters`) |

---

## Complete Checklist

### Sanity Configuration
- [ ] siteSettings schema created
- [ ] navigation schema created
- [ ] footer schema created
- [ ] Studio structure configured
- [ ] Schemas exported in index.ts

### Layout
- [ ] Header.tsx created with mobile menu
- [ ] Footer.tsx created with social icons
- [ ] LAYOUT_QUERY added
- [ ] root.tsx loads layout data
- [ ] ErrorBoundary includes Header/Footer

### Blocks
- [ ] All identified blocks created
- [ ] Schemas in blocks/index.ts
- [ ] Components in components/blocks/index.tsx

### Content Types
- [ ] Routes in routes.ts BEFORE catch-all
- [ ] Queries with pagination
- [ ] Card components created

### Seed Data
- [ ] Singletons created
- [ ] Categories/Tags created
- [ ] Pages created
- [ ] Field names match schemas

### Validation
- [ ] npm run build passes
- [ ] Sanity import successful
- [ ] All pages accessible

---

## Quick Commands

```bash
# Import seed data
npx sanity dataset import seed/content.ndjson production --replace

# Verify documents
npx sanity documents query '*[_type == "siteSettings"][0]'

# Build
npm run build

# Dev
npm run dev
```
