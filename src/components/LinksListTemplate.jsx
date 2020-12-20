import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import Layout from './Layout/Layout';
import Link from './Link/Link';

const useStyles = createUseStyles({
  root: {},
  topLevelList: {},
  itemRoot: {},
}, {
  name: 'LinksListTemplate',
});

export const ListItem = (props) => {
  const { to, title } = props;
  const classes = useStyles(props);

  return (
    <li key={to} className={classes.itemRoot}>
      <Link to={to}>
        {title}
      </Link>
    </li>
  );
};

ListItem.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const LinksListTemplate = (props) => {
  const {
    pageContext,
  } = props;

  const { [pageContext.list]: list } = pageContext;

  const classes = useStyles(props);

  return (
    <Layout contentType="text" className={classes.root}>
      <header>
        <h1>{pageContext.pageTitle}</h1>
      </header>

      {Array.isArray(list)
        ? list.map(ListItem)
        : (
          <ul className={classes.topLevelList}>
            {Object.keys(list).map((key) => (
              <li key={key}>
                <ul>
                  <h2>{key}</h2>

                  {list[key].map(ListItem)}
                </ul>
              </li>
            ))}
          </ul>
        )}
    </Layout>
  );
};

LinksListTemplate.propTypes = {
  pageContext: PropTypes.shape({
    list: PropTypes.string.isRequired,
    pageTitle: PropTypes.string.isRequired,
    pageType: PropTypes.string,
    // pages: PropTypes.arrayOf(PropTypes.shape({
    //   to: PropTypes.string.isRequired,
    //   title: PropTypes.string.isRequired,
    // })),
  }).isRequired,
};

export default LinksListTemplate;
