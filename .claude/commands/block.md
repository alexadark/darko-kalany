# Commande: /block [nom]

Crée un nouveau bloc avec son schema Sanity et composant React.

## Usage

```
/block testimonial
/block pricing-table
/block team-grid
```

## Instructions

### 1. Demande les détails

Pose ces questions:
1. "Quels champs ce bloc doit-il avoir?"
2. "Y a-t-il des variantes de layout?"
3. "Ce bloc a-t-il des images?"

### 2. Crée le Schema Sanity

Fichier: `sanity/schemas/blocks/[nom].ts`

Structure obligatoire:
- Inclure les champs partagés (sectionTitle, sectionSubtitle, spacing, anchorId)
- Définir un preview pertinent
- Utiliser defineType et defineField

### 3. Crée le Composant React

Fichier: `components/blocks/[Nom].tsx`

- Interface TypeScript pour les props
- Design responsive avec Tailwind
- Gérer les cas où les données sont vides

### 4. Enregistre le bloc

1. `sanity/schemas/index.ts` - Ajouter l'export
2. `components/blocks/index.tsx` - Ajouter dans blockComponents
3. `sanity/schemas/documents/page.ts` - Ajouter dans pageBuilder.of

### 5. Teste

- Lance `npm run dev`
- Va dans /studio
- Crée une page et ajoute le nouveau bloc
