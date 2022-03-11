import React, { PropsWithChildren } from 'react';
import { useResizeObserver } from '@mantine/hooks';
import { Button } from '@mantine/core';

import Link from '../Link/Link';
import TagsList from '../TagsList/TagsList';
import { MDXRenderer } from '../MDXRenderer/MDXRenderer';
import { TinaMarkdownContent } from 'tinacms/dist/rich-text';
import useStyles from './IFrame.styles';

export interface PropTypes {
  iframe: string;
  title: string;
  description?: string;
  source?: string;
  mdx?: TinaMarkdownContent | TinaMarkdownContent[];
  tags?: string[];
  open?: boolean;
}

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
