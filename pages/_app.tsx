import type { AppProps } from "next/app";
import Head from "next/head";

import Layout from "../components/Layout/Layout";
import ThemeProvider from "../themes/Theme";

import "../public/styles.css";

import globals from "../content/global/index.json";

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
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
        <Layout header={globals.header} footer={globals.footer}>
          <Component {...pageProps} />
        </Layout>
      </>
    </ThemeProvider>
  );
};

export default App;
