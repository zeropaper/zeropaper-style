import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';

import Link from '../Link/Link';

const useStyles = createUseStyles(({ mixins: { inlineListClasses } }) => ({
  ...inlineListClasses,
}), {
  name: 'LayoutMenu',
});

const Header = ({ className, classes: passedClasses, ...props }) => {
  const classes = useStyles(props);

  const links = [
    ['/hello', 'Hello'],
    ['/blog', 'Blog'],
    ['/tags', 'Tags'],
    ['/stuff', 'Stuff'],
    ['/contact', 'Contact'],
  ];

  return (
    <nav className={classNames(classes.root, passedClasses?.root, className)}>
      <ul className={classNames(classes.list, passedClasses?.list)}>
        {links.map((item) => (
          <li key={item[0]} className={classes.item}>
            <Link
              to={item[0]}
              className={classes.link}
              activeClassName={classes.linkActive}
            >
              {item[1]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string),
};

Header.defaultProps = {
  className: null,
  classes: null,
};

export default Header;
