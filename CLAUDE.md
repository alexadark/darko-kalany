# Claude Code Directives - React Router 7 + Sanity Project

This project uses React Router 7 (framework mode) with Sanity CMS. You are responsible for creating and managing components, schemas, and content.

## Meta Rules

### 1. Language
All content in commands, skills, and CLAUDE.md **MUST be written in English**. Even if the user communicates in another language, all code, comments, documentation, and directives must remain in English.

### 2. Self-Improvement Protocol
After fixing a bug or implementing a feature, **ALWAYS analyze** whether the solution is:
- **General/Reusable**: Applies to any similar project (not project-specific)
- **A pattern to remember**: Could prevent future mistakes

If YES, you MUST document it in the appropriate location:
- **CLAUDE.md** → Add to "Common Pitfalls" section for general bugs/patterns
- **Slash commands** (`/block`, `/sync`, `/seed`) → Update the command if it affects that workflow
- **Skills** → Update if it affects a specific skill's behavior

This ensures the project **self-improves over time** and mistakes are not repeated.

---

## Project Architecture

```
├── app/
│   ├── routes/            # React Router 7 routes (home, blog, projects, studio)
│   ├── components/        # React components
│   │   ├── blocks/        # Block components (Hero, CTA, Gallery, etc.)
│   │   ├── shared/        # Reusable components
│   │   ├── ui/            # Base UI components
│   │   ├── blog/          # Blog-specific components
│   │   └── projects/      # Project-specific components
│   ├── sanity/            # Sanity configuration for the app
│   ├── root.tsx           # Root component
│   └── routes.ts          # Routes configuration
├── sanity/
│   ├── schemas/
│   │   ├── blocks/        # Block schemas
│   │   ├── documents/     # Document schemas (Page, Post, Project)
│   │   ├── objects/       # Object schemas (SEO, spacing, etc.)
│   │   └── taxonomies/    # Taxonomy schemas (Category, Tag)
│   ├── lib/               # Sanity utilities
│   ├── presentation/      # Presentation Tool configuration
│   └── structure.ts       # Studio structure
├── ref/                   # Reference site to analyze
└── seed/                  # Seed data (NDJSON)
```

## Available Commands

- `/sync` - Analyze the site in `ref/` and create corresponding components
- `/block [name]` - Create a new block (frontend + backend)
- `/seed` - Generate demo data

## Important Rules

### 1. Block Creation

Each block must have:
- **Sanity Schema** in `sanity/schemas/blocks/[name].ts`
- **React Component** in `app/components/blocks/[Name].tsx`
- **Export** added in `sanity/schemas/index.ts` and `app/components/blocks/index.tsx`

### 2. Shared Fields (all blocks)

All blocks MUST include these fields:
- `sectionTitle` (string, optional)
- `sectionSubtitle` (string, optional)
- `spacing` (object: top/bottom with values none/sm/md/lg/xl)
- `anchorId` (slug, optional)

### 3. SEO

The SEO object is reusable and must be added to all documents:
- `metaTitle`
- `metaDescription`
- `ogImage`
- `noIndex`

### 4. Seed Data Format

Seed files are in NDJSON format (one JSON line per document):
```json
{"_type": "page", "_id": "page-home", "title": "Home", "slug": {"_type": "slug", "current": "home"}}
```

## Reference Site Analysis

When analyzing `ref/`:
1. Identify all unique components/sections
2. Note styles (colors, typography, spacing)
3. Extract text content
4. Identify images to download
5. Create corresponding schemas and components
6. Generate seed data with actual content

---

## Common Pitfalls (DO NOT REPEAT)

### 1. Missing Dependencies
When using external packages in components, **ALWAYS install them first**:
```bash
# Required packages for this project:
npm install lucide-react    # Icons
npm install clsx tailwind-merge  # Utility classes
```

### 2. TypeScript Exclusions
The `ref/` folder contains reference code and **MUST be excluded** from TypeScript compilation. Already configured in `tsconfig.json`:
```json
"exclude": ["node_modules", "ref"]
```

### 3. Sanity Image URL Builder Type
The `urlFor` function in `sanity/lib/image.ts` must use `SanityImageSource` type (not `Image` from sanity):
```typescript
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
```
This allows flexible image sources from queries without strict type requirements.

### 4. React Router Build Cache
If you encounter build or development issues, clean the cache:
```bash
rm -rf .react-router build && npm run dev
```

### 5. Component Interfaces
When defining Sanity image types in component interfaces, use this pattern:
```typescript
interface Props {
  image?: {
    asset?: { _ref: string };
    alt?: string;
  };
}
```
Do NOT add `_type: 'reference'` to the asset - it's handled by Sanity.

### 6. Required Shared Components
Before creating blocks, ensure these exist:
- `app/components/shared/Section.tsx` - Wrapper with spacing props
- `app/lib/utils.ts` - Must export `cn()` function (clsx + tailwind-merge)

### 7. Port Conflicts
Default port 5173 (Vite dev server) may be in use. React Router will auto-switch to next available port. Check terminal output for actual port.

### 8. Sanity Array Member Names
Do NOT use `name` in `defineArrayMember` for standard types like `image`. Sanity creates items with the base `_type` (e.g., `"image"`), not a custom name.
```typescript
// ❌ WRONG - causes "Item of type image not valid for this list"
defineArrayMember({
  name: 'galleryImage',  // Don't do this!
  type: 'image',
  ...
})

// ✅ CORRECT
defineArrayMember({
  type: 'image',
  options: { hotspot: true },
  fields: [...],
})
```
