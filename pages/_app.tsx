import type { AppProps } from 'next/app';
import Head from 'next/head';
import TinaProvider from "../.tina/components/TinaDynamicProvider";

import Layout from '../components/Layout/Layout';
import ThemeProvider from '../themes/Theme';

import '../public/styles.css';

const getPageData = (pageProps: any): any =>
  (
    pageProps?.data?.stuff ||
    pageProps?.data?.post ||
    pageProps?.data?.tag ||
    pageProps?.data?.page ||
    pageProps?.data?.landingPage
  ) || {};

const App = (props: AppProps) => {
  const { Component, pageProps } = props;
  const { relativePath } = pageProps?.variables || {};
  const pageData = getPageData(pageProps);


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

      <TinaProvider>
        <ThemeProvider withGlobalStyles withNormalizeCSS>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </TinaProvider>
    </>
  );
};

export default App;
