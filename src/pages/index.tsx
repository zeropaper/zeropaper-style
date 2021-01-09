/* eslint-disable react/prop-types */
import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { createUseStyles } from 'react-jss';

import Layout from '../components/Layout/Layout';
import SEO from '../components/Layout/SEO';

import Logo from '../components/Logo/Logo';
import Link from '../components/Link/Link';

const useStyles = createUseStyles({
  '@keyframes drawStroke': {
    '0%': {
      strokeDasharray: '200%',
      strokeDashoffset: '-200%',
    },
    '25%': {
      strokeDasharray: '200%',
      strokeDashoffset: '0%',
    },
    '75%': {
      strokeDasharray: '200%',
      strokeDashoffset: '0%',
    },
    '100%': {
      strokeDasharray: '200%',
      strokeDashoffset: '200%',
    },
  },
  '@keyframes collapseLogo': {
    from: {
      // maxWidth: '50vh',
      maxHeight: '50vh',
    },
    to: {
      // maxWidth: 0,
      maxHeight: 0,
    },
  },
  root: {},
  layoutMain: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  contentWrapper: {
    textAlign: 'center',
    overflow: 'hidden',
    flexGrow: 1,
  },
  logo: {
    margin: 'auto',
    maxWidth: '50vh',
    maxHeight: '50vh',
    '& path': {
      strokeWidth: 10,
      stroke: 'currentColor',
      fill: 'none',
      animationDuration: '2s',
      animationDelay: '1s',
      // animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      animationFillMode: 'both',
      // },
      // '&:hover path': {
      animationName: '$drawStroke',
    },
    animationName: '$collapseLogo',
    animationDelay: '3s',
    animationDuration: '1s',
    animationTimingFunction: 'linear',
    animationFillMode: 'both',
  },
  helloLink: {
    fontSize: 'max(2rem, 5vw)',
  },
},
{ name: 'IndexPage' });

const IndexPage: React.FC<PageProps> = () => {
  const classes = useStyles();
  return (
    <Layout
      classes={{
        main: classes.layoutMain,
      }}
    >
      <SEO title='Personal web page of Valentin "zeropaper" Vago' />

      <div className={classes.contentWrapper}>
        <Logo slim className={classes.logo} />
      </div>

      <div className={classes.contentWrapper}>
        <h1>
          <Link
            title="Let me intoduce myself"
            to="/hello"
            className={classes.helloLink}
          >
            Hello
          </Link>
        </h1>
      </div>

      <div className={classes.contentWrapper}>
        {'This page is '}
        <a
          title="90's were so cool. Project on GitHub"
          href="https://github.com/zeropaper/zeropaper-style/projects/1"
        >
          under construction
        </a>
        {' (and will always be).'}
        <br />
        {'Have a look at '}
        <a
          title="Code on GitHub"
          href="https://github.com/zeropaper/zeropaper-style"
        >
          its source
        </a>
        .
      </div>

      <div className={classes.contentWrapper}>
        <h1>
          <Link
            title="The thing which was cool before Twitter and Facebook"
            to="/blog"
            className={classes.helloLink}
          >
            Blog
          </Link>
          {', '}
          <Link
            title="Not the vandal thing"
            to="/tags"
            className={classes.helloLink}
          >
            tags
          </Link>
          {' & '}
          <Link title="Ya know" to="/stuff" className={classes.helloLink}>
            S… tuff
          </Link>
        </h1>
      </div>
    </Layout>
  );
};

export const query = graphql`
  {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;

export default IndexPage;
