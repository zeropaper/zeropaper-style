import React from 'react';
import { Box, Button, createStyles, Group, Title } from '@mantine/core';

import { ExperimentalGetTinaClient } from '../.tina/__generated__/types';
import { useStyles as useLayoutStyles } from '../components/Layout/Layout';
import { getPageContext } from '../lib/getPageContext';
import { AsyncReturnType } from '../typings';
import Timeline from '../components/Timeline/Timeline';
import { MDXRenderer } from '../components/MDXRenderer/MDXRenderer';

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

const Hello = ({
  pageContext,
  ...props
}: AsyncReturnType<typeof getStaticProps>['props']) => {
  const {
    classes: { main },
  } = useLayoutStyles();
  const { classes, cx } = useStyles();
  const data = props.data?.getPageDocument?.data || {};

  const [reverse, setReverse] = React.useState(true);

  return (
    <main className={cx(main, classes.root)}>
      <Box component='section' sx={{ maxWidth: 450, margin: 'auto' }}>
        <Box component='header'>
          <Title>Hello</Title>
        </Box>
        <Box component='main'>
          My name&apos;s Valentin.I was born in the french speaking part of Switzerland in the early 80&apos;s.
          <br />
          Professionally, I consider myself a digital craftsman and personnally, a creative coder.
        </Box>
      </Box>

      <Group position="center" my="md">
        <Button title="click to change the order" type="button" onClick={() => setReverse((r) => !r)}>
          {reverse ? 'Most recent to oldest' : 'Oldest to most recent'}
        </Button>
      </Group>

      <Timeline reverseOrder={reverse} />
    </main>
  );
};

export default Hello;

export const getStaticProps = async function () {
  const client = ExperimentalGetTinaClient();
  const landingPage = await client.getPageDocument({
    relativePath: `hello.mdx`,
  });
  return {
    props: {
      pageContext: await getPageContext(),
      ...landingPage,
    },
  };
};
