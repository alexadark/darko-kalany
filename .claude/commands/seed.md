# Command: /seed

Generates demo data for the site.

## Instructions

### 1. Analyze existing structure

Read schemas in `sanity/schemas/` to understand:
- Document types (Page, Post, Project)
- Available blocks
- Taxonomies (Category, Tag)

### 2. Generate content

Create realistic and varied content:
- 5-10 pages with different block combinations
- 3-5 blog posts with categories and tags
- 2-3 portfolio projects
- Consistent categories and tags

### 3. NDJSON Format

Write to `seed/content.ndjson`:

```json
{"_type": "category", "_id": "cat-tech", "title": "Technology", "slug": {"_type": "slug", "current": "technology"}}
{"_type": "tag", "_id": "tag-react", "title": "React", "slug": {"_type": "slug", "current": "react"}}
{"_type": "post", "_id": "post-1", "title": "First Article", "slug": {"_type": "slug", "current": "first-article"}, "category": {"_type": "reference", "_ref": "cat-tech"}, "tags": [{"_type": "reference", "_ref": "tag-react", "_key": "t1"}]}
```

### 4. Image handling

For images, use placeholders:
```json
{"_type": "image", "asset": {"_type": "reference", "_ref": "image-placeholder"}}
```

Or instruct the user to upload images manually.

### 5. Import

```bash
npx sanity dataset import seed/content.ndjson production
```

Useful options:
- `--replace` - Replace existing documents with the same _id
- `--missing` - Only import missing documents
