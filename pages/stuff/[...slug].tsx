import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTina } from "tinacms/dist/edit-state";

import { MDXRenderer } from "../../components/MDXRenderer/MDXRenderer";
import getStuffContext from "../../lib/getStuffContext";
import IFrame from "../../components/IFrame/IFrame";
import { AsyncReturnType } from "../../typings";
import { LayoutContentWrapper } from "../../components/Layout/Layout";
import filterUnpublished from "../../lib/filterUnpublished";
import getStuffDocument from "lib/getStuffDocument";

export default function Stuff(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const { slug } = props;
  const router = useRouter();

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }
  if (!data) {
    return <ErrorPage statusCode={500} />;
  }
  const stuff = data?.stuff || {};
  const { title, body, description, iframe: iframeSrc, source } = stuff;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description || "Stuff by zeropaper"}
        />
        {/* <meta property="og:image" content={ogImage?.url} /> */}
      </Head>

      {iframeSrc ? (
        <IFrame
          title={title || ""}
          iframe={iframeSrc}
          source={source || ""}
          description={description || ""}
          tags={(stuff.tags as string[]) || []}
          mdx={body}
        />
      ) : (
        <LayoutContentWrapper>
          <MDXRenderer data-tinafield="body" content={body} />
        </LayoutContentWrapper>
      )}
    </>
  );
}

export const getStaticProps = async (props: { params: any }) => {
  const slug = props.params.slug.join("/");

  const itemFromContext = Object.values(await getStuffContext()).find(
    (item) => item.slug === slug
  );

  const landingPage = await getStuffDocument({
    relativePath: itemFromContext?.relativePath || "",
  });

  return {
    props: {
      slug,
      ...landingPage,
    },
  };
};

export async function getStaticPaths() {
  const context = await getStuffContext();
  return {
    paths: filterUnpublished(Object.values(context))
      .map(({ slug }) => {
        if (slug) return { params: { slug: slug.split("/") } };
      })
      .filter(Boolean),
    fallback: false,
  };
}
