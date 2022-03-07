import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTina } from 'tinacms/dist/edit-state'
import { MDXRenderer } from '../../components/MDXRenderer/MDXRenderer'
import { ExperimentalGetTinaClient } from '../../.tina/__generated__/types'

import getStuffContext from '../../lib/getStuffContext'
import IFrame from '../../components/IFrame/Iframe'

export default function Stuff(props: AsyncReturnType<typeof getStaticProps>['props']) {
  const { data: initialData, slug, query, variables } = props
  const router = useRouter()

  const { data } = useTina({
    query,
    variables,
    data: initialData
  })

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }
  if (!data) {
    return <ErrorPage statusCode={500} />
  }
  const stuff = data?.getStuffDocument?.data || {}
  const {
    date,
    title,
    body,
    description,
    iframe: iframeSrc,
    source,
  } = stuff
  return (
    <>
      <Head>
        <title>{title} | Next.js Stuff Example</title>
        {/* <meta property="og:image" content={ogImage?.url} /> */}
      </Head>

      {iframeSrc ? <IFrame
        title={title || ''}
        src={iframeSrc}
        source={source}
        description={description || ''}
        tags={stuff.tags as string[] || []}
      /> :
        <MDXRenderer
          data-tinafield="body"
          content={body}
        />}
    </>
  )
}

export const getStaticProps = async (props: { params: any }) => {
  const slug = props.params.slug.join('/')
  const client = ExperimentalGetTinaClient()

  const itemFromContext = Object.values(await getStuffContext()).find(item => item.slug === slug)

  const landingPage = await client.getStuffDocument({
    relativePath: itemFromContext?.relativePath || ''
  });
    
  return {
    props: {
      slug,
      ...landingPage
    }
  }
}

export async function getStaticPaths() {
  const context = await getStuffContext()
  return {
    paths: Object.values(context).map(({slug, id, date}) => {
      if (slug) return { params: { slug: slug.split('/') } };
    }).filter(Boolean),
    fallback: false
  }
}
