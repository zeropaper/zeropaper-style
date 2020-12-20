import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { createUseStyles } from 'react-jss';

import Layout from './Layout/Layout';
import Link from './Link/Link';
import TagsList from './TagsList/TagsList';

const useStyles = createUseStyles(({
  spacing,
}) => ({
  root: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  topLevelList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    marginBottom: spacing(4),
  },
  subList: {
    paddingLeft: spacing(2),
  },
  itemRoot: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    marginBottom: spacing(3),
  },
}), {
  name: 'LinksListTemplate',
});

export const ListItem = (props) => {
  const {
    to,
    title,
    date,
    tags,
    titleComponent: TitleComponent = 'h2',
  } = props;
  const classes = useStyles(props);
  return (
    <li key={to} className={classes.itemRoot}>
      {date && (<div>{moment(date).format('MMMM Do, YYYY')}</div>)}

      <TitleComponent>
        <Link to={to}>
          {title}
        </Link>
      </TitleComponent>

      <TagsList tags={tags} />
    </li>
  );
};

ListItem.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  titleComponent: PropTypes.elementType,
};

ListItem.defaultProps = {
  date: null,
  tags: [],
  titleComponent: 'h2',
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
            {Object.keys(list).sort((a, b) => {
              const lcA = a.toLowerCase();
              const lcB = b.toLowerCase();
              if (lcA > lcB) return 1;
              if (lcA < lcB) return -1;
              return 0;
            }).map((key) => (
              <li key={key}>
                <h2>{key}</h2>

                <ul className={classes.subList}>
                  {list[key].map(({
                    to,
                    title,
                  }) => (
                    <ListItem
                      to={to}
                      title={title}
                      titleComponent="h3"
                      key={to}
                    />
                  ))}
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
