import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { TinaEditProvider } from 'tinacms/dist/edit-state'

import OryProvider from '../contexts/Ory'
import PostsProvider from '../contexts/Posts'

import '../styles/globals.css'

const TinaCMS = dynamic(() => import('tinacms'), { ssr: false })

const branch = process.env.NEXT_PUBLIC_EDIT_BRANCH || 'master'
const apiURL =
  process.env.NODE_ENV !== 'production' ||
  !process.env.NEXT_PUBLIC_TINA_CLIENT_ID
    ? 'http://localhost:4001/graphql'
    : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`

console.info('apiURL', apiURL)
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <PostsProvider>
        <OryProvider>
          <TinaEditProvider
            showEditButton
            editMode={
              <TinaCMS
                apiURL={apiURL}
                cmsCallback={(cms) => {
                  // import('react-tinacms-editor').then(
                  //   ({ MarkdownFieldPlugin, HtmlFieldPlugin }) => {
                  //     cms.plugins.add(MarkdownFieldPlugin)
                  //     // cms.plugins.add(HtmlFieldPlugin)
                  //   }
                  // )
                  cms.flags.set(
                    'branch-switcher',
                    !!process.env.NEXT_PUBLIC_TINA_CLIENT_ID
                  )
                  return cms
                }}
                documentCreatorCallback={{
                  /**
                   * After a new document is created, redirect to its location
                   */
                  onNewDocument: ({ collection: { slug }, breadcrumbs }) => {
                    // console.info('new document', slug, breadcrumbs)
                    const relativeUrl = `/${slug}/${breadcrumbs.join('/')}`
                    return (window.location.href = relativeUrl)
                  }
                  /**
                   * Only allows documents to be created to the `Blog Posts` Collection
                   */
                  // filterCollections: (options) => {
                  //   return options.filter(
                  //     (option) => option.label === 'Documentation'
                  //   )
                  // }
                }}
              >
                <Component {...pageProps} />
              </TinaCMS>
            }
          >
            <Component {...pageProps} />
          </TinaEditProvider>
        </OryProvider>
      </PostsProvider>
    </>
  )
}

export default App
