import { defineSchema, TinaField, TinaTemplate } from '@tinacms/cli'

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

const dateField: TinaField = {
  label: "Date",
  name: "date",
  type: "datetime",
  ui: {
    dateFormat: 'YYYY-MM-DD'
  }
}

const tagsField: TinaField = {
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

const mdxBodyField: TinaField = {
  type: "rich-text",
  label: "Body",
  name: "body",
  isBody: true,
}

const publishedField: TinaField = {
  type: 'boolean',
  name: 'published',
  label: 'Published',
}
const titleField: TinaField = {
  type: 'string',
  name: 'title',
  label: 'Title',
}
const descriptionField: TinaField = {
  type: 'string',
  name: 'description',
  label: 'Description',
}

const seoFields: TinaField = {
  type: 'object',
  name: 'seo',
  label: 'SEO',
  fields: [
    titleField,
    descriptionField,
  ],
};

const pageFields: TinaField[] = [
  titleField,
  descriptionField,
  publishedField,
]

export default defineSchema({
  collections: [
    {
      label: 'Landing Pages',
      name: 'landingPage',
      path: 'content/landing',
      format: 'json',
      match: '*.json',
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
    },
    {
      label: 'Pages',
      name: 'page',
      path: 'content/pages',
      match: '*.mdx',
      format: 'mdx',
      fields: [
        ...pageFields,
        mdxBodyField,
      ],
    },
    {
      label: 'Tags',
      name: 'tag',
      path: 'content/tags',
      format: 'json',
      match: '*.json',
      fields: [
        { type: 'string', name: 'name' },
        { type: 'string', name: 'slug' },
        { type: 'string', name: 'description' },
      ],
    },
    {
      label: 'Stuff',
      name: 'stuff',
      path: 'content/stuff',
      match: '**/*.mdx',
      format: 'mdx',
      fields: [
        ...pageFields,
        {
          type: 'string',
          label: 'Slug',
          name: 'slug',
        },
        dateField,
        // seoFields,
        tagsField,
        {
          type: 'string',
          label: 'iframe',
          name: 'iframe',
        },
        {
          type: 'string',
          label: 'Source',
          name: 'source',
        },
        mdxBodyField,
      ],
    },
    {
      label: 'Blog Posts',
      name: 'post',
      path: 'content/blog',
      format: 'mdx',
      fields: [
        ...pageFields,
        {
          type: 'string',
          label: 'Slug',
          name: 'slug',
        },
        tagsField,
        dateField,
        mdxBodyField,
      ],
    },
  ],
})