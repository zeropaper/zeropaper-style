import { defineSchema } from '@tinacms/cli'

const ACTIONS = {
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

export default defineSchema({
  collections: [
    {
      label: 'Pages',
      name: 'page',
      path: 'content/pages',
      format: 'json',
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
        // {
        //   label: 'Blocks',
        //   name: 'blocks',
        //   type: 'object',
        //   list: true,
        //   templates: [
        //     {
        //       label: 'Hero',
        //       name: 'hero',
        //       fields: [
        //         { name: 'href', label: 'HREF', type: 'string' },
        //         { name: 'title', label: 'Title', type: 'string' },
        //         { name: 'description', label: 'Description', type: 'string' },
        //       ],
        //     },
        //     feature,
        //     {
        //       label: 'Features',
        //       name: 'features',
        //       fields: [
        //         { name: 'headline', label: 'Headline', type: 'string' },
        //         { name: 'subline', label: 'Subline', type: 'string' },
        //         { name: 'items', label: 'Items', type: 'object', list: true, templates: [feature] },
        //       ],
        //     },
        //     {
        //       name: 'flying',
        //       label: 'Flying',
        //       fields: [
        //         { name: 'headline', type: 'string' },
        //         { name: 'subline', type: 'string' },
        //         ACTIONS,
        //         {
        //           name: 'items',
        //           type: 'object',
        //           list: true,
        //           fields: [
        //             { name: 'headline', type: 'string' },
        //             { name: 'subline', type: 'string' },
        //             {
        //               name: 'cli',
        //               type: 'boolean',
        //               ui: { defaultValue: false },
        //             },
        //           ],
        //         },
        //       ],
        //     },
        //   ],
        // },
      ],
    },
    {
      label: 'Blog Posts',
      name: 'post',
      path: 'content/posts',
      format: 'mdx',
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Excerpt',
          name: 'excerpt',
        },
        // {
        //   // type: 'string',
        //   type: 'image',
        //   label: 'Cover Image',
        //   name: 'coverImage',
        // },
        {
          type: 'string',
          label: 'Date',
          name: 'date',
        },
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