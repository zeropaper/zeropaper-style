import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { createStyles as createUseStyles } from '@mantine/core';

import Layout from '../Layout/Layout';
import Link from '../Link/Link';
import TagsList from '../TagsList/TagsList';

const useStyles = createUseStyles(() => ({
  root: {},
  topLevelList: {},
  subList: {},
  itemRoot: {},
}));

export const ListItem = (props: any) => {
  const {
    to,
    title,
    date,
    tags,
    titleComponent: TitleComponent = 'h2',
  } = props;
  const {classes} = useStyles(props);
  return (
    <li key={to} className={classes.itemRoot}>
      {date && (<div>{moment(date).format('MMMM Do, YYYY')}</div>)}

      <TitleComponent>
        <Link href={to}>
          {title}
        </Link>
      </TitleComponent>

      <TagsList tags={tags} />
    </li>
  );
};

export const lowerCaseSort = (a: string, b: string) => {
  const lcA = a.toLowerCase();
  const lcB = b.toLowerCase();
  if (lcA > lcB) return 1;
  if (lcA < lcB) return -1;
  return 0;
}

const LinksListTemplate = (props: any) => {
  const {
    pageContext,
  } = props;

  const { [pageContext.list]: list } = pageContext;

  const {classes} = useStyles(props);

  return (
    <Layout contentType="text" className={classes.root}>
      <header>
        <h1>{pageContext.pageTitle}</h1>
      </header>

      {Array.isArray(list)
        ? list.map(ListItem)
        : (
          <ul className={classes.topLevelList}>
            {Object.keys(list).sort(lowerCaseSort).map((key) => (
              <li key={key}>
                <h2>{key}</h2>

                <ul className={classes.subList}>
                  {list[key].map(({
                    to,
                    title,
                  }: any) => (
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
