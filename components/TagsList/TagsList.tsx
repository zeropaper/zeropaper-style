import React from "react";
import { createStyles as createUseStyles } from "@mantine/core";

import Link from "../Link/Link";

interface TagsListProps {
  tags?: string[];
}

const useStyles = createUseStyles(() => ({
  root: {},
  list: {},
  item: {},
  link: {},
}));

const TagsList = (props: TagsListProps): React.ReactElement => {
  const { tags } = props;
  const { classes } = useStyles();
  return tags ? (
    <nav className={classes.root}>
      <ul className={classes.list}>
        {tags.map((tag) => (
          <li key={tag} className={classes.item}>
            <Link href={`/tags/${tag}`} className={classes.link}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  ) : (
    <></>
  );
};

TagsList.defaultProps = {
  tags: null,
};

export default TagsList;
