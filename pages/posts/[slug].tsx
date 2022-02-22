import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { staticRequest } from 'tinacms'
import { useTina } from 'tinacms/dist/edit-state'
import { TinaMarkdown } from 'tinacms/dist/rich-text'

import { getPosts } from '../../contexts/Posts'

const mdComponents = {
  h1: (props: any) => <h1 {...props} />,
  h2: (props: any) => <h2 {...props} />,
  h3: (props: any) => <h3 {...props} />,
  h4: (props: any) => <h4 {...props} />,
  p: (props: any) => <p {...props} />
}

export default function Post(props: any) {
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
  const { title, coverImage, date, author, body, ogImage } =
    data?.getPostDocument?.data || {}
  console.info('Post', initialData, data, slug)
  return (
    <article>
      <Head>
        <title>{title} | Next.js Blog Example</title>
        <meta property="og:image" content={ogImage?.url} />
      </Head>

      <h1 data-tinafield="title">{title}</h1>
      <TinaMarkdown
        data-tinafield="body"
        components={mdComponents}
        content={body}
      />
    </article>
  )
}

export const getStaticProps = async ({ params }: { params: any }) => {
  const { slug } = params
  const variables = { relativePath: `${slug}.md` }
  // const variables = { relativePath: `hello-world.md` };
  console.info('getStaticProps', params, variables)
  const query = `
    query BlogPostQuery($relativePath: String!) {
      getPostDocument(relativePath: $relativePath) {
        data {
          title
          excerpt
          date
          body
        }
      }
    }
  `
  const data = (await staticRequest({
    query: query,
    variables: variables
  })) as any

  return {
    props: {
      query,
      variables,
      data: {
        ...(data?.getPostDocument?.data || {})
        // body: await markdownToHtml(data.getPostDocument.data.body),
      },
      slug
    }
  }
}

// type QueryResult = {
//   getPostList: {
//     edges: {
//       node: {
//         sys: {
//           filename: string
//         }
//       }
//     }[]
//   }
// }

// export { getPosts }
// export const getPosts = async (): Promise<QueryResult> => {
//   const postsListData = await staticRequest({
//     query: `
//       query {
//         getPostList {
//           edges {
//             node {
//               sys {
//                 filename
//               }
//             }
//           }
//       }
//     }
//     `,
//     variables: {}
//   })
//   return postsListData as QueryResult
// }

export async function getStaticPaths() {
  const postsListData = await getPosts()
  return {
    paths: postsListData.getPostList.edges.map((edge) => ({
      params: { slug: edge.node.sys.filename }
    })),
    fallback: false
  }
}
