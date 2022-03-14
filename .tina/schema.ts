import { defineSchema, TinaField, TinaTemplate } from '@tinacms/cli'

const ACTIONS: TinaField = {
  name: 'actions',
  type: 'object',
  list: true,
  fields: [
    { name: 'label', type: 'string' },
    { name: 'icon', type: 'string' },
    { name: 'variant', type: 'string' },
    { name: 'url', type: 'string' },
  ],
}

const defaultFeature = {
  href: 'https://zeropaper.style',
  title: "Here's Another Feature",
  description: "This is where you might talk about the feature, if this wasn't just filler text.",
}

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

type MdxTemplate = TinaTemplate & { inline?: boolean }

const mdxDateTime: MdxTemplate = {
  name: "DateTime",
  label: "Date & Time",
  inline: true,
  fields: [
    {
      name: "format",
      label: "Format",
      type: "string",
      options: ["utc", "iso", "local"],
    },
  ],
}

const mdxBlockQuote: MdxTemplate = {
  name: "BlockQuote",
  label: "Block Quote",
  fields: [
    {
      name: "children",
      label: "Quote",
      type: "rich-text",
    },
    {
      name: "authorName",
      label: "Author",
      type: "string",
    },
  ],
}

const mdxNewsletterSignup: MdxTemplate = {
  name: "NewsletterSignup",
  label: "Newsletter Sign Up",
  fields: [
    {
      name: "children",
      label: "CTA",
      type: "rich-text",
    },
    {
      name: "placeholder",
      label: "Placeholder",
      type: "string",
    },
    {
      name: "buttonText",
      label: "Button Text",
      type: "string",
    },
    {
      name: "disclaimer",
      label: "Disclaimer",
      type: "rich-text",
    },
  ],
  ui: {
    defaultItem: {
      placeholder: "Enter your email",
      buttonText: "Notify Me",
    },
  },
}

const mdxBodyField: TinaField = {
  type: "rich-text",
  label: "Body",
  name: "body",
  templates: [
    // mdxDatTime,
    // mdxBlockQuote,
    // mdxNewsletterSignup,
  ],
  isBody: true,
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
            // {
            //   label: 'Features',
            //   name: 'features',
            //   fields: [
            //     { name: 'headline', label: 'Headline', type: 'string' },
            //     { name: 'subline', label: 'Subline', type: 'string' },
            //     { name: 'items', label: 'Items', type: 'object', list: true, templates: [feature] },
            //   ],
            // },
            // {
            //   name: 'flying',
            //   label: 'Flying',
            //   fields: [
            //     { name: 'headline', type: 'string' },
            //     { name: 'subline', type: 'string' },
            //     ACTIONS,
            //     {
            //       name: 'items',
            //       type: 'object',
            //       list: true,
            //       fields: [
            //         { name: 'headline', type: 'string' },
            //         { name: 'subline', type: 'string' },
            //         {
            //           name: 'cli',
            //           type: 'boolean',
            //           ui: { defaultValue: false },
            //         },
            //       ],
            //     },
            //   ],
            // },
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
        mdxBodyField,
      ],
    },
  ],
})