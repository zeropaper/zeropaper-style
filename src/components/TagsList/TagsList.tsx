import React from 'react';
import { createUseStyles } from 'react-jss';

import Link from '../Link/Link';
import { DefaultTheme } from '../../themes/Theme';

interface TagsListProps {
  tags?: string[];
}

const useStyles = createUseStyles<DefaultTheme, string>(({
  spacing,
}) => ({
  root: {},
  list: {
    listStyle: 'none',
    margin: 0,
    padding: {
      top: spacing(0.5),
      bottom: spacing(0.5),
    },
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  item: {
    margin: 0,
    padding: {
      left: spacing(0.5),
      right: spacing(0.5),
    },
  },
  link: {},
}), {
  name: 'TagsList',
});

const TagsList = (props: TagsListProps): React.ReactElement => {
  const { tags } = props;
  const classes = useStyles(props);
  return (tags && (
    <nav className={classes.root}>
      <ul className={classes.list}>
        {tags.map((tag) => (
          <li key={tag} className={classes.item}>
            <Link
              to={`/tags/${tag}`}
              className={classes.link}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  ));
};

TagsList.defaultProps = {
  tags: null,
};

export default TagsList;
