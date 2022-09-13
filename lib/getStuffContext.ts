import getStuffList from './getStuffList';

export type Stuff = {
  title: string;
  description: string;
  href: string;
  id: string;
  relativePath: string;
  slug: string;
  published?: boolean;
  date: string | null;
  picture: string | null;
};

export const getStuffContext = async (): Promise<{ [k: string]: Stuff }> => {
  const posts = await getStuffList();
  const returned = posts?.data?.stuffConnection?.edges || []
  return returned
    .reduce((obj: {
      [key: string]: Stuff
    }, {
      node: {
        id,
        published = false,
        title = null,
        description = null,
        date = null,
        picture = null,
        slug: postSlug = null
      }
    }: any) => ({
      ...obj,
      [id]: {
        published: !!published,
        title,
        description,
        date,
        picture,
        id,
        relativePath: id.replace('content/stuff/', ''),
        slug: postSlug || id,
        href: `/stuff/${postSlug || id}`
      }
    }), {} as {
      [key: string]: Stuff
    });
};

export default getStuffContext;
