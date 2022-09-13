import * as React from "react";
import {
  createStyles as createUseStyles,
  useMantineColorScheme,
  keyframes,
} from "@mantine/core";
import type { TinaField } from "tinacms";

import Link, { useStyles as useLinkStyles } from "../Link/Link";
import Logo from "../Logo/Logo";
import Menu from "./Menu";
import LightMode from "./assets/light-mode.svg";
import DarkMode from "./assets/dark-mode.svg";
import { ClassNames } from "../../typings";

const drawStroke = keyframes({
  "0%": {
    strokeDasharray: "200%",
    strokeDashoffset: "0%",
  },
  "100%": {
    strokeDasharray: "200%",
    strokeDashoffset: "400%",
  },
});

const useStyles = createUseStyles(({ spacing, fn }, _params, getRef) => {
  const logo = getRef("logo");
  return {
    root: {},
    inner: {
      display: "flex",
      alignItems: "center",
      paddingTop: spacing.sm,
      paddingBottom: spacing.sm,
    },
    title: {
      fontWeight: 300,
      fontSize: "min(32px, 7vw)",
      flexGrow: 1,
      margin: 0,
      [fn.smallerThan("md")]: {
        width: "25%",
      },
    },
    titleLink: {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      borderBottom: "none",

      [`&:hover .${logo} path`]: {
        animationName: drawStroke,
      },
    },
    logo: {
      ref: logo,
      marginRight: spacing.sm,
      maxHeight: "1em",
      maxWidth: "1em",
      [fn.smallerThan("md")]: {
        transform: "translateX(-6px)",
      },
      "& path": {
        stroke: "currentColor",
        strokeWidth: 40,
        fill: "none",
        animationDuration: "2s",
        // animationIterationCount: 'infinite',
        animationFillMode: "forwards",
        animationTimingFunction: "linear",
      },
    },
    linkText: {
      [fn.smallerThan("sm")]: {
        display: "none",
      },
    },
    menu: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [fn.smallerThan("md")]: {
        width: "50%",
        // flexGrow: 2,
      },
    },
    themeToggleWrapper: {
      width: "33%",
      textAlign: "right",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      [fn.smallerThan("md")]: {
        // width: '25%',
        // flexGrow: 1,
      },
    },
    themeToggle: {
      background: "none",
      border: "none",
      textDecoration: "underline",
      font: "inherit",
      cursor: "pointer",
      color: "inherit",
      display: "inline-flex",
      alignItems: "baseline",
      margin: 0,
      padding: 0,
    },
    themeModeIcon: {
      "& path": {
        fill: "currentColor",
      },
    },
  };
});

const ThemeModeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const toggleMode = React.useCallback(
    () => toggleColorScheme(),
    [toggleColorScheme]
  );
  const { classes: linkClasses } = useLinkStyles();
  const { classes, cx } = useStyles();
  return (
    <button
      type="button"
      title="Toggle the page styling theme"
      onClick={toggleMode}
      className={cx(classes.themeToggle, linkClasses.root)}
    >
      {colorScheme === "dark" ? (
        <LightMode className={classes.themeModeIcon} />
      ) : (
        <DarkMode className={classes.themeModeIcon} />
      )}
    </button>
  );
};

export type PropTypes = React.Attributes &
  React.HTMLAttributes<HTMLDivElement> & {
    classes?: ClassNames<typeof useStyles>;
    title?: string;
    linkTitle?: string;
  };

const Header = ({
  classes: passedClasses,
  className,
  title = 'zeropaper',
  linkTitle = 'Valentin “zeropaper” Vago'
}: PropTypes) => {
  const { classes, cx } = useStyles();
  return (
    <header className={cx(className, classes.root, passedClasses?.root)}>
      <div className={cx(classes.inner, passedClasses?.inner)}>
        <h1 className={cx(classes.title, passedClasses?.title)}>
          <Link
            className={cx(classes.titleLink, passedClasses?.titleLink)}
            title={linkTitle}
            component="a"
            href="/"
          >
            <Logo slim className={cx(classes.logo, passedClasses?.logo)} />

            <span className={classes.linkText}>{title}</span>
          </Link>
        </h1>

        <Menu classes={{ root: classes.menu }} />

        <div
          className={cx(
            classes.themeToggleWrapper,
            passedClasses?.themeToggleWrapper
          )}
        >
          <ThemeModeToggle />
        </div>
      </div>
    </header>
  );
};

export const headerSchema: TinaField = {
  type: "object",
  label: "Header",
  name: "header",
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Title',
    },
    {
      type: 'string',
      name: 'linkTitle',
      label: 'Link Title',
    }
  ],
};

export default Header;
