# Tâche: Implémenter Visual Editing pour React Router 7

## Contexte

Ce projet utilise React Router 7 (framework mode) avec Sanity CMS. Le Visual Editing permet aux éditeurs de contenu de voir les modifications en temps réel dans le Presentation Tool de Sanity Studio.

## Configuration du projet

- **Project ID**: `2gj8du3t`
- **Dataset**: `production`
- **Framework**: React Router 7.x
- **Studio**: Embedded à `/studio`

## Packages à installer

```bash
npm add @sanity/visual-editing @sanity/preview-url-secret @sanity/react-loader
```

## Fichiers à créer

### 1. Variables d'environnement `.env`

```env
# Public
PUBLIC_SANITY_PROJECT_ID="2gj8du3t"
PUBLIC_SANITY_DATASET="production"
PUBLIC_SANITY_STUDIO_URL="http://localhost:3000/studio"

# Private (créer un token Viewer sur sanity.io/manage)
SANITY_API_READ_TOKEN="YOUR_VIEWER_TOKEN"
```

### 2. Session helper `app/sanity/session.ts`

Gère les cookies de preview mode. Utilise `createCookieSessionStorage` de react-router.

Référence: https://www.sanity.io/docs/visual-editing/visual-editing-with-react-router

### 3. Loader server `app/sanity/loader.server.ts`

Configure le server client avec le token pour les requêtes serveur.

```typescript
import { loadQuery, setServerClient } from '@sanity/react-loader'
import { client } from './client'

const serverClient = client.withConfig({
  token: process.env.SANITY_API_READ_TOKEN
})
setServerClient(serverClient)

export { loadQuery }
```

### 4. Route API enable `app/routes/api.preview-mode.enable.tsx`

Valide le secret URL et active le preview mode via cookie.

### 5. Route API disable `app/routes/api.preview-mode.disable.tsx`

Désactive le preview mode et détruit le cookie.

### 6. Composant `app/components/DisablePreviewMode.tsx`

Affiche un lien pour désactiver le preview quand on est hors du Studio.

### 7. Composant `app/components/SanityVisualEditing.tsx`

Wrapper pour le composant VisualEditing avec overlays.

```typescript
import { VisualEditing } from "@sanity/visual-editing/react-router";
import { DisablePreviewMode } from "./DisablePreviewMode";

export function SanityVisualEditing() {
  return (
    <>
      <VisualEditing />
      <DisablePreviewMode />
    </>
  );
}
```

## Fichiers à modifier

### 1. Client Sanity `sanity/lib/client.ts`

Ajouter la configuration `stega` pour les overlays:

```typescript
import { createClient } from "@sanity/client";

declare global {
  interface Window {
    ENV: {
      PUBLIC_SANITY_PROJECT_ID: string;
      PUBLIC_SANITY_DATASET: string;
      PUBLIC_SANITY_STUDIO_URL: string;
    };
  }
}

const env = typeof document === "undefined" ? process.env : window.ENV;

export const client = createClient({
  projectId: env.PUBLIC_SANITY_PROJECT_ID || "2gj8du3t",
  dataset: env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  stega: {
    studioUrl: env.PUBLIC_SANITY_STUDIO_URL || "/studio",
  },
});
```

### 2. Root `app/root.tsx`

- Ajouter un loader qui récupère l'état preview
- Injecter les variables ENV dans window
- Rendre `SanityVisualEditing` quand preview est actif

### 3. Routes `app/routes.ts`

Ajouter les nouvelles routes API:

```typescript
route("api/preview-mode/enable", "routes/api.preview-mode.enable.tsx"),
route("api/preview-mode/disable", "routes/api.preview-mode.disable.tsx"),
```

### 4. Config Sanity `sanity.config.ts`

Réactiver et configurer le `presentationTool`:

```typescript
import { presentationTool } from "sanity/presentation";

plugins: [
  structureTool(),
  presentationTool({
    previewUrl: {
      origin: typeof location !== 'undefined' ? location.origin : 'http://localhost:3000',
      preview: '/',
      previewMode: {
        enable: '/api/preview-mode/enable',
        disable: '/api/preview-mode/disable',
      }
    },
    resolve: {
      locations: {
        // Configurer selon les types de documents
        page: defineLocations({
          select: { title: 'title', slug: 'slug.current' },
          resolve: (doc) => ({
            locations: [
              { title: doc?.title, href: `/${doc?.slug === 'home' ? '' : doc?.slug}` },
            ]
          })
        })
      }
    }
  }),
  visionTool(),
],
```

### 5. Routes de pages (home.tsx, page.tsx)

Modifier pour utiliser le pattern `loadQuery` + `useQuery`:

```typescript
// Dans le loader
const { options } = await getPreviewData(request);
const data = await loadQuery<PageData>(QUERY, params, options);
return { initial: data };

// Dans le composant
const { initial } = loaderData;
const { data } = useQuery<PageData>(QUERY, params, { initial });
```

## Ordre d'implémentation recommandé

1. Installer les packages
2. Créer le fichier `.env`
3. Créer `session.ts`
4. Créer `loader.server.ts`
5. Créer les routes API (enable/disable)
6. Créer les composants (DisablePreviewMode, SanityVisualEditing)
7. Modifier `client.ts` pour stega
8. Modifier `root.tsx`
9. Modifier `routes.ts`
10. Modifier `sanity.config.ts`
11. Modifier les routes de pages (home.tsx, page.tsx)
12. Tester dans le Studio avec Presentation Tool

## Documentation de référence

- Guide officiel: https://www.sanity.io/docs/visual-editing/visual-editing-with-react-router
- Template exemple: https://github.com/SimeonGriggs/sanity-react-router-template
- Package npm: https://www.npmjs.com/package/@sanity/visual-editing

## Notes importantes

- Le token SANITY_API_READ_TOKEN doit avoir les permissions "Viewer"
- Le cookie de session utilise `sameSite: "none"` en production pour fonctionner dans l'iframe du Studio
- Les variables `PUBLIC_*` sont exposées au client via `window.ENV`
- Vite n'utilise pas `process.env` côté client, d'où l'injection via `window.ENV`
