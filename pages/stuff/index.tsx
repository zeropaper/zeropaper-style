import Head from 'next/head';
import { LayoutContentWrapper } from '../../components/Layout/Layout';
import { DraftLink as Link } from '../../components/Link/Link';
import filterUnpublished from '../../lib/filterUnpublished';
import getStuffContext from '../../lib/getStuffContext';
import { AsyncReturnType } from '../../typings';

const Stuff = (props: AsyncReturnType<typeof getStaticProps>['props']) => {
  return (
    <LayoutContentWrapper>
      <Head>
        <meta name="description" content="Stuff by zeropaper" />
      </Head>

      <h1>Stuff</h1>

      <ul>
        {props.data.posts.map((post) => (
          <li key={post.href}>
            <Link unpublished={!post?.published} href={post.href}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </LayoutContentWrapper>
  );
};

export default Stuff;

export const getStaticProps = async function () {
  const postsListData = await getStuffContext();
  return {
    props: {
      data: {
        posts: filterUnpublished(Object.values(postsListData)),
      },
    },
  };
};
