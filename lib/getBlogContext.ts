import { ExperimentalGetTinaClient } from '../.tina/__generated__/types';

type Post = {
  title: string;
  excerpt: string;
  href: string;
  id: string;
  relativePath: string;
  slug: string;
  date: string | null;
};
export const getBlogContext = async (): Promise<{ [k: string]: Post }> => {
  const client = ExperimentalGetTinaClient();
  const posts = await client.getPostList();
  const returned = posts?.data?.getPostList?.edges || []
  return returned
    .reduce((obj, {
      node: {
        id,
        data: {
          title = null,
          excerpt = null,
          date = null,
          slug: postSlug = null
        }
      }
    }: any) => ({
      ...obj,
      [id]: {
        title,
        excerpt,
        date,
        id,
        relativePath: id.replace('content/blog/', ''),
        slug: postSlug || id,
        href: `/blog/${postSlug || id}`
      }
    }), {}) as {
      [key: string]: Post
    };
};

export default getBlogContext;
