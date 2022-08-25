import React from 'react';
import { Box, Button, createStyles, Group, Title } from '@mantine/core';

import { ExperimentalGetTinaClient } from '../.tina/__generated__/types';
import { useStyles as useLayoutStyles } from '../components/Layout/Layout';
import { getPageContext } from '../lib/getPageContext';
import { AsyncReturnType } from '../typings';
import Timeline from '../components/Timeline/Timeline';
import Link from '../components/Link/Link';

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
  printHide: {
    [`@media print`]: {
      display: 'none',
    },
  }
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
      <Box component='section' sx={({ spacing, fn, breakpoints }) => ({
        margin: '0 auto',
        width: '100%',
        maxWidth: breakpoints.md - (spacing.md * 2),
        overflow: 'hidden',
        [fn.smallerThan('md')]: {
          paddingLeft: spacing.md,
          paddingRight: spacing.md,
        }
      })}>
        <Box component='header'>
          <Title>Hello</Title>
        </Box>
        <Box component='main'>
          <p>
            My name&apos;s Valentin.
            <br />
            I was born in the French speaking part of Switzerland in the early 80&apos;s but I lived in Berlin nearly half my life.
            <br />
            I speak fluently French, English and German.
            <br />
            Professionally, I consider myself a digital craftsman and personnally, a creative coder.
          </p>

          <p className={classes.printHide}>
            I am currently exploring the potential paths my career could take and updating my skills.
            <br />
            If you believe I can add value to your product and your company,&nbsp;<Link href="https://www.linkedin.com/in/vvago">please get in touch on LinkedIn</Link>.
          </p>
        </Box>
      </Box>

      <Group className={classes.printHide} position="center" my="md">
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
