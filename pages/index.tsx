import { ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import { IconX } from "@tabler/icons";
import { useTina } from "tinacms/dist/react";
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
import getLandingPageDocument from "../lib/getLandingPageDocument";
import getGlobal from "../lib/getGlobal";
import { MDXRenderer } from "components/MDXRenderer/MDXRenderer";
import { TinaMarkdownContent } from "tinacms/dist/rich-text";

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

function getFirstMarkdownBlock<A extends ({ __typename: string, content?: any } | null | undefined)[]>(blocks: A) {
  return blocks.find((block) => block
    && block.__typename === "LandingPageBlocksMarkdown"
    && block.content) as { content: TinaMarkdownContent | TinaMarkdownContent[] } | undefined;
}

function LandingPageModal({
  content,
  classes,
  onClose
}: {
  content: ReactNode;
  classes: {
    [k: string]: string;
  };
  onClose: () => void
}) {
  return (
    <Paper p="md" withBorder className={classes.paper}>
      <ActionIcon
        title="Hide that message and show the pretty thing"
        className={classes.close}
        name="close"
        onClick={onClose}
      >
        <IconX />
      </ActionIcon>
      <Title>Hello</Title>
      <Text sx={{ maxWidth: 350 }}>
        {content}
      </Text>
      <Box className={classes.readMoreWrapper}>
        <Link href="/hello">Read more</Link>
      </Box>
    </Paper>
  )
}

const Home = (props: AsyncReturnType<typeof getStaticProps>["props"]) => {
  const {
    classes: { main },
  } = useLayoutStyles();
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  let content: ReactNode = null;
  if (Array.isArray(data.landingPage.blocks)) {
    const markdownBlock = getFirstMarkdownBlock(data.landingPage.blocks);
    if (markdownBlock?.content) {
      content = (
        <MDXRenderer content={markdownBlock.content} />
      )
    }
  }
  const [overlayVisible, setOverlayVisible] = useState(true);
  const { classes, cx } = useStyles({ overlayVisible });

  return (
    <Box id="page-content" component="main" className={cx(main, classes.root)}>
      <LandingPageModal
        classes={classes}
        onClose={() => setOverlayVisible(false)}
        content={content}
      />

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
      ...(await getLandingPageDocument(vars)),
    },
  };
};
