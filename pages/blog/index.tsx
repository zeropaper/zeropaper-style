import Head from 'next/head';
import Link from '../../components/Link/Link';
import getBlogContext from '../../lib/getBlogContext';
import { AsyncReturnType } from '../../typings';

const Blog = (props: AsyncReturnType<typeof getStaticProps>['props']) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Blog</h1>

        <section>
          <ul>
            {props.data.posts.map((post) => (
              <li key={post.href}>
                <Link href={post.href}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Blog;

export const getStaticProps = async function () {
  const postsListData = await getBlogContext();
  return {
    props: {
      data: {
        posts: Object.values(postsListData),
      },
    },
  };
};
