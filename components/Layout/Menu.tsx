import * as React from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';

import Link from '../Link/Link';
import { DefaultTheme } from '../../themes/Theme';

type MenuClassNames = {
  root?: string;
  list?: string;
  item?: string;
  link?: string;
  linkActive?: string;
}

interface MenuProps {
  className?: string;
  classes?: MenuClassNames
}

const useStyles = createUseStyles<DefaultTheme, string>(
  ({ mixins: { inlineListClasses } }) => ({
    ...inlineListClasses,
  }),
  {
    name: 'LayoutMenu',
  },
);

const Menu = ({
  className,
  classes: passedClasses,
  ...props
}: MenuProps): React.ReactElement => {
  const classes = useStyles(props);

  const links = [
    ['/hello', 'Hello'],
    ['/blog', 'Blog'],
    ['/tags', 'Tags'],
    ['/stuff', 'Stuff'],
    // ['/contact', 'Contact'],
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

Menu.defaultProps = {
  className: null,
  classes: null,
};

export default Menu;
