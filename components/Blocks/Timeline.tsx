import { Text, Box, createStyles, Title, Paper, Group, Button } from "@mantine/core";
import { MDXRenderer } from "components/MDXRenderer/MDXRenderer";
import { useState } from "react";

export interface TechCategory {
  name: string;
  description?: string;
  aliases?: string[];
}

export interface TechCategories {
  [key: string]: TechCategory;
}

export interface Tech {
  name: string;
  categories?: (keyof TechCategories)[];
}

export interface Stack {
  [key: string]: Tech[];
}

export interface Experience {
  title: string;
  text: any;
  employer?: string;
  from: string;
  to?: string;
  icon?: string;
  color?: string;
  stack?: (keyof Stack)[];
  links?: string[];
}

const useTimelineItemStyles = createStyles(
  ({ spacing, breakpoints, colors }, params, getRef) => {
    return {
      root: {
        display: "flex",
        flexDirection: "row",
      },
      gutter: {
        position: "relative",
        width: spacing.md * 2,
        display: "flex",

        [`@media print`]: {
          display: "none",
        },

        [`@media (min-width: ${breakpoints.xl}px)`]: {
          paddingLeft: spacing.md,
          paddingRight: spacing.md,
          width: spacing.md * 3,
        },
        "&::before,&::after": {
          position: "absolute",
          content: '""',
          top: 0,
          bottom: 0,
        },
        "&::before": {
          background: "currentColor",
          zIndex: 1,
          width: 4,
          left: `calc(((${spacing.md}px - ${4}px) * 0.5))`,
          [`@media (min-width: ${breakpoints.xl}px)`]: {
            left: `calc(${spacing.md}px + ((${spacing.md}px - ${4}px) * 0.5))`,
          },
        },
        "&::after": {
          position: "absolute",
          zIndex: 0,
          left: spacing.md,
          width: spacing.md,
        },
      },
      dot: {
        position: "relative",
        zIndex: 3,
        display: "block",
        width: spacing.md,
        height: spacing.md,
        borderRadius: spacing.md,
        backgroundColor: "currentColor",
      },
      paperWrapper: {
        marginBottom: spacing.lg,
        width: "100%",
        [`@media print`]: {
          breakInside: "avoid",
          pageBreakInside: "avoid",
          display: "table",
        },
      },
      paper: {},
      dates: {
        paddingTop: 2,
        lineHeight: 1,
      },
      employer: {},
      title: {},
      text: {
        fontSize: "1.2rem",
        marginBottom: spacing.md,
      },
      stack: {
        marginBottom: spacing.md,
        color: colors.gray[6],
      },
      stackItem: {},
    };
  }
);

export function TimelineItem({
  title,
  text,
  from,
  to,
  className,
  employer,
  stack,
}: Experience & { className?: string }) {
  const { classes, cx } = useTimelineItemStyles();
  return (
    <Box className={cx(className, classes.root)}>
      <Box className={classes.gutter}>
        <Box className={classes.dot} />
      </Box>

      <Box component="section" className={classes.paperWrapper}>
        <Box className={classes.dates}>
          {from}
          {/* {`${from}${to ? ` - ${to}` : ''}`} */}
        </Box>
        <Paper
          p="xs"
          my="xs"
          withBorder
          component="main"
          className={classes.paper}
        >
          <Title className={classes.title} order={2}>
            {title}
          </Title>
          {employer && <Title order={3}>@ {employer}</Title>}
          <Text className={classes.text}>
            <MDXRenderer content={text} />
          </Text>

          <Box className={classes.stack}>
            {/* {(stack || []).map((tech) => (
              <span className={classes.stackItem} key={tech}>{tech}</span>
            ))} */}
            {(stack || []).join(", ")}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

const useTimelineStyles = createStyles<
  "root" | "introduction" | "item" | "printHide",
  { reverse?: boolean }
>(({ spacing, breakpoints, fn }, { reverse }, getRef) => {
  return {
    root: {
      display: "flex",
      margin: "0 auto",
      overflow: "hidden",
      flexDirection: reverse ? "column-reverse" : "column",
      [`& > .${getRef("item")}:nth-of-type(odd)`]: {
        [`@media (min-width: ${breakpoints.xl}px)`]: {
          marginRight: "auto",
          marginLeft: `calc(50% - (${spacing.md}px * 1.5))`,
          textAlign: "left",
          flexDirection: "row",
        },
      },
      [`& > .${getRef("item")}:${reverse ? "first" : "last"
        }-of-type > div:nth-of-type(1)`]: {
        "&::before,&::after": {
          display: "none",
        },
      },
    },
    introduction: {
      fontSize: "1.2rem",
      overflow: "hidden",
      maxWidth: 600,
      margin: "0 auto",
    },
    item: {
      ref: getRef("item"),
      overflow: "hidden",
      [`@media (min-width: ${breakpoints.xl}px)`]: {
        flexDirection: "row-reverse",
        textAlign: "right",
        marginRight: `calc(50% - (${spacing.md}px * 1.5))`,
        marginLeft: "auto",
      },
    },
    printHide: {
      [`@media print`]: {
        display: "none",
      },
    },
  };
});

export function Timeline({ block: { introduction, items } }: {
  block: {
    introduction: any;
    items: any[]
  }
}) {
  const [reverse, setReverse] = useState(true);

  const { classes } = useTimelineStyles({ reverse });
  return (
    <>
      <Box
        component="section"
        className={classes.introduction}
      >
        {introduction ? <MDXRenderer content={introduction} /> : null}
      </Box>

      <Group className={classes.printHide} position="center" my="md">
        <Button
          title="Click to change the order"
          type="button"
          onClick={() => setReverse((r) => !r)}
        >
          {reverse ? "Most recent to oldest" : "Oldest to most recent"}
        </Button>
      </Group>

      <Box className={classes.root}>
        {items.map((item: any) => (
          <TimelineItem className={classes.item} key={JSON.stringify(item.text)} {...item} />
        ))}
      </Box>
    </>
  );
}

export default Timeline;
