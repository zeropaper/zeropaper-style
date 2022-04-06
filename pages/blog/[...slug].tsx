import ErrorPage from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MDXRenderer } from '../../components/MDXRenderer/MDXRenderer';
import { ExperimentalGetTinaClient } from '../../.tina/__generated__/types';

import getBlogContext from '../../lib/getBlogContext';
import { AsyncReturnType } from '../../typings';
import { LayoutContentWrapper } from '../../components/Layout/Layout';
import filterUnpublished from '../../lib/filterUnpublished';

const client = ExperimentalGetTinaClient();

export default function Post(
  props: AsyncReturnType<typeof getStaticProps>['props']
) {
  const { data, slug } = props;
  const router = useRouter();

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }
  if (!data) {
    return <ErrorPage statusCode={500} />;
  }
  const {
    // coverImage,
    // author,
    // ogImage,
    date,
    title,
    body,
  } = data?.getPostDocument?.data || {};
  return (
    <LayoutContentWrapper>
      <Head>
        <title>{title}</title>
        <meta name="description" content={'A blog post by zeropaper'} />
        {/* <meta property="og:image" content={ogImage?.url} /> */}
      </Head>

      <h1 data-tinafield="title">{title}</h1>

      <MDXRenderer data-tinafield="body" content={body} />
    </LayoutContentWrapper>
  );
}

type GetStaticPropsCtx = {
  params: {
    slug: string[];
  };
};

export const getStaticProps = async (props: GetStaticPropsCtx) => {
  const slug = props.params.slug.join('/');
  const itemFromContext = filterUnpublished(
    Object.values(await getBlogContext())
  ).find((item) => item.slug === slug);
  const doc = await client.getPostDocument({
    relativePath: itemFromContext?.relativePath || '',
  });

  return {
    props: {
      slug,
      ...doc,
    },
  };
};

export async function getStaticPaths() {
  const context = await getBlogContext();
  return {
    paths: filterUnpublished(Object.values(context))
      .map(({ slug }) => {
        if (slug) return { params: { slug: slug.split('/') } };
      })
      .filter(Boolean),
    fallback: false,
  };
}
