import React from 'react';
import classNames from 'classnames';
import { createStyles as createUseStyles } from '@mantine/core';
import { useResizeObserver } from '@mantine/hooks';

import Link from '../Link/Link';
import TagsList from '../TagsList/TagsList';
import { MDXRenderer } from '../MDXRenderer/MDXRenderer';
import { TinaMarkdownContent } from 'tinacms/dist/rich-text';

export interface PropTypes {
  src: string;
  title: string;
  description?: string;
  source?: string;
  mdx?: TinaMarkdownContent | TinaMarkdownContent[];
  tags?: string[];
}

// https://mantine.dev/theming/mantine-provider/#normalizecss-and-global-styles
const useStyles = createUseStyles(({
  fn,
  white,
  colors,
  colorScheme,
  spacing,
  primaryColor,
}) => ({
  root: {
    margin: 0,
    padding: 0,
    width: '100%',
    flexGrow: 1,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  iframeWrapper: {
    overflow: 'hidden',
    border: 'none',
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    boxShadow: `0 0 30px 0 transparent inset`,
    transition: 'all 218ms ease-in',
    // transform: 'scale(1, 1)',
    // transformOrigin: 'center',
  },
  iframeWrapperShadow: {
    boxShadow: `0 0 30px 15px ${fn.rgba(colorScheme === 'dark' ? colors.gray[1] : colors.dark[7], 0.15)} inset`,
    // transform: 'scale(0.98, 0.98)',
  },
  iframe: {
    border: 'none',
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
    flexGrow: 1,
    position: 'relative',
    zIndex: -1,
  },
  main: {},
  scrollable: {
    overflow: 'auto',
    padding: spacing.md,
    background: colorScheme === 'light' ? white : colors.dark[7],
    maxHeight: '100%',
    minHeight: '100%',
  },
  aside: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 100,
    transition: 'right 218ms ease-in',
    borderLeft: '1px solid transparent',
    width: '35vw',
    right: '-35vw',
    [fn.smallerThan('xs')]: {
      // TODO: should be stacked below the iframe
      width: '250px',
      right: '-250px',
    },
    [fn.smallerThan('md')]: {
      width: '55vw',
      right: '-55vw',
    },
    '&.asideOpen': {
      right: 0,
    }
  },
  asideOpen: {
    // borderLeft: `1px solid ${colors?.[primaryColor]?.[5] || 'lime'}`,
    right: 0,
    // [fn.smallerThan('xs')]: {
    //   right: 0,
    // },
    // [fn.smallerThan('md')]: {
    //   right: 0,
    // },
  },
  toggleButtonHolder: {
    position: 'absolute',
    right: '100%',
    top: '50%',
    zIndex: 0,
  },
  toggleButton: {
    // position: 'relative',
    // zIndex: 1,
    // borderRadius: `${spacing.xs}px 0 0 ${spacing.xs}px`,
    borderRadius: 0,
    transformOrigin: 'bottom center',
    transform: `translate(calc(50% + 1px), calc(((${spacing.xs}px * 2) + 1rem) * -1)) rotate(-90deg)`,
    border: 'none',
    // borderColor: colors?.[primaryColor]?.[5] || 'lime',
    // borderWidth: '1px 0 1px 1px',
    cursor: 'pointer',
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
    paddingLeft: spacing.sm,
    paddingRight: spacing.sm,
    background: colorScheme === 'light' ? white : colors.dark[7],
    color: 'inherit',
    outline: 'none',
    boxShadow: `0 0 30px 0 transparent`,
    transition: 'all 218ms ease-in',
    '&:hover': {
      boxShadow: `0 0 30px 15px ${fn.rgba(colorScheme === 'dark' ? colors.gray[1] : colors.dark[7], 0.15)}`,
    }
  },
}));

const IFrame = (props: PropTypes) => {
  const {
    src,
    title,
    description,
    source,
    mdx,
    tags,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const {classes, cx} = useStyles();

  const handleToggle = () => setOpen((val) => !val);
  const [outerRef, outerRect] = useResizeObserver();
  const [innerRef, innerRect] = useResizeObserver();

  return (
    <div className={classes.root} ref={outerRef}>
      <aside
        ref={innerRef}
        className={classNames({
          [classes.aside]: true,
          [classes.asideOpen]: open,
          asideOpen: open,
        })}
        // style={open ? { right: 0 } : {}}
      >
        <div className={classes.toggleButtonHolder}>
          <button
            style={{ width: (innerRect?.height && innerRect?.height * 0.25) || 'auto' }}
            className={classes.toggleButton}
            type="button"
            onClick={handleToggle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
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
              <MDXRenderer content={mdx} />
            </main>
          )) || (description && (
            <main className={classes.main}>{description}</main>
          ))}
        </div>
      </aside>

      <div className={cx(classes.iframeWrapper, (hover || open) && classes.iframeWrapperShadow)} style={{
        width: (outerRect?.width - (open ? innerRect?.width : 0)) || '100%',
      }}>
        <iframe
          className={classes.iframe}
          style={{
            width: outerRect?.width || '100%',
            height: outerRect?.height || '100%',
          }}
          title={title}
          src={src}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default IFrame;
