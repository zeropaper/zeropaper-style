import getLandingPageList from '../lib/getLandingPageList';
import getPageList from '../lib/getPageList';

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
  const landingPages = await getLandingPageList();
  const pages = await getPageList();
  const aggregated = [
    ...(landingPages?.data?.landingPageConnection?.edges || []),
    ...(pages?.data?.pageConnection?.edges || [])
  ] as {
    node: {
      id: string;
      published?: boolean;
      title: string;
      description?: string;
      excerpt?: string;
      body?: any;
    };
  }[];
  const returned = aggregated
    .reduce((obj: any, page) => {
      const {
        node: {
          id,
          published = false,
          title = null,
          description = null,
          excerpt = null,
        }
      } = page;
      const slug = slugify(id);
      // faster than destructuring
      obj[slug] = { title, description, excerpt, published, id, slug, href: `/${slug}/` };
      return obj;
    }, {});
  return returned as {
    [slug: string]: {
      id: string;
      href: string;
      slug: string;
      title: string;
      description?: string;
      excerpt?: string;
      published: boolean;
    };
  };
};

export default getPageContext;
