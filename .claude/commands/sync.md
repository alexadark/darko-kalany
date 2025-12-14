# Commande: /sync

Analyse le site de référence dans `ref/` et crée les composants correspondants.

## Instructions

### Étape 1: Analyse du site de référence

1. Lis tous les fichiers dans `ref/` (JSX, TSX, CSS, etc.)
2. Identifie chaque section/composant unique
3. Note pour chaque composant:
   - Nom et fonction
   - Structure HTML/JSX
   - Styles Tailwind ou CSS
   - Props/données nécessaires
   - Images utilisées

### Étape 2: Questions interactives

Pose ces questions à l'utilisateur:
1. "J'ai identifié X composants: [liste]. Veux-tu tous les créer?"
2. "Certains composants semblent similaires à [Hero, CTA, etc.]. Dois-je les adapter ou créer de nouveaux types?"
3. "J'ai trouvé X images. Dois-je les copier dans public/?"

### Étape 3: Création des Schemas Sanity

Pour chaque composant identifié, crée un schema dans `sanity/schemas/blocks/`:

```typescript
import { defineType, defineField } from 'sanity';

export const monBlocSchema = defineType({
  name: 'monBloc',
  title: 'Mon Bloc',
  type: 'object',
  fields: [
    // Champs partagés (OBLIGATOIRES)
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'sectionSubtitle',
      title: 'Section Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'spacing',
      title: 'Spacing',
      type: 'spacing',
    }),
    defineField({
      name: 'anchorId',
      title: 'Anchor ID',
      type: 'slug',
    }),
    // Champs spécifiques au bloc
    defineField({
      name: 'titre',
      title: 'Titre',
      type: 'string',
    }),
    // ... autres champs
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      subtitle: 'titre',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Mon Bloc',
        subtitle: subtitle,
      };
    },
  },
});
```

### Étape 4: Création des Composants React

Pour chaque bloc, crée le composant dans `components/blocks/`:

```tsx
interface MonBlocProps {
  titre?: string;
  description?: string;
  // ... autres props basées sur le schema
}

export function MonBloc({ titre, description }: MonBlocProps) {
  return (
    <div className="container mx-auto px-4">
      {/* Reproduis le design exact du site de référence */}
      <h2 className="text-4xl font-bold">{titre}</h2>
      <p className="mt-4 text-gray-600">{description}</p>
    </div>
  );
}
```

### Étape 5: Enregistrement

1. Ajoute le schema dans `sanity/schemas/index.ts`
2. Ajoute le composant dans `components/blocks/index.tsx`
3. Ajoute le bloc dans le pageBuilder de `sanity/schemas/documents/page.ts`

### Étape 6: Génération du Seed Data

Crée un fichier `seed/content.ndjson` avec le contenu extrait:

```json
{"_type": "page", "_id": "page-home", "title": "Accueil", "slug": {"_type": "slug", "current": "home"}, "pageBuilder": [{"_type": "heroBlock", "_key": "hero1", "titre": "Bienvenue", "description": "Texte extrait du site..."}]}
```

### Étape 7: Import dans Sanity

```bash
npx sanity dataset import seed/content.ndjson production --replace
```
