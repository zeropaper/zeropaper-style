import React from "react";
import { Box, Button, createStyles, Group, Title } from "@mantine/core";
import { useTina } from "tinacms/dist/edit-state";

import { useStyles as useLayoutStyles } from "../components/Layout/Layout";
import { AsyncReturnType } from "../typings";
import Timeline from "../components/Timeline/Timeline";
import { MDXRenderer } from "../components/MDXRenderer/MDXRenderer";
import getPageDocument from "../lib/getPageDocument";
import getGlobal from "../lib/getGlobal";

const useStyles = createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  loader: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  printHide: {
    [`@media print`]: {
      display: "none",
    },
  },
});

const Hello = ({
  pageContext,
  ...props
}: AsyncReturnType<typeof getStaticProps>["props"]) => {
  const { data } = useTina({
    query: pageContext.query,
    variables: pageContext.variables,
    data: pageContext.data,
  });
  const {
    classes: { main },
  } = useLayoutStyles();
  const { classes, cx } = useStyles();

  const [reverse, setReverse] = React.useState(true);

  return (
    <main className={cx(main, classes.root)}>
      <Box
        component="section"
        sx={({ spacing, fn, breakpoints }) => ({
          margin: "0 auto",
          width: "100%",
          maxWidth: breakpoints.md - spacing.md * 2,
          overflow: "hidden",
          [fn.smallerThan("md")]: {
            paddingLeft: spacing.md,
            paddingRight: spacing.md,
          },
        })}
      >
        <Box component="header">
          <Title>Hello</Title>
        </Box>
        <Box component="main">
          <MDXRenderer content={data.page.body} />
        </Box>
      </Box>

      <Group className={classes.printHide} position="center" my="md">
        <Button
          title="click to change the order"
          type="button"
          onClick={() => setReverse((r) => !r)}
        >
          {reverse ? "Most recent to oldest" : "Oldest to most recent"}
        </Button>
      </Group>

      <Timeline reverseOrder={reverse} />
    </main>
  );
};

export default Hello;

export const getStaticProps = async function () {
  return {
    props: {
      global: await getGlobal(),
      pageContext: await getPageDocument({
        relativePath: "hello.mdx",
      }),
    },
  };
};
