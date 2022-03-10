import React, { PropsWithChildren } from 'react';
import { createStyles as createUseStyles, CSSObject } from '@mantine/core';
import { useResizeObserver } from '@mantine/hooks';

import Link from '../Link/Link';
import TagsList from '../TagsList/TagsList';
import { MDXRenderer } from '../MDXRenderer/MDXRenderer';
import { TinaMarkdownContent } from 'tinacms/dist/rich-text';

export interface PropTypes {
  iframe: string;
  title: string;
  description?: string;
  source?: string;
  mdx?: TinaMarkdownContent | TinaMarkdownContent[];
  tags?: string[];
  open?: boolean;
}

// https://mantine.dev/theming/mantine-provider/#normalizecss-and-global-styles
const useStyles = createUseStyles(({
  fn,
  white,
  colors,
  colorScheme,
  spacing,
  primaryColor,
}) => {
  const transitionBase: CSSObject = {
    transition: 'all',
    transitionDuration: '324ms',
    transitionTimingFunction: 'ease-in-out',
  };
  const clearSpace: CSSObject = {
    margin: 0,
    padding: 0,
  };
  const effectColor = colors[primaryColor][4]
  return {
    root: {
      ...clearSpace,
      width: '100%',
      flexGrow: 1,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    iframeWrapper: {
      '&:before': {
        ...transitionBase,
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        content: '""',
        display: 'block',
        zIndex: 2,
        boxShadow: `0 0 0 0 transparent inset`,
        background: 'transparent',
      },
      ...clearSpace,
      ...transitionBase,
      overflow: 'hidden',
      border: 'none',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      position: 'relative',
      zIndex: 1,
    },
    iframeWrapperShadow: {
      '&:before': {
        boxShadow: `0 0 7px 3px ${fn.rgba(effectColor, 0.15)} inset`,
        background: fn.rgba(effectColor, 0.05)
      }
    },
    iframe: {
      ...clearSpace,
      border: 'none',
      width: '100%',
      height: '100%',
      flexGrow: 1,
      position: 'relative',
      zIndex: 0,
    },
    main: {},
    scrollable: {
      overflow: 'auto',
      padding: spacing.md,
      background: colorScheme === 'light' ? white : colors.dark[7],
      maxHeight: '100%',
      minHeight: '100%',
      position: 'relative',
      zIndex: 1,
    },
    aside: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      zIndex: 100,
      ...transitionBase,
      transition: 'right',
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
      right: 0,
    },
    toggleButtonHolder: {
      position: 'absolute',
      right: '100%',
      top: '50%',
      zIndex: 0,
    },
    toggleButton: {
      borderRadius: 0,
      transformOrigin: 'bottom center',
      transform: `translate(calc(50% + 1px), calc(((${spacing.xs}px * 2) + 1rem) * -1)) rotate(-90deg)`,
      border: 'none',
      cursor: 'pointer',
      paddingTop: spacing.xs,
      paddingBottom: spacing.xs,
      paddingLeft: spacing.sm,
      paddingRight: spacing.sm,
      background: colorScheme === 'light' ? white : colors.dark[7],
      color: 'inherit',
      outline: 'none',
      boxShadow: `0 0 7px 0 transparent`,
      ...transitionBase,
      '&:hover': {
        boxShadow: `0 0 7px 3px ${fn.rgba(colorScheme === 'dark' ? colors.gray[1] : colors.dark[7], 0.15)}`,
      }
    },
  }
});

const IFrameWrapper = (props: PropsWithChildren<{ src: string; title: string; open?: boolean }>) => {
  const {
    children,
    title,
    src
  } = props
  const [open, setOpen] = React.useState(props.open || false);
  const [hover, setHover] = React.useState(false);
  const {classes, cx} = useStyles();

  const handleToggle = () => setOpen((val) => !val);
  const [outerRef, outerRect] = useResizeObserver();
  const [innerRef, innerRect] = useResizeObserver();
  
  return (
    <div className={classes.root} ref={outerRef}>
      <aside
        ref={innerRef}
        className={cx({
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
          {children}
        </div>
      </aside>

      <div className={cx(classes.iframeWrapper, (hover || open) && classes.iframeWrapperShadow)} style={{
        width: (outerRect?.width - (open ? innerRect?.width : 0)) || '100%',
      }}>
        <iframe
          className={classes.iframe}
          style={{
            width: outerRect?.width || '100%',
            // height: outerRect?.height || '100%',
          }}
          title={title}
          src={src}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}

const IFrame = (props: PropTypes) => {
  const {
    iframe: src,
    title,
    description,
    source,
    mdx,
    tags,
    open,
  } = props;
  const { classes } = useStyles();
  
  const content = (
    <>
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
    </>
  )

  if (!src) return content

  return <IFrameWrapper
    src={src}
    title={title}
    open={open}
  >
    {content}
  </IFrameWrapper>
};

export default IFrame;
