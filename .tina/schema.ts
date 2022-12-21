
import { defineSchema, SchemaField, Collection } from "tinacms";

import { footerSchema } from "../components/Layout/Footer";
import { headerSchema } from "../components/Layout/Header";
import { menuSchema } from "../components/Layout/Menu";


// Fields

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

// Block templates

const deco = {
  name: 'deco', label: 'Deco', type: 'object', fields: [
    { name: 'slant', label: 'Slant', type: 'boolean' },
    { name: 'background', label: 'Background', type: 'string', options: ['red', 'blue', 'green', 'yellow'] }
  ]
}

const feature = {
  label: 'Feature',
  name: 'feature',
  fields: [
    { name: 'href', label: 'HREF', type: 'string' },
    { name: 'title', label: 'Title', type: 'string' },
    { name: 'description', label: 'Description', type: 'string' },
    deco,
  ] as SchemaField[],
}

const hero = {
  label: 'Hero',
  name: 'hero',
  fields: [
    { name: 'href', label: 'HREF', type: 'string' },
    { name: 'title', label: 'Title', type: 'string' },
    { name: 'description', label: 'Description', type: 'string' },
    deco,
  ] as SchemaField[],
}

const markdown = {
  label: 'Markdown',
  name: 'markdown',
  fields: [
    {
      name: 'content',
      label: 'Content',
      type: "rich-text",
      isBody: false,
    },
    deco,
  ] as SchemaField[],
}

const timelineItem = {
  label: 'Timeline Item',
  name: 'timelineItem',
  fields: [
    titleField,
    {
      name: 'employer',
      label: 'Employer',
      type: "string",
    },
    {
      name: 'text',
      label: 'Text',
      type: "rich-text",
      isBody: false,
    },
    {
      name: 'from',
      label: 'From',
      type: 'string',
      // type: "datetime",
      // ui: {
      //   dateFormat: 'YYYY-MM'
      // }
    },
    {
      name: 'to',
      label: 'To',
      type: 'string',
      // type: "datetime",
      // ui: {
      //   dateFormat: 'YYYY-MM'
      // }
    },
    {
      name: 'stack',
      label: 'Stack',
      type: "string",
      list: true,
    },
    {
      name: 'links',
      label: 'Links',
      type: "string",
      list: true,
    },
  ] as SchemaField[],
}

const timeline = {
  label: 'Timeline',
  name: 'timeline',
  fields: [
    {
      name: 'introduction',
      label: 'Introduction',
      type: "rich-text",
      isBody: false,
    },
    {
      label: 'Items',
      name: 'items',
      type: 'object',
      list: true,
      templates: [
        timelineItem,
      ],
    }
  ] as SchemaField[],
}

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
        hero,
        feature,
        markdown,
        timeline,
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
