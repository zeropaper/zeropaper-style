import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import Link from '../Link/Link';

const useStyles = createUseStyles(({
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

const TagsList = (props) => {
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

TagsList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
};

TagsList.defaultProps = {
  tags: null,
};

export default TagsList;
