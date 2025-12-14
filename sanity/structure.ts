import { StructureBuilder } from 'sanity/structure';
import {
  CogIcon,
  DocumentsIcon,
  TagIcon,
  ProjectsIcon,
  ComposeIcon,
  MenuIcon,
  BlockElementIcon,
} from '@sanity/icons';

// Singleton document IDs
const SINGLETON_TYPES = ['siteSettings', 'navigation', 'footer'];

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
              // Site Settings (singleton)
              S.listItem()
                .title('Site Settings')
                .icon(CogIcon)
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                ),
              // Navigation (singleton)
              S.listItem()
                .title('Navigation')
                .icon(MenuIcon)
                .child(
                  S.document()
                    .schemaType('navigation')
                    .documentId('navigation')
                ),
              // Footer (singleton)
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
              S.listItem()
                .title('Categories')
                .schemaType('category')
                .child(S.documentTypeList('category').title('Categories')),
              S.listItem()
                .title('Tags')
                .schemaType('tag')
                .child(S.documentTypeList('tag').title('Tags')),
            ])
        ),

      // Filter out singletons from the default list
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !SINGLETON_TYPES.includes(listItem.getId() as string) &&
          !['page', 'project', 'post', 'category', 'tag'].includes(
            listItem.getId() as string
          )
      ),
    ]);
