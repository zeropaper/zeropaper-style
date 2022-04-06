import type { AppProps } from 'next/app';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { TinaEditProvider } from 'tinacms/dist/edit-state';

import Layout from '../components/Layout/Layout';
import ThemeProvider from '../themes/Theme';

const TinaCMS = dynamic(() => import('tinacms'), { ssr: false });

const branch = process.env.NEXT_PUBLIC_EDIT_BRANCH || 'next';
const apiURL =
  process.env.NODE_ENV !== 'production' ||
  !process.env.NEXT_PUBLIC_TINA_CLIENT_ID
    ? 'http://localhost:4001/graphql'
    : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;

// console.info('Tina API URL', apiURL)

const getPageData = (pageProps: any): any =>
  (
    pageProps?.data?.getStuffDocument ||
    pageProps?.data?.getPostDocument ||
    pageProps?.data?.getTagDocument ||
    pageProps?.data?.getPageDocument ||
    pageProps?.data?.getLandingPageDocument
  )?.data;

const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  const { relativePath } = pageProps?.variables || {};
  const pageData = getPageData(pageProps);

  const editMode = (
    <TinaCMS
      apiURL={apiURL}
      mediaStore={async () => {
        const pack = await import('next-tinacms-cloudinary');
        return pack.TinaCloudCloudinaryMediaStore;
      }}
      cmsCallback={(cms) => {
        /**
         * Flags
         */
        /**
         * Enables the Tina Admin Experience
         */
        cms.flags.set('tina-admin', true);
        /**
         * Enables the Branch Switcher
         */
        cms.flags.set('branch-switcher', true);
        /**
         * Plugins
         */
        import('tinacms').then(({ RouteMappingPlugin }) => {
          const RouteMapping = new RouteMappingPlugin(
            (collection, document) => {
              if (['authors', 'global'].includes(collection.name)) {
                return undefined;
              }

              if (['pages'].includes(collection.name)) {
                if (document.sys.filename === 'home') {
                  return `/`;
                }

                if (document.sys.filename === 'hello') {
                  return `/hello`;
                }
                if (document.sys.filename === 'no-cookies') {
                  return `/no-cookies`;
                }

                return undefined;
              }

              return `/${collection.name}/${document.sys.filename}`;
            }
          );
          cms.plugins.add(RouteMapping);
        });
        import('react-tinacms-editor').then(({ MarkdownFieldPlugin }) => {
          cms.plugins.add(MarkdownFieldPlugin);
        });
      }}
      documentCreatorCallback={{
        /**
         * After a new document is created, redirect to its location
         */
        onNewDocument: ({ collection: { slug }, breadcrumbs }) => {
          const relativeUrl = `/${slug}/${breadcrumbs.join('/')}`;
          return (window.location.href = relativeUrl);
        },
        /**
         * Only allows documents to be created to the `Blog Posts` Collection
         */
        filterCollections: (options) => {
          return options.filter((option) => option.label === 'Blog Posts');
        },
      }}
      formifyCallback={({ formConfig, createForm, createGlobalForm }) => {
        if (formConfig.id === 'getGlobalDocument') {
          //@ts-ignore
          return createGlobalForm(formConfig, { layout: 'fullscreen' });
        }

        return createForm(formConfig);
      }}
      {...pageProps}
    >
      {(livePageProps) => <Component {...livePageProps} />}
    </TinaCMS>
  );

  return (
    <>
      <Head>
        <title>{`Valentin "zeropaper" Vago`}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ThemeProvider withGlobalStyles withNormalizeCSS>
        <Layout>
          <TinaEditProvider
            // showEditButton
            editMode={editMode}
          >
            <Component {...pageProps} />
          </TinaEditProvider>
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default App;
