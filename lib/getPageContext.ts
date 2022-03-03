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
    .reduce((obj, {
      node: {
        id,
        data: {
          title = null, excerpt = null
        }
      }
    }: any) => {
      const slug = slugify(id);
      return {
        ...obj,
        [slug]: { title, excerpt, id, slug, href: `/${slug}/` }
      };
    }, {});
  return returned as {
    [slug: string]: {
      id: string;
      href: string;
      title: string;
      excerpt?: string;
    };
  };
};

export default getPageContext;