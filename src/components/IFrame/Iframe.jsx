import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Link from '../Link/Link';
import TagsList from '../TagsList/TagsList';

const useStyles = createUseStyles(({
  spacing,
  mediaQueries: {
    mobilePortrait,
    mobileLandscape,
  },
  background: {
    shades: backgroundShades,
  },
  typography: {
    shades,
  },
  mixins: {
    textContent,
  },
}) => ({
  root: {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  iframe: {
    border: 'none',
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
  },
  main: {
    ...textContent,
  },
  scrollable: {
    overflow: 'auto',
    padding: spacing(3),
    maxHeight: '100%',
  },
  aside: ({ open }) => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 100,
    background: backgroundShades[0],
    transition: 'right 218ms ease-in',
    borderLeft: open ? `1px solid ${shades[5]}` : '1px solid transparent',
    width: '35vw',
    right: open ? 0 : '-35vw',
    [mobileLandscape]: {
      width: '55vw',
      right: open ? 0 : '-55vw',
    },
    [mobilePortrait]: {
      width: '250px',
      right: open ? 0 : '-250px',
    },
  }),
  toggleButtonHolder: {
    position: 'absolute',
    right: '100%',
    top: '50%',
  },
  toggleButton: {
    position: 'relative',
    zIndex: 1,
    borderRadius: `${spacing(1)}px 0 0 ${spacing(1)}px`,
    borderColor: shades[5],
    borderWidth: '1px 0 1px 1px',
    cursor: 'pointer',
    padding: {
      top: spacing(1),
      bottom: spacing(1),
      left: spacing(2),
      right: spacing(2),
    },
    background: backgroundShades[0],
    color: 'inherit',
    outline: 'none',
  },
}), {
  name: 'IFrame',
});

const IFrame = (props) => {
  const {
    src,
    title,
    description,
    source,
    mdx,
    tags,
  } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles({ ...props, open });

  const handleToggle = () => setOpen((val) => !val);

  return (
    <div className={classes.root}>
      <aside className={classes.aside}>
        <div className={classes.toggleButtonHolder}>
          <button
            className={classes.toggleButton}
            type="button"
            onClick={handleToggle}
          >
            Info
          </button>
        </div>

        <div className={classes.scrollable}>
          <header>
            <h1>{title}</h1>
            {source && (
              <Link href={source}>Source</Link>
            )}
            <TagsList tags={tags} />
          </header>

          {(mdx && (
            <main className={classes.main}>
              <MDXRenderer>{mdx}</MDXRenderer>
            </main>
          )) || (description && (
            <main className={classes.main}>{description}</main>
          ))}
        </div>
      </aside>

      <iframe className={classes.iframe} title={title} src={src} />
    </div>
  );
};

IFrame.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  source: PropTypes.string,
  mdx: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

IFrame.defaultProps = {
  description: null,
  source: null,
  mdx: null,
  tags: null,
};

export default IFrame;
