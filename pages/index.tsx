import { useState } from "react";
import dynamic from "next/dynamic";
import { IconX } from "@tabler/icons";
import {
  ActionIcon,
  Box,
  createStyles,
  Paper,
  Text,
  Title,
} from "@mantine/core";

import type { AsyncReturnType } from "../typings";
import { useStyles as useLayoutStyles } from "../components/Layout/Layout";
import Link from "../components/Link/Link";
import { getPageContext } from "../lib/getPageContext";
import getLandingPageDocument from "../lib/getLandingPageDocument";
import getGlobal from "../lib/getGlobal";

const useStyles = createStyles<
  string,
  {
    overlayVisible?: boolean;
  }
>((theme, { overlayVisible }) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    position: "relative",
  },
  three: {
    zIndex: 1,
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
  },
  paper: {
    display: overlayVisible ? "inline-block" : "none",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9,
    pointerEvents: "all",
  },
  readMoreWrapper: {
    textAlign: "right",
  },
}));

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Loading
    </Box>
  );
};

const Three = dynamic(() => import("../components/Three/Three"), {
  ssr: false,
  loading: Loader,
});

const Home = ({
  pageContext,
  ...props
}: AsyncReturnType<typeof getStaticProps>["props"]) => {
  const {
    classes: { main },
  } = useLayoutStyles();
  const data = props.data?.landingPage || {};
  const [overlayVisible, setOverlayVisible] = useState(true);
  const { classes, cx } = useStyles({ overlayVisible });

  return (
    <Box id="page-content" component="main" className={cx(main, classes.root)}>
      <Paper p="md" withBorder className={classes.paper}>
        <ActionIcon
          title="Hide that message and show the pretty thing"
          className={classes.close}
          name="close"
          onClick={() => setOverlayVisible(false)}
        >
          <IconX />
        </ActionIcon>
        <Title>Hello</Title>
        <Text sx={{ maxWidth: 350 }}>
          my name&apos;s Valentin and I craft code since the end of last
          century.
        </Text>
        <Box className={classes.readMoreWrapper}>
          <Link href="/hello">Read more</Link>
        </Box>
      </Paper>

      <Three />
    </Box>
  );
};

export default Home;

// Data Fetching
export const getStaticProps = async function () {
  const vars = { relativePath: "home.json" };
  return {
    props: {
      global: await getGlobal(),
      pageContext: await getPageContext(),
      ...(await getLandingPageDocument(vars)),
    },
  };
};
