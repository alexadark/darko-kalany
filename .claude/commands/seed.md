# Commande: /seed

Génère des données de démonstration pour le site.

## Instructions

### 1. Analyse la structure existante

Lis les schemas dans `sanity/schemas/` pour comprendre:
- Les types de documents (Page, Post, Project)
- Les blocs disponibles
- Les taxonomies (Category, Tag)

### 2. Génère le contenu

Crée du contenu réaliste et varié:
- 5-10 pages avec différentes combinaisons de blocs
- 3-5 articles de blog avec catégories et tags
- 2-3 projets portfolio
- Des catégories et tags cohérents

### 3. Format NDJSON

Écris dans `seed/content.ndjson`:

```json
{"_type": "category", "_id": "cat-tech", "title": "Technologie", "slug": {"_type": "slug", "current": "technologie"}}
{"_type": "tag", "_id": "tag-react", "title": "React", "slug": {"_type": "slug", "current": "react"}}
{"_type": "post", "_id": "post-1", "title": "Premier Article", "slug": {"_type": "slug", "current": "premier-article"}, "category": {"_type": "reference", "_ref": "cat-tech"}, "tags": [{"_type": "reference", "_ref": "tag-react", "_key": "t1"}]}
```

### 4. Gestion des images

Pour les images, utilise des placeholders:
```json
{"_type": "image", "asset": {"_type": "reference", "_ref": "image-placeholder"}}
```

Ou indique à l'utilisateur de télécharger les images manuellement.

### 5. Import

```bash
npx sanity dataset import seed/content.ndjson production
```

Options utiles:
- `--replace` - Remplace les documents existants avec le même _id
- `--missing` - N'importe que les documents manquants
