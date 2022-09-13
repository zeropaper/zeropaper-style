import type { AppProps } from "next/app";
import Head from "next/head";
import TinaProvider from "../.tina/components/TinaDynamicProvider";

import Layout from "../components/Layout/Layout";
import ThemeProvider from "../themes/Theme";

import "../public/styles.css";


const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <TinaProvider>
      <ThemeProvider withGlobalStyles withNormalizeCSS>
        <>
          <Head>
            <title>{`Valentin "zeropaper" Vago`}</title>
            <link rel="icon" href="/favicon.ico" />
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </>
      </ThemeProvider>
    </TinaProvider>
  );
};

export default App;
