import { ExperimentalGetTinaClient } from '../.tina/__generated__/types';

const slugify = (id: string): string => {
  let slug = id;

  if (id.startsWith('content/landing')) {
    slug = slug.replace('content/landing/', '');
  } else if (id.startsWith('content/pages')) {
    slug = slug.replace('content/pages/', '');
  }

  return slug.split('.')[0] || '';
};

export const getPageContext = async () => {
  const client = ExperimentalGetTinaClient();
  const landingPages = await client.getLandingPageList();
  const pages = await client.getPageList();
  const returned = [
    ...(landingPages?.data?.getLandingPageList?.edges || []),
    ...(pages?.data?.getPageList?.edges || [])
  ]
    .reduce((obj: any, page: any) => {
      const {
        node: {
          id,
          data: {
            published = false,
            title = null,
            excerpt = null
          }
        }
      } = page;
      const slug = slugify(id);
      // faster than destructuring
      obj[slug] = { title, excerpt, published, id, slug, href: `/${slug}/` };
      return obj;
    }, {});
  return returned as {
    [slug: string]: {
      id: string;
      href: string;
      slug: string;
      title: string;
      excerpt?: string;
      published: boolean;
    };
  };
};

export default getPageContext;
