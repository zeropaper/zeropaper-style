import type { AppProps } from 'next/app'
import Head from 'next/head';
import dynamic from 'next/dynamic'
import { TinaEditProvider } from 'tinacms/dist/edit-state'
import Layout from '../components/Layout/Layout'

import '../styles/globals.css'
import ThemeProvider from '../themes/Theme'

const TinaCMS = dynamic(() => import('tinacms'), { ssr: false })

const branch = process.env.NEXT_PUBLIC_EDIT_BRANCH || 'master'
const apiURL =
  process.env.NODE_ENV !== 'production' ||
  !process.env.NEXT_PUBLIC_TINA_CLIENT_ID
    ? 'http://localhost:4001/graphql'
    : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`


// console.info('Tina API URL', apiURL)

const getPageData = (pageProps: any): any => (
  pageProps?.data?.getStuffDocument
  || pageProps?.data?.getPostDocument
  || pageProps?.data?.getTagDocument
  || pageProps?.data?.getPageDocument
  || pageProps?.data?.getLandingPageDocument
  )?.data

const App = ({ Component, pageProps }: AppProps) => {
  const pageData = getPageData(pageProps)
  console.info('App', pageData)

  const editMode = (
    <TinaCMS
      apiURL={apiURL}
      cmsCallback={(cms) => {
        cms.flags.set(
          'branch-switcher',
          !!process.env.NEXT_PUBLIC_TINA_CLIENT_ID
        )
        return cms
      }}
      documentCreatorCallback={{
        onNewDocument: ({ collection: { slug }, breadcrumbs }) => {
          console.info('new document', slug, breadcrumbs)
          const relativeUrl = `${slug.toLowerCase().endsWith('page') ? '' : `/${slug}`}/${breadcrumbs.join('/')}`
          return (window.location.href = relativeUrl)
        }
      }}
    >
      <Component {...pageProps} />
    </TinaCMS>
  )

  return (
    <>
      <Head>
        {/* <title>{}</title> */}
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider
        withGlobalStyles
        withNormalizeCSS
      >
        <Layout component={pageData?.iframe ? undefined : 'div'}>
          <TinaEditProvider
            // showEditButton
            editMode={editMode}
          >
            <Component {...pageProps} />
          </TinaEditProvider>
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default App
