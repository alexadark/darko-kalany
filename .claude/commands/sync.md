# Commande: /sync

Analyse complète du site de référence dans `ref/` et création de tous les composants, schemas, routes et données correspondants.

---

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture du projet](#architecture-du-projet)
3. [Phase 1: Analyse](#phase-1-analyse)
4. [Phase 2: Configuration Sanity](#phase-2-configuration-sanity)
5. [Phase 3: Layout global](#phase-3-layout-global)
6. [Phase 4: Blocs pageBuilder](#phase-4-blocs-pagebuilder)
7. [Phase 5: Content Types](#phase-5-content-types)
8. [Phase 6: Seed Data](#phase-6-seed-data)
9. [Phase 7: Vérification](#phase-7-vérification)
10. [Erreurs courantes](#erreurs-courantes)
11. [Checklist complète](#checklist-complète)

---

## Vue d'ensemble

Ce système utilise **React Router 7** (framework mode) avec **Sanity CMS**:

| Concept | Description |
|---------|-------------|
| **Pages normales** | Composées de blocs via pageBuilder (Home, About, Contact, etc.) |
| **Content Types** | Documents avec liste + détail (Projects, Blog) |
| **Layout global** | Header, Footer, Navigation via singletons Sanity |
| **Visual Editing** | Support Presentation Tool de Sanity |

---

## Architecture du projet

```
├── app/
│   ├── routes/
│   │   ├── home.tsx              # Page d'accueil
│   │   ├── page.tsx              # Catch-all pour pages dynamiques
│   │   ├── projects.tsx          # Liste des projets
│   │   ├── projects.$slug.tsx    # Détail projet
│   │   ├── blog.tsx              # Liste des articles
│   │   └── blog.$slug.tsx        # Détail article
│   ├── routes.ts                 # Configuration des routes
│   └── root.tsx                  # Layout avec Header/Footer
├── components/
│   ├── blocks/                   # Composants de blocs
│   │   ├── Hero.tsx
│   │   ├── Gallery.tsx
│   │   ├── ContactForm.tsx
│   │   └── index.tsx             # Exports + BlockRenderer
│   ├── shared/                   # Composants partagés
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── projects/                 # Composants projets
│   │   └── ProjectCard.tsx
│   └── blog/                     # Composants blog
│       └── PostCard.tsx
├── sanity/
│   ├── schemas/
│   │   ├── blocks/               # Schemas des blocs
│   │   ├── documents/            # Page, Post, Project, singletons
│   │   ├── objects/              # SEO, spacing, richText
│   │   └── index.ts              # Export de tous les schemas
│   ├── lib/
│   │   ├── queries.ts            # Requêtes GROQ
│   │   └── image.ts              # Helper urlFor
│   └── structure.ts              # Structure Studio personnalisée
└── seed/
    └── content.ndjson            # Données de seed
```

---

## Phase 1: Analyse

### Étape 1.1: Lire les fichiers de référence

```
ref/
├── components/
│   ├── Header.tsx / Navbar.tsx
│   ├── Footer.tsx
│   └── blocks/ ou sections/
├── constants.ts                  # Navigation, contenu statique
└── pages/ ou routes/
```

### Étape 1.2: Identifier les éléments

**A. Layout global:**
- [ ] Header (logo, navigation, CTA, menu mobile)
- [ ] Footer (colonnes, liens, social, copyright)

**B. Blocs pageBuilder:**
- [ ] Hero (variations: centré, gauche, plein écran, avec vidéo)
- [ ] Features / Services
- [ ] Gallery / Portfolio (avec filtres?)
- [ ] CTA (Call to Action)
- [ ] Testimonials
- [ ] Pricing
- [ ] FAQ
- [ ] Contact Form

**C. Content Types:**
- [ ] Projects (liste + détail)
- [ ] Blog/Posts (liste + détail)

**D. Données à extraire:**
- [ ] Navigation items (labels, liens, sous-menus)
- [ ] Contact info (email, téléphone, adresse)
- [ ] Social links (plateformes, URLs)
- [ ] Options formulaires (types projet, budgets)
- [ ] Contenu textuel de chaque section

### Étape 1.3: Questions à poser

1. "J'ai identifié X sections. Veux-tu tous les créer?"
2. "Certains correspondent à des blocs existants. Adapter ou créer nouveaux?"
3. "Dois-je créer Projects et/ou Blog?"
4. "Voici la navigation extraite. Correct?"

---

## Phase 2: Configuration Sanity

### 2.1 Schema siteSettings

**Fichier:** `sanity/schemas/documents/siteSettings.ts`

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

### 2.2 Schema navigation

**Fichier:** `sanity/schemas/documents/navigation.ts`

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

### 2.3 Schema footer

**Fichier:** `sanity/schemas/documents/footer.ts`

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
      description: 'Use {year} pour insérer l\'année dynamiquement',
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

### 2.4 Structure Studio

**Fichier:** `sanity/structure.ts`

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

### 2.5 Enregistrer dans sanity.config.ts

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

### 2.6 Exporter les schemas

**Fichier:** `sanity/schemas/documents/index.ts`

```typescript
export { pageType } from './page';
export { postType } from './post';
export { projectType } from './project';
export { siteSettingsType } from './siteSettings';
export { navigationType } from './navigation';
export { footerType } from './footer';
```

**Fichier:** `sanity/schemas/index.ts`

```typescript
import { siteSettingsType, navigationType, footerType, pageType, postType, projectType } from './documents';
// ... autres imports

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

## Phase 3: Layout global

### 3.1 Queries GROQ

**Fichier:** `sanity/lib/queries.ts` - Ajouter:

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

**Fichier:** `components/shared/Header.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

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

  // Default navigation if not provided
  const navItems = navigation?.items || [
    { _key: '1', label: 'Home', link: '/' },
    { _key: '2', label: 'About', link: '/about' },
    { _key: '3', label: 'Contact', link: '/contact' },
  ];

  const ctaText = navigation?.ctaText || 'Contact Us';
  const ctaLink = navigation?.ctaLink || '/contact';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
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
          {/* Logo */}
          <Link to="/" className="font-heading text-xl uppercase tracking-tighter text-white">
            {siteName}
          </Link>

          {/* Desktop Navigation */}
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

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button href={ctaLink} variant="primary" size="sm">
              {ctaText}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
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
            <Button href={ctaLink} variant="primary" className="mt-8">
              {ctaText}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
```

### 3.3 Footer Component

**Fichier:** `components/shared/Footer.tsx`

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
  const tagline = footer?.tagline || 'Your tagline here.';
  const contactEmail = settings?.contactEmail || 'hello@example.com';

  const menuLinks = footer?.menuLinks || [
    { _key: '1', label: 'Home', link: '/' },
    { _key: '2', label: 'About', link: '/about' },
  ];

  const studioLinks = footer?.studioLinks || [
    { _key: '1', label: 'Contact', link: '/contact' },
  ];

  const socialLinks = settings?.socialLinks || [];

  // Dynamic year in copyright
  const currentYear = new Date().getFullYear();
  const copyright = (footer?.copyright || '© {year} All rights reserved.')
    .replace('{year}', String(currentYear));

  const designCredit = footer?.designCredit || '';

  return (
    <footer className="bg-neutral-950 border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl uppercase tracking-tighter mb-4 text-white">
              {siteName}
            </h3>
            <p className="text-gray-400 text-sm font-mono leading-relaxed">
              {tagline}
            </p>
          </div>

          {/* Menu Links */}
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

          {/* Studio Links */}
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

          {/* Social */}
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
            <div className="mt-8">
              <a href={`mailto:${contactEmail}`} className="text-gray-500 text-xs hover:text-primary transition-colors">
                {contactEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-mono">{copyright}</p>
          {designCredit && <p className="text-gray-700 text-xs font-mono uppercase">{designCredit}</p>}
        </div>
      </div>
    </footer>
  );
}
```

### 3.4 Intégration dans root.tsx

**Fichier:** `app/root.tsx`

```typescript
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { LAYOUT_QUERY } from "@/sanity/lib/queries";

// Dans le loader:
export async function loader({ request }: Route.LoaderArgs) {
  const { preview, options } = await getPreviewData(request);
  const layoutData = await loadQuery<LayoutData>(LAYOUT_QUERY, {}, options);

  return {
    preview,
    layout: layoutData.data,
    ENV: { /* ... */ },
  };
}

// Dans App():
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

// IMPORTANT: ErrorBoundary doit aussi inclure Header/Footer
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const data = useRouteLoaderData<typeof loader>("root");
  const location = useLocation();
  const layout = data?.layout;
  const isStudio = location.pathname.startsWith("/studio");

  // ... error handling ...

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

## Phase 4: Blocs pageBuilder

### 4.1 Bloc ContactForm

**Schema:** `sanity/schemas/blocks/contactForm.ts`

```typescript
import { defineField } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons';
import { createBlock } from './base';

export const contactFormBlock = createBlock({
  name: 'contactFormBlock',
  title: 'Contact Form',
  icon: EnvelopeIcon,
  fields: [
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
});
```

**Composant:** `components/blocks/ContactForm.tsx`

```typescript
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: projectTypes[0] || '',
    budget: budgetRanges[0] || '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Handle form submission
    setTimeout(() => {
      alert('Thank you for your inquiry!');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Info */}
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

        {/* Form */}
        <div className="bg-white/5 p-8 md:p-12 border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields... */}
            <Button type="submit" variant="primary" className="w-full">
              {isSubmitting ? 'Sending...' : submitButtonText}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
```

### 4.2 Bloc Gallery avec filtres

**Ajouter dans le schema:** `enableFilters` field

**Composant avec filtres:**

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
      className={`px-6 py-2 font-mono text-sm uppercase ... ${
        activeFilter === 'all' ? 'bg-primary text-black' : 'bg-transparent text-gray-400'
      }`}
    >
      All
    </button>
    {categories.map((cat) => (
      <button key={cat} onClick={() => setActiveFilter(cat)} ...>
        {cat}
      </button>
    ))}
  </div>
)}
```

---

## Phase 5: Content Types

### 5.1 Routes Configuration

**Fichier:** `app/routes.ts`

```typescript
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  // API routes
  route("api/preview-mode/enable", "routes/api.preview-mode.enable.tsx"),
  route("api/preview-mode/disable", "routes/api.preview-mode.disable.tsx"),
  // Studio
  route("studio/*", "routes/studio.tsx"),
  // IMPORTANT: Content types AVANT le catch-all
  route("projects", "routes/projects.tsx"),
  route("projects/:slug", "routes/projects.$slug.tsx"),
  route("blog", "routes/blog.tsx"),
  route("blog/:slug", "routes/blog.$slug.tsx"),
  // Catch-all DOIT être dernier
  route("*", "routes/page.tsx"),
] satisfies RouteConfig;
```

### 5.2 Queries avec pagination

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

**Fichier:** `components/projects/ProjectCard.tsx`

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

### 6.1 Format NDJSON

Chaque ligne = un document JSON complet. **IMPORTANT:** Les noms de champs doivent correspondre EXACTEMENT aux schemas.

### 6.2 Exemple complet

**Fichier:** `seed/content.ndjson`

```jsonl
{"_type": "siteSettings", "_id": "siteSettings", "siteName": "Mon Site", "siteDescription": "Description du site", "contactEmail": "hello@example.com", "contactPhone": "+1 234 567 890", "contactAddress": "123 Street\nCity, Country", "socialLinks": [{"_key": "s1", "platform": "instagram", "url": "https://instagram.com/example"}, {"_key": "s2", "platform": "linkedin", "url": "https://linkedin.com/company/example"}], "projectsPerPage": 6, "postsPerPage": 6}
{"_type": "navigation", "_id": "navigation", "items": [{"_key": "n1", "label": "Home", "link": "/"}, {"_key": "n2", "label": "Portfolio", "link": "/portfolio"}, {"_key": "n3", "label": "Services", "link": "/services"}, {"_key": "n4", "label": "Projects", "link": "/projects"}, {"_key": "n5", "label": "About", "link": "/about"}, {"_key": "n6", "label": "Contact", "link": "/contact"}], "ctaText": "Contact Us", "ctaLink": "/contact"}
{"_type": "footer", "_id": "footer", "tagline": "Your company tagline here.", "menuLinks": [{"_key": "m1", "label": "Home", "link": "/"}, {"_key": "m2", "label": "Portfolio", "link": "/portfolio"}, {"_key": "m3", "label": "Services", "link": "/services"}], "studioLinks": [{"_key": "s1", "label": "About", "link": "/about"}, {"_key": "s2", "label": "Contact", "link": "/contact"}], "copyright": "© {year} Company Name. All rights reserved.", "designCredit": "Designed by Studio"}
{"_type": "category", "_id": "cat-design", "title": "Design", "slug": {"_type": "slug", "current": "design"}}
{"_type": "category", "_id": "cat-development", "title": "Development", "slug": {"_type": "slug", "current": "development"}}
{"_type": "project", "_id": "project-1", "title": "Project One", "slug": {"_type": "slug", "current": "project-one"}, "excerpt": "Description of project one.", "client": "Client Name", "year": "2024", "featured": true, "categories": [{"_type": "reference", "_ref": "cat-design", "_key": "c1"}]}
{"_type": "page", "_id": "page-home", "title": "Home", "slug": {"_type": "slug", "current": "/"}, "pageBuilder": [{"_type": "heroBlock", "_key": "hero1", "heading": "Welcome", "subheading": "Your subtitle here", "alignment": "center", "overlay": true, "height": "full", "primaryCta": {"text": "Learn More", "link": "/about"}}]}
{"_type": "page", "_id": "page-portfolio", "title": "Portfolio", "slug": {"_type": "slug", "current": "portfolio"}, "pageBuilder": [{"_type": "heroBlock", "_key": "hero1", "heading": "Portfolio", "alignment": "center", "height": "medium"}, {"_type": "galleryBlock", "_key": "gallery1", "heading": "Our Work", "layout": "masonry", "enableLightbox": true, "enableFilters": true, "images": [{"_key": "g1", "alt": "Image 1", "title": "Image 1", "category": "design"}]}]}
{"_type": "page", "_id": "page-contact", "title": "Contact", "slug": {"_type": "slug", "current": "contact"}, "pageBuilder": [{"_type": "contactFormBlock", "_key": "contact1", "heading": "Contact", "description": "Get in touch with us.", "email": "hello@example.com", "projectTypes": ["Design", "Development", "Other"], "budgetRanges": ["$1k - $5k", "$5k - $10k", "$10k+"], "submitButtonText": "Send Message"}]}
```

### 6.3 Règles importantes

| Règle | Exemple correct | Exemple incorrect |
|-------|-----------------|-------------------|
| `_key` obligatoire dans arrays | `{"_key": "abc123", ...}` | `{...}` sans _key |
| Champs = noms du schema | `enableFilters` | `showFilters` |
| References | `{"_type": "reference", "_ref": "cat-1", "_key": "r1"}` | `{"_ref": "cat-1"}` |
| Slug format | `{"_type": "slug", "current": "my-slug"}` | `"my-slug"` |

---

## Phase 7: Vérification

### 7.1 Import des données

```bash
# Import avec remplacement
npx sanity dataset import seed/content.ndjson production --replace

# Vérifier l'import
npx sanity documents query '*[_type in ["siteSettings", "navigation", "footer"]][0...3]'
```

### 7.2 Build

```bash
npm run build
```

### 7.3 Tests manuels

- [ ] Homepage s'affiche avec Header/Footer
- [ ] Navigation fonctionne
- [ ] Pages dynamiques (portfolio, contact, etc.)
- [ ] Page 404 a Header/Footer
- [ ] /projects liste les projets
- [ ] /projects/[slug] affiche le détail
- [ ] Visual Editing fonctionne

---

## Erreurs courantes

### 1. Page 404 sans Header/Footer

**Cause:** ErrorBoundary ne rend pas Header/Footer
**Solution:** Voir section 3.4

### 2. Pages en 404 malgré seed data

**Cause:** Données non importées
**Solution:**
```bash
npx sanity dataset import seed/content.ndjson production --replace
```

### 3. Header/Footer vides

**Cause:** Singletons non créés ou noms de champs incorrects
**Vérifier:**
```bash
npx sanity documents query '*[_type == "navigation"][0]'
```

### 4. Noms de champs incorrects

| Schema | Seed Data |
|--------|-----------|
| `enableLightbox` | `enableLightbox` (pas `showLightbox`) |
| `enableFilters` | `enableFilters` (pas `showFilters`) |
| `heading` | `heading` (pas `sectionTitle` pour Gallery) |
| `title` | `title` (pas `caption` pour images) |

### 5. Routes catch-all avant content types

**Incorrect:**
```typescript
route("*", "routes/page.tsx"),
route("projects", "routes/projects.tsx"), // Ne sera jamais atteint!
```

**Correct:**
```typescript
route("projects", "routes/projects.tsx"),
route("*", "routes/page.tsx"), // En dernier
```

### 6. Hero non centré

**Cause:** Manque `text-center` et `mx-auto`
**Solution:** Voir composant Hero avec alignment conditionnel

### 7. Images placeholder

Les images sans `asset._ref` utilisent un placeholder. Pour de vraies images:
1. Uploader via Sanity Studio
2. Récupérer les `_ref`
3. Mettre à jour le seed

### 8. Erreur bulk upload images dans Gallery

**Erreur:** `TypeError: Cannot read properties of undefined (reading 'name')` lors du drag-and-drop multiple d'images.

**Cause:** `defineArrayMember` pour les images avec champs custom nécessite une propriété `name` explicite.

**Solution:**
```typescript
// INCORRECT - cause l'erreur
defineArrayMember({
  type: 'image',
  options: { hotspot: true },
  fields: [...]
})

// CORRECT - ajouter name
defineArrayMember({
  name: 'galleryImage',  // <-- OBLIGATOIRE pour bulk upload
  type: 'image',
  options: { hotspot: true },
  fields: [...]
})
```

### 9. Bulk upload n'ajoute qu'une seule image

**Problème:** Lors du drag-and-drop de plusieurs images, seule la première est ajoutée.

**Cause:** Limitation de Sanity Studio avec les images ayant des champs custom dans un array.

**Solution:** Utiliser un custom input component pour gérer le bulk upload. Voir `sanity/components/BulkImageArrayInput.tsx`.

---

## Checklist complète

### Configuration Sanity
- [ ] Schema siteSettings créé
- [ ] Schema navigation créé
- [ ] Schema footer créé
- [ ] Structure Studio configurée
- [ ] Schemas exportés dans index.ts
- [ ] sanity.config.ts utilise la structure

### Layout
- [ ] Header.tsx créé avec menu mobile
- [ ] Footer.tsx créé avec social icons
- [ ] LAYOUT_QUERY ajoutée
- [ ] root.tsx charge les données layout
- [ ] root.tsx rend Header/Footer
- [ ] ErrorBoundary inclut Header/Footer

### Blocs
- [ ] Tous les blocs identifiés créés
- [ ] Schemas dans blocks/index.ts
- [ ] Composants dans components/blocks/index.tsx
- [ ] pageBuilder dans page.ts inclut les blocs

### Content Types
- [ ] Routes projects et blog dans routes.ts
- [ ] AVANT le catch-all
- [ ] Queries avec pagination
- [ ] ProjectCard et PostCard créés

### Seed Data
- [ ] Singletons (siteSettings, navigation, footer)
- [ ] Categories
- [ ] Projects
- [ ] Pages (home, portfolio, contact, etc.)
- [ ] Champs correspondent aux schemas

### Validation
- [ ] npm run build passe
- [ ] Import Sanity réussi
- [ ] Toutes les pages accessibles
- [ ] 404 avec Header/Footer
- [ ] Visual Editing fonctionne

---

## Commandes rapides

```bash
# Import seed data
npx sanity dataset import seed/content.ndjson production --replace

# Vérifier documents
npx sanity documents query '*[_type == "siteSettings"][0]'
npx sanity documents query '*[_type == "page"][0...5]{title, slug}'

# Build
npm run build

# Dev
npm run dev
```
