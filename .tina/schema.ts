import { defineSchema } from '@tinacms/cli'

type Field = Parameters<typeof defineSchema>[0]['collections'][0]['fields'][0]

const ACTIONS: Field = {
  name: 'actions' as const,
  type: 'object' as const,
  list: true,
  fields: [
    { name: 'label', type: 'string' as const },
    { name: 'icon', type: 'string' as const },
    { name: 'variant', type: 'string' as const },
    { name: 'url', type: 'string' as const },
  ],
}

const feature = {
  label: 'Feature' as const,
  name: 'feature' as const,
  fields: [
    { name: 'href', label: 'HREF', type: 'string' as const },
    { name: 'title', label: 'Title', type: 'string' as const },
    { name: 'description', label: 'Description', type: 'string' as const },
  ],
}

const dateField: Field = {
  label: "Date",
  name: "date",
  type: "datetime",
  ui: {
    dateFormat: 'YYYY-MM-DD'
  }
}

const tagsField: Field = {
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

export default defineSchema({
  collections: [
    {
      label: 'Landing Pages',
      name: 'landingPage',
      path: 'content/landing',
      format: 'json',
      match: '*.json',
      fields: [
        { type: 'string', name: 'title' },
        {
          type: 'object',
          name: 'seo',
          label: 'SEO',
          fields: [
            { type: 'string', name: 'title' },
            { type: 'string', name: 'description' },
          ],
        },
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
            {
              label: 'Features',
              name: 'features',
              fields: [
                { name: 'headline', label: 'Headline', type: 'string' },
                { name: 'subline', label: 'Subline', type: 'string' },
                { name: 'items', label: 'Items', type: 'object', list: true, templates: [feature] },
              ],
            },
            {
              name: 'flying',
              label: 'Flying',
              fields: [
                { name: 'headline', type: 'string' },
                { name: 'subline', type: 'string' },
                ACTIONS,
                {
                  name: 'items',
                  type: 'object',
                  list: true,
                  fields: [
                    { name: 'headline', type: 'string' },
                    { name: 'subline', type: 'string' },
                    {
                      name: 'cli',
                      type: 'boolean',
                      ui: { defaultValue: false },
                    },
                  ],
                },
              ],
            },
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
        { type: 'string', name: 'title' },
        {
          type: 'object',
          name: 'seo',
          label: 'SEO',
          fields: [
            // { type: 'string', name: 'title' },
            { type: 'string', name: 'description' },
          ],
        },
        {
          type: 'string',
          label: 'Excerpt',
          name: 'excerpt',
        },
        // {
        //   type: 'image',
        //   label: 'Image',
        //   name: 'ogImage',
        // },
        {
          type: 'rich-text',
          label: 'Body',
          name: 'body',
          isBody: true,
        },
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
        { type: 'string', name: 'title' },
        { type: 'string', name: 'description' },
        {
          type: 'string',
          label: 'Slug',
          name: 'slug',
        },
        dateField,
        {
          type: 'object',
          name: 'seo',
          label: 'SEO',
          fields: [
            { type: 'string', name: 'title' },
            { type: 'string', name: 'description' },
          ],
        },
        tagsField,
        {
          type: 'string',
          label: 'iframe',
          name: 'iframe',
        },
        {
          type: 'rich-text',
          label: 'Body',
          name: 'body',
          isBody: true,
        },
      ],
    },
    {
      label: 'Blog Posts',
      name: 'post',
      path: 'content/blog',
      format: 'mdx',
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Slug',
          name: 'slug',
        },
        {
          type: 'string',
          label: 'Excerpt',
          name: 'excerpt',
        },
        tagsField,
        // {
        //   // type: 'string',
        //   type: 'image',
        //   label: 'Cover Image',
        //   name: 'coverImage',
        // },
        dateField,
        // {
        //   type: 'object',
        //   label: 'Author',
        //   name: 'author',
        //   fields: [
        //     {
        //       type: 'string',
        //       label: 'Name',
        //       name: 'name',
        //     },
        //     {
        //       type: 'string',
        //       label: 'Picture',
        //       name: 'picture',
        //     },
        //   ],
        // },
        // {
        //   type: 'object',
        //   label: 'OG Image',
        //   name: 'ogImage',
        //   fields: [
        //     {
        //       // type: 'string',
        //       type: 'image',
        //       label: 'Url',
        //       name: 'url',
        //     },
        //   ],
        // },
        {
          type: 'rich-text',
          label: 'Body',
          name: 'body',
          isBody: true,
        },
      ],
    },
  ],
})