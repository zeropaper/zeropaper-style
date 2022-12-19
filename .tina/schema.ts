
import { defineSchema, SchemaField, Collection } from "tinacms";

import { footerSchema } from "../components/Layout/Footer";
import { headerSchema } from "../components/Layout/Header";
import { menuSchema } from "../components/Layout/Menu";

const feature = {
  label: 'Feature' as const,
  name: 'feature' as const,
  fields: [
    { name: 'href', label: 'HREF', type: 'string' as const },
    { name: 'title', label: 'Title', type: 'string' as const },
    { name: 'description', label: 'Description', type: 'string' as const },
    {
      name: 'deco', label: 'Deco', type: 'object' as const, fields: [
        { name: 'slant', label: 'Slant', type: 'boolean' as const },
        { name: 'background', label: 'Background', type: 'string' as const, options: ['red', 'blue', 'green', 'yellow'] }
      ]
    },
  ],
}

const dateField: SchemaField = {
  label: "Date",
  name: "date",
  type: "datetime",
  ui: {
    dateFormat: 'YYYY-MM-DD'
  }
}

const tagsField: SchemaField = {
  label: "Tags",
  name: "tags",
  // type: "reference",
  // collections: ['tags'],
  type: "string",
  list: true,
  ui: {
    component: 'tags'
  }
}

const mdxBodyField: SchemaField = {
  type: "rich-text",
  label: "Body",
  name: "body",
  isBody: true,
}

const slugField: SchemaField = {
  type: 'string',
  label: 'Slug',
  name: 'slug',
}
const publishedField: SchemaField = {
  type: 'boolean',
  name: 'published',
  label: 'Published',
}
const titleField: SchemaField = {
  type: 'string',
  name: 'title',
  label: 'Title',
}
const descriptionField: SchemaField = {
  type: 'string',
  name: 'description',
  label: 'Description',
}

const seoFields: SchemaField = {
  type: 'object',
  name: 'seo',
  label: 'SEO',
  fields: [
    titleField,
    descriptionField,
  ],
};

const pageFields: SchemaField[] = [
  titleField,
  descriptionField,
  publishedField,
]

// Collections

const globals: Collection = {
  label: "Global",
  name: "global",
  path: "content/global",
  ui: {
    global: true,
  },
  format: "json",
  fields: [
    headerSchema,
    footerSchema,
    menuSchema,
  ],
}

const landingPages: Collection = {
  label: 'Landing Pages',
  name: 'landingPage',
  path: 'content/landing',
  format: 'json',
  fields: [
    ...pageFields,
    {
      label: 'Blocks',
      name: 'blocks',
      type: 'object',
      list: true,
      templates: [
        {
          label: 'Hero',
          name: 'hero',
          fields: [
            { name: 'href', label: 'HREF', type: 'string' },
            { name: 'title', label: 'Title', type: 'string' },
            { name: 'description', label: 'Description', type: 'string' },
          ],
        },
        feature,
      ],
    },
  ],
}

const pages: Collection = {
  label: 'Pages',
  name: 'page',
  path: 'content/pages',
  format: 'mdx',
  fields: [
    ...pageFields,
    mdxBodyField,
  ],
}

const tags: Collection = {
  label: 'Tags',
  name: 'tag',
  path: 'content/tags',
  format: 'json',
  fields: [
    { type: 'string', name: 'name' },
    { type: 'string', name: 'slug' },
    { type: 'string', name: 'description' },
  ],
}

const stuff: Collection = {
  label: 'Stuff',
  name: 'stuff',
  path: 'content/stuff',
  format: 'mdx',
  fields: [
    ...pageFields,
    slugField,
    dateField,
    // seoFields,
    tagsField,
    {
      type: 'image',
      label: 'Picture',
      name: 'picture',
    },
    {
      type: 'string',
      label: 'Iframe',
      name: 'iframe',
    },
    {
      type: 'string',
      label: 'Source',
      name: 'source',
    },
    mdxBodyField,
  ],
}

export const schema = defineSchema({
  collections: [
    globals,
    landingPages,
    pages,
    tags,
    stuff,
  ],
});

export default schema;
