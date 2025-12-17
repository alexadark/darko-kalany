# Command: /block [name]

Creates a new block with its Sanity schema and React component.

## Usage

```
/block testimonial
/block pricing-table
/block team-grid
```

## Instructions

### 1. Ask for details

Ask these questions:
1. "What fields should this block have?"
2. "Are there layout variants?"
3. "Does this block have images?"

### 2. Create the Sanity Schema

File: `sanity/schemas/blocks/[name].ts`

Required structure:
- Include shared fields (sectionTitle, sectionSubtitle, spacing, anchorId)
- Define a relevant preview
- Use defineType and defineField

### 3. Create the React Component

File: `app/components/blocks/[Name].tsx`

- TypeScript interface for props
- Responsive design with Tailwind
- Handle cases where data is empty

### 4. Register the block

1. `sanity/schemas/index.ts` - Add the export
2. `app/components/blocks/index.tsx` - Add to blockComponents
3. `sanity/schemas/documents/page.ts` - Add to pageBuilder.of

### 5. Test

- Run `npm run dev`
- Go to /studio
- Create a page and add the new block
