import * as React from "react";
import { createStyles as createUseStyles } from "@mantine/core";
import type { TinaField } from "tinacms";

import Link from "../Link/Link";
import SocialNetworks from "./SocialNetworks";
import { ClassNames } from "../../typings";

const useStyles = createUseStyles(
  ({ fn, spacing, colorScheme, white, colors }) => ({
    root: {
      position: "sticky",
      bottom: 0,
      backgroundColor: colorScheme === "light" ? white : colors.dark[7],
      [fn.smallerThan("xs")]: {
        fontSize: "1rem",
        flexDirection: "column",
        alignItems: "center",
      },
    },
    inner: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: spacing.xs,
      paddingBottom: spacing.xs,
    },
    column: {},
    snList: {
      marginLeft: "auto",
    },
  })
);

export type PropTypes = React.Attributes &
  React.HTMLAttributes<HTMLDivElement> & {
    classes?: ClassNames<typeof useStyles>;
    hideSocialNetworks?: boolean;
  };

const Footer = ({
  classes: passedClasses,
  className,
  hideSocialNetworks,
}: PropTypes) => {
  const { classes, cx } = useStyles();
  return (
    <footer className={cx(className, classes.root, passedClasses?.root)}>
      <div className={cx(classes.inner, passedClasses?.inner)}>
        <Link
          className={cx(classes.column, passedClasses?.column)}
          href="/no-cookies"
        >
          No Cookies
        </Link>

        {hideSocialNetworks ? null : <SocialNetworks
          className={cx(classes.column, passedClasses?.column)}
          classes={{
            list: classes.snList,
          }}
        />}
      </div>
    </footer>
  );
};

export const footerSchema: TinaField = {
  type: "object",
  label: "Footer",
  name: "footer",
  fields: [
    {
      name: 'hideSocialNetworks',
      label: 'Hide Social Networks',
      type: 'boolean',
      ui: {
        defaultValue: true,
      }
    }
  ],
};

export default Footer;
