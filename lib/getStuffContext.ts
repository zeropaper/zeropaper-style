import { ExperimentalGetTinaClient } from '../.tina/__generated__/types';

type Stuff = {
  title: string;
  excerpt: string;
  href: string;
  id: string;
  relativePath: string;
  slug: string;
  published?: boolean;
  date: string | null;
};
export const getStuffContext = async (): Promise<{ [k: string]: Stuff }> => {
  const client = ExperimentalGetTinaClient();
  const posts = await client.getStuffList();
  const returned = posts?.data?.getStuffList?.edges || []
  return returned
    .reduce((obj, {
      node: {
        id,
        data: {
          published = false,
          title = null,
          excerpt = null,
          date = null,
          slug: postSlug = null
        }
      }
    }: any) => ({
      ...obj,
      [id]: {
        published,
        title,
        excerpt,
        date,
        id,
        relativePath: id.replace('content/stuff/', ''),
        slug: postSlug || id,
        href: `/stuff/${postSlug || id}`
      }
    }), {}) as {
      [key: string]: Stuff
    };
};

export default getStuffContext;
