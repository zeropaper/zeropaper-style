import * as React from "react";
import PropTypes from "prop-types";
import { createStyles as createUseStyles } from "@mantine/core";

import Mastodon from "./assets/mastodon.svg";
import Twitter from "./assets/twitter.svg";
import LinkedIn from "./assets/linkedin.svg";
import GitHub from "./assets/github.svg";
import ExternalLink from "../Link/Link";

type SocialNetworksProps = {
  className?: string;
  classes?: { [k: string]: string };
};

const useStyles = createUseStyles({
  root: {
    overflow: "hidden",
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: "none",
    display: "flex",
  },
  item: {
    padding: 0,
    margin: "0 0.5em",
    "&:first-of-type": {
      marginLeft: 0,
    },
    "&:last-child": {
      marginRight: 0,
    },
  },
  link: {
    display: "flex",
  },
  icon: {
    width: "1.25em",
    height: "1.25em",
    "& path": {
      fill: "currentColor",
    },
  },
});

const SocialNetworks = ({
  className,
  classes: passedClasses,
  ...props
}: SocialNetworksProps) => {
  const { classes, cx } = useStyles();

  return (
    <nav className={cx(classes.root, passedClasses?.root, className)}>
      <ul className={cx(classes.list, passedClasses?.list)}>
        <li className={classes.item}>
          <ExternalLink
            className={classes.link}
            rel="me"
            href="https://mastodon.xyz/@zeropaper"
          >
            <Mastodon
              width="1.25rem"
              height="1.25rem"
              className={classes.icon}
            />
          </ExternalLink>
        </li>
        <li className={classes.item}>
          <ExternalLink
            className={classes.link}
            rel="me"
            href="https://twitter.com/zeropaper"
          >
            <Twitter
              width="1.25rem"
              height="1.25rem"
              className={classes.icon}
            />
          </ExternalLink>
        </li>
        <li className={classes.item}>
          <ExternalLink
            className={classes.link}
            rel="me"
            href="https://github.com/zeropaper"
          >
            <GitHub width="1.25rem" height="1.25rem" className={classes.icon} />
          </ExternalLink>
        </li>
        <li className={classes.item}>
          <ExternalLink
            className={classes.link}
            rel="me"
            href="https://www.linkedin.com/in/vvago"
          >
            <LinkedIn
              width="1.25rem"
              height="1.25rem"
              className={classes.icon}
            />
          </ExternalLink>
        </li>
      </ul>
    </nav>
  );
};

SocialNetworks.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string),
};

SocialNetworks.defaultProps = {
  className: null,
  classes: null,
};

export default SocialNetworks;
