# Session /sync - Résumé complet

## Objectif
Analyser le site de référence `ref/darko-kalany-studio` et créer les composants correspondants pour un site Next.js + Sanity avec un design **dark editorial** (thème noir, couleur primaire or/gold).

---

## État actuel
- **Seed data**: ✅ Importé (18 documents)
- **Schemas Sanity**: ✅ Créés/modifiés
- **Composants React**: ✅ Créés mais **erreurs de build restantes**
- **Studio Sanity**: ⚠️ Erreurs à corriger

---

## Fichiers CRÉÉS

### Schemas Sanity (`sanity/schemas/blocks/`)
- `serviceList.ts` - Liste de services avec icônes (box, camera, layers, play, etc.)
- `featuredProjects.ts` - Projets en vedette avec références vers `project`

### Composants UI (`components/ui/`)
- `Button.tsx` - 4 variants (primary, outline, white, text)
- `MasonryGallery.tsx` - Galerie masonry avec hover effects grayscale
- `Lightbox.tsx` - Visionneuse plein écran avec navigation
- `index.tsx` - Exports

### Composants Blocks (`components/blocks/`)
- `ServiceList.tsx` - Grille de services avec icônes Lucide
- `FeaturedProjects.tsx` - Projets avec effet grayscale → couleur au hover

### Seed Data
- `seed/content.ndjson` - 18 documents:
  - 5 catégories (Real Estate, Fashion, Architecture, Brand Films, Concept Art)
  - 8 projets (Neo-Tokyo Penthouse, Vogue Cyber Summer, etc.)
  - 5 pages (Home, Services, Pricing, About, Contact)

---

## Fichiers MODIFIÉS

### Schemas Sanity
| Fichier | Modifications |
|---------|---------------|
| `sanity/schemas/blocks/hero.ts` | Ajout `videoUrl`, `height`, renommé `description`→`subheading`, `image`→`backgroundImage` |
| `sanity/schemas/blocks/cta.ts` | Simplifié: `buttonText`/`buttonLink` au lieu d'array de buttons |
| `sanity/schemas/blocks/gallery.ts` | Ajout `heading`, `subheading`, `ctaText`, `ctaLink`, champs image enrichis |
| `sanity/schemas/blocks/index.ts` | Export `serviceListBlock`, `featuredProjectsBlock` |
| `sanity/schemas/index.ts` | Import des 2 nouveaux blocs |
| `sanity/schemas/documents/page.ts` | Ajout des 2 nouveaux blocs dans `pageBuilder` array |

### Queries
| Fichier | Modifications |
|---------|---------------|
| `sanity/lib/queries.ts` | Expand références projets dans `featuredProjectsBlock` avec `projects[]->` |

### Composants React (implémentés avec design dark editorial)
| Fichier | Description |
|---------|-------------|
| `components/blocks/Hero.tsx` | Fullscreen, video/image background, overlay, 2 CTAs |
| `components/blocks/CTA.tsx` | Section centré, grand titre, bouton |
| `components/blocks/FAQ.tsx` | Accordion animé avec ChevronDown |
| `components/blocks/Gallery.tsx` | Masonry + lightbox, header avec CTA |
| `components/blocks/Pricing.tsx` | 3 tiers, badges, features avec Check/X |
| `components/blocks/Features.tsx` | Grille avec icônes Lucide |
| `components/blocks/Testimonials.tsx` | Citations avec Quote icon |
| `components/blocks/index.tsx` | Ajout `ServiceList`, `FeaturedProjects` dans `blockComponents` |

### Pages Next.js
| Fichier | Modifications |
|---------|---------------|
| `app/page.tsx` | Fetch page Sanity avec `slug="/"`, render avec `BlockRenderer` |
| `app/(site)/[...slug]/page.tsx` | Fetch dynamique pages Sanity, `generateStaticParams` |

### Configuration
| Fichier | Modifications |
|---------|---------------|
| `app/layout.tsx` | Fonts Google (Playfair Display, Inter, JetBrains Mono), metadata |
| `tailwind.config.ts` | Couleur `primary` gold (#D4AF37), `fontFamily`, animations |
| `next.config.js` | Ajout `picsum.photos` aux images autorisées |

---

## Commande d'import exécutée
```bash
npx sanity dataset import seed/content.ndjson production --replace --project 2gj8du3t
```
✅ 18 documents importés

---

## ERREURS RESTANTES À CORRIGER

### 1. Vérifier les imports
- `@/sanity/lib/image` doit exporter `urlFor`
- `lucide-react` doit être installé (`npm install lucide-react`)

### 2. Vérifier `components/shared/Section.tsx`
Le `BlockRenderer` utilise ce composant - vérifier qu'il existe et accepte les props:
- `spacing`
- `title`
- `subtitle`
- `anchorId`
- `children`

### 3. Possibles erreurs TypeScript
Les composants utilisent des types qui peuvent nécessiter ajustement:
- Props des blocs
- Types Sanity image

---

## Design appliqué (Dark Editorial)

### Couleurs
- Background: `bg-black`, `bg-neutral-950`
- Primary: `#D4AF37` (gold)
- Text: `text-white`, `text-gray-400`
- Borders: `border-white/10`, `border-white/5`

### Typographie
- Headings: Playfair Display (`font-heading`)
- Body: Inter (`font-sans`)
- Labels: JetBrains Mono (`font-mono`)

### Effets
- Images: `grayscale` → `grayscale-0` au hover
- Scale: `hover:scale-105`
- Transitions: `duration-300`, `duration-700`

---

## Pour continuer

```
Corrige les erreurs de build restantes:
1. Vérifie que lucide-react est installé
2. Vérifie @/sanity/lib/image exporte urlFor
3. Vérifie components/shared/Section.tsx existe et fonctionne
4. Lance npm run dev et corrige les erreurs TypeScript
```

---

## Structure des blocs dans le seed

### Page Home (`/`)
1. `heroBlock` - "Hyper-Real AI Photography & Film"
2. `serviceListBlock` - 4 services
3. `featuredProjectsBlock` - 4 projets référencés
4. `ctaBlock` - "Ready to defy reality?"

### Page Services (`/services`)
1. `heroBlock`
2. `serviceListBlock` - 4 services détaillés
3. `faqBlock` - 3 questions

### Page Pricing (`/pricing`)
1. `heroBlock`
2. `pricingBlock` - 3 tiers (Essentials, Signature, Full Production)
3. `ctaBlock`

### Page About (`/about`)
1. `heroBlock`
2. `featureBlock` - Stats
3. `testimonialBlock` - 2 témoignages

### Page Contact (`/contact`)
1. `heroBlock`
2. `ctaBlock`
