import { useEffect, useState } from 'react';
// import Head from 'next/head'
import dynamic from 'next/dynamic';

import { ExperimentalGetTinaClient } from '../.tina/__generated__/types';
import { useStyles as useLayoutStyles } from '../components/Layout/Layout';
import { getPageContext } from '../lib/getPageContext';
import { AsyncReturnType } from '../typings';
import { createStyles } from '@mantine/core';

const useStyles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  loader: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Loader = () => {
  const { classes } = useStyles();
  return <div className={classes.loader}>Loading</div>;
};

const Three = dynamic(() => import('../components/Three/Three'), {
  ssr: false,
  loading: Loader,
});

const Home = ({
  pageContext,
  ...props
}: AsyncReturnType<typeof getStaticProps>['props']) => {
  const {
    classes: { main },
  } = useLayoutStyles();
  const { classes, cx } = useStyles();
  const data = props.data?.getLandingPageDocument?.data || {};

  // const [{
  //   onMount,
  //   onRender,
  // }, setScripts] = useState<{
  //   onMount?: (scene: any) => void
  //   onRender?: (scene: any) => void
  // }>({})

  // useEffect(() => {
  //   import('../components/Three/Three.scripts').then(({ onMount, onRender }) => {
  //     console.info('Three scripts sets')
  //     setScripts({ onMount, onRender })
  //   })
  // }, [])

  return (
    <main className={cx(main, classes.root)}>
      {/* 
      {onMount && onRender ? (<Three
        onMount={onMount}
        onRender={onRender}
      />) : <></>}
      */}

      <Three />
    </main>
  );
};

export default Home;

// Data Fetching
export const getStaticProps = async function () {
  const client = ExperimentalGetTinaClient();
  const vars = { relativePath: 'home.json' };
  return {
    props: {
      pageContext: await getPageContext(),
      ...(await client.getLandingPageDocument(vars)),
    },
  };
};
