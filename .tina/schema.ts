
import { defineSchema, defineConfig, RouteMappingPlugin, SchemaField } from "tinacms";
import { client } from "./__generated__/client";

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

export const schema = defineSchema({
  collections: [
    {
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
    },
    {
      label: 'Landing Pages',
      name: 'landingPage',
      path: 'content/landing',
      format: 'json',
      // match: '*.json',
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
      // match: '*.mdx',
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
      // match: '*.json',
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
      // match: '**/*.mdx',
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
    },
  ],
});


// export const tinaConfig = defineConfig({
//   // @ts-ignore
//   client,
//   schema,
//   cmsCallback: (cms) => {
//     /**
//      * When `tina-admin` is enabled, this plugin configures contextual editing for collections
//      */
//     const RouteMapping = new RouteMappingPlugin((collection, document) => {
//       if (["page", "landingPage"].includes(collection.name)) {
//         if (document._sys.filename === "home") {
//           return `/`;
//         }
//         if (document._sys.filename === "no-cookies") {
//           return `/no-cookies`;
//         }
//         return undefined;
//       }
//       return `/${collection.name}/${document._sys.filename}`;
//     });
//     cms.plugins.add(RouteMapping);

//     return cms;
//   },
//   formifyCallback: ({ formConfig, createForm, createGlobalForm }) => {
//     if (formConfig.id === "content/global/index.json") {
//       return createGlobalForm(formConfig);
//     }

//     return createForm(formConfig);
//   },
// });

export default schema;
