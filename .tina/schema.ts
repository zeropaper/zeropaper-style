
import { defineSchema, defineConfig, RouteMappingPlugin, TinaField } from "tinacms";
import { client } from "./__generated__/client";

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

const slugField: TinaField = {
  type: 'string',
  label: 'Slug',
  name: 'slug',
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

export const schema = defineSchema({
  config: {
    // clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
    // branch:
    //   process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
    //   process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    //   process.env.HEAD!, // Netlify branch env
    // token: process.env.TINA_TOKEN!,
    media: {
      tina: {
        publicFolder: "public",
        mediaRoot: "uploads",
      },
    },
  },
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
        slugField,
        dateField,
        // seoFields,
        tagsField,
        {
          type: 'string',
          label: 'picture',
          name: 'picture',
        },
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
  ],
});


export const tinaConfig = defineConfig({
  client,
  schema,
  cmsCallback: (cms) => {
    /**
     * When `tina-admin` is enabled, this plugin configures contextual editing for collections
     */
    const RouteMapping = new RouteMappingPlugin((collection, document) => {
      if (["page", "landingPage"].includes(collection.name)) {
        if (document._sys.filename === "home") {
          return `/`;
        }
        if (document._sys.filename === "no-cookies") {
          return `/no-cookies`;
        }
        return undefined;
      }
      return `/${collection.name}/${document._sys.filename}`;
    });
    cms.plugins.add(RouteMapping);

    return cms;
  },
  formifyCallback: ({ formConfig, createForm, createGlobalForm }) => {
    if (formConfig.id === "content/global/index.json") {
      return createGlobalForm(formConfig);
    }

    return createForm(formConfig);
  },
});

export default schema;
