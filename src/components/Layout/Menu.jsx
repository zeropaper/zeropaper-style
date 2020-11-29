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
  return (
    <nav className={classNames(classes.root, passedClasses?.root, className)}>
      <ul className={classNames(classes.list, passedClasses?.list)}>
        <li className={classes.item}>
          <Link
            to="/hello"
            className={classes.link}
            activeClassName={classes.linkActive}
          >
            Hello
          </Link>
        </li>

        <li className={classes.item}>
          <Link
            to="/contact"
            className={classes.link}
            activeClassName={classes.linkActive}
          >
            Contact
          </Link>
        </li>
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
