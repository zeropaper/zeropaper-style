import { createStyles } from "@mantine/core";

export default createStyles(
  ({
    spacing,
    breakpoints,
    fn,
    colorScheme,
    white,
    colors,
    other: {
      colorSchemeSwitch: { transitionDuration, transitionTimingFunction },
    },
  }) => {
    const root = {
      margin: 0,
      padding: 0,
      overflow: "hidden",
    };
    const inner = {
      margin: "0 auto",
      maxWidth: breakpoints.md - spacing.md * 2,
      overflow: "hidden",
      [fn.smallerThan("md")]: {
        paddingLeft: spacing.md,
        paddingRight: spacing.md,
      },
    };
    const backgroundColor = colorScheme === "light" ? white : colors.dark[7];
    const transition = `background-color ${transitionDuration} ${transitionTimingFunction}`;
    return {
      root,
      inner,
      pageContentLink: {
        display: "none",
        height: 0,
        margin: 0,
      },
      header: {
        backgroundColor,
        transition,
        position: "sticky",
        top: 0,
        zIndex: 900,
        "& + *": {
          flexGrow: 1,
          zIndex: 500,
        },
      },
      main: {
        backgroundColor,
        transition,
      },
      content: {},
      footer: {
        backgroundColor,
        transition,
        position: "sticky",
        bottom: 0,
        zIndex: 100,
      },
    };
  }
);
