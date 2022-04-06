import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { ExperimentalGetTinaClient } from '../.tina/__generated__/types';
import Grid from '../components/Grid/Grid';
import { LayoutContentWrapper } from '../components/Layout/Layout';
import { MDXRenderer } from '../components/MDXRenderer/MDXRenderer';
import filterUnpublished from '../lib/filterUnpublished';
import { getPageContext } from '../lib/getPageContext';
import { AsyncReturnType } from '../typings';

export default function Page(
  props: AsyncReturnType<typeof getStaticProps>['props']
) {
  const { data, slug } = props;
  const router = useRouter();

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }

  const { title, seo, blocks, body } =
    // @ts-ignore
    (data?.getPageDocument || data?.getLandingPageDocument)?.data || {};
  return (
    <LayoutContentWrapper>
      <Head>
        <title>{title}</title>
        {/* <meta property="og:image" content={ogImage?.url} /> */}
      </Head>

      <h1 data-tinafield="title">{title}</h1>

      {body ? (
        <MDXRenderer tinaField="body" content={body || ''} />
      ) : (
        <Grid blocks={blocks || []} />
      )}
    </LayoutContentWrapper>
  );
}

export const getStaticProps = async ({ params }: { params: any }) => {
  const client = ExperimentalGetTinaClient();
  const { slug } = params;
  const pageContext = await getPageContext();

  try {
    const page = await client.getPageDocument({ relativePath: `${slug}.mdx` });
    if (Object.keys(page.data).length === 0) throw new Error('No data');
    return {
      props: {
        pageContext,
        slug,
        ...page,
      },
    };
  } catch (e) {
    const landingPage = await client.getLandingPageDocument({
      relativePath: `${slug}.json`,
    });

    return {
      props: {
        pageContext,
        slug,
        ...landingPage,
      },
    };
  }
};

export async function getStaticPaths() {
  try {
    const res = await getPageContext();
    return {
      paths: filterUnpublished(Object.keys(res)).map((slug) => `/${slug}`),
      fallback: false,
    };
  } catch (e) {
    return { paths: [], fallback: true };
  }
}
