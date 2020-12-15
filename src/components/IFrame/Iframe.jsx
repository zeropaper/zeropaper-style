import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Link from '../Link/Link';
import TagsList from '../TagsList/TagsList';

const useStyles = createUseStyles(({
  spacing,
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
  aside: ({ open }) => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '35vw',
    zIndex: 100,
    background: backgroundShades[0],
    transition: 'right 218ms ease-in',
    right: open ? 0 : '-35vw',
    borderLeft: open ? `1px solid ${shades[5]}` : '1px solid transparent',
    padding: spacing(1),
  }),
  toggleButtonHolder: {
    position: 'absolute',
    right: '100%',
    top: '50%',
    // padding: {
    //   top: 10,
    //   left: 10,
    //   bottom: 10,
    // },
  },
  svg: ({ holderRef: { current } }) => {
    if (!current) {
      return {
        display: 'none',
      };
    }
    console.info(current.clientHeight);
    return {
      position: 'absolute',
      zIndex: 1,
      left: 0,
      top: 0,
    };
  },
  svgPath: {
    fill: backgroundShades[0],
  },
  toggleButton: {
    position: 'relative',
    zIndex: 1,
    borderRadius: 0,
    cursor: 'pointer',
    padding: spacing(1),
    background: 'none',
    border: 'none',
    color: 'inherit',
    // background: 'lime',
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
  const holderRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles({ ...props, open, holderRef });

  const handleToggle = () => setOpen((val) => !val);

  return (
    <div className={classes.root}>
      <aside className={classes.aside}>
        <div
          ref={holderRef}
          className={classes.toggleButtonHolder}
        >
          <svg
            className={classes.svg}
            viewBox="0 0 120 40"
            width="120"
            height="40"
          >
            <path className={classes.svgPath} d="M 120,0 V 40 H 10 L 0,30 V 10 L 10,0 Z" />
          </svg>

          <button
            className={classes.toggleButton}
            type="button"
            onClick={handleToggle}
          >
            Info
          </button>
        </div>

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
