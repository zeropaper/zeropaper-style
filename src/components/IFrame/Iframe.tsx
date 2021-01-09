import React from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Link from '../Link/Link';
import TagsList from '../TagsList/TagsList';
import { DefaultTheme } from '../../themes/Theme';

interface IFrameProps {
  src: string;
  title: string;
  description?: string;
  source?: string;
  mdx?: string;
  tags?: string[];
}

const useStyles = createUseStyles<DefaultTheme, string>(({
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
  aside: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 100,
    background: backgroundShades[0],
    transition: 'right 218ms ease-in',
    borderLeft: '1px solid transparent',
    width: '35vw',
    right: '-35vw',
    [mobilePortrait]: {
      width: '250px',
      right: '-250px',
    },
    [mobileLandscape]: {
      width: '55vw',
      right: '-55vw',
    },
  },
  asideOpen: {
    borderLeft: `1px solid ${shades[5]}`,
    right: 0,
  },
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

const IFrame = (props: IFrameProps) => {
  const {
    src,
    title,
    description,
    source,
    mdx,
    tags,
  } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles(props);

  const handleToggle = () => setOpen((val) => !val);

  return (
    <div className={classes.root}>
      <aside
        className={classNames({
          [classes.aside]: true,
          [classes.asideOpen]: open,
        })}
      >
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

      <iframe
        className={classes.iframe}
        title={title}
        src={src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

IFrame.defaultProps = {
  description: null,
  source: null,
  mdx: null,
  tags: null,
};

export default IFrame;
