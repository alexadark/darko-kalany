# Claude Code Directives - React Router 7 + Sanity Project

Ce projet utilise React Router 7 (framework mode) avec Sanity CMS. Tu es responsable de créer et gérer les composants, schemas, et contenus.

## Architecture du Projet

```
├── app/
│   ├── routes/            # React Router 7 routes (home, blog, projects, studio)
│   ├── components/        # Composants React
│   │   ├── blocks/        # Composants de blocs (Hero, CTA, Gallery, etc.)
│   │   ├── shared/        # Composants réutilisables
│   │   ├── ui/            # Composants UI de base
│   │   ├── blog/          # Composants spécifiques au blog
│   │   └── projects/      # Composants spécifiques aux projets
│   ├── sanity/            # Configuration Sanity pour l'app
│   ├── root.tsx           # Root component
│   └── routes.ts          # Configuration des routes
├── sanity/
│   ├── schemas/
│   │   ├── blocks/        # Schemas des blocs
│   │   ├── documents/     # Schemas des documents (Page, Post, Project)
│   │   ├── objects/       # Schemas des objets (SEO, spacing, etc.)
│   │   └── taxonomies/    # Schemas des taxonomies (Category, Tag)
│   ├── lib/               # Utilitaires Sanity
│   ├── presentation/      # Configuration Presentation Tool
│   └── structure.ts       # Structure du Studio
├── ref/                   # Site de référence à analyser
└── seed/                  # Données de seed (NDJSON)
```

## Commandes Disponibles

- `/sync` - Analyser le site dans `ref/` et créer les composants correspondants
- `/block [nom]` - Créer un nouveau bloc (frontend + backend)
- `/seed` - Générer des données de démonstration

## Règles Importantes

### 1. Création de Blocs

Chaque bloc doit avoir:
- **Schema Sanity** dans `sanity/schemas/blocks/[nom].ts`
- **Composant React** dans `app/components/blocks/[Nom].tsx`
- **Export** ajouté dans `sanity/schemas/index.ts` et `app/components/blocks/index.tsx`

### 2. Champs Partagés (tous les blocs)

Tous les blocs DOIVENT inclure ces champs:
- `sectionTitle` (string, optionnel)
- `sectionSubtitle` (string, optionnel)
- `spacing` (object: top/bottom avec valeurs none/sm/md/lg/xl)
- `anchorId` (slug, optionnel)

### 3. SEO

L'objet SEO est réutilisable et doit être ajouté à tous les documents:
- `metaTitle`
- `metaDescription`
- `ogImage`
- `noIndex`

### 4. Format de Seed Data

Les fichiers de seed sont en NDJSON (une ligne JSON par document):
```json
{"_type": "page", "_id": "page-home", "title": "Accueil", "slug": {"_type": "slug", "current": "home"}}
```

## Analyse du Site de Référence

Quand tu analyses `ref/`:
1. Identifie tous les composants/sections uniques
2. Note les styles (couleurs, typographie, espacements)
3. Extrait le contenu textuel
4. Identifie les images à télécharger
5. Crée les schemas et composants correspondants
6. Génère le seed data avec le contenu réel

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
