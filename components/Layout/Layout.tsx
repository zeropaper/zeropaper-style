import { createStyles as createUseStyles, Global, MantineTheme, CSSObject } from '@mantine/core';

import Header from './Header';
import Footer from './Footer';
import { PropsWithChildren } from 'react';

const useStyles = createUseStyles(({ spacing, breakpoints, fn }) => {
  const root = {
    overflow: 'hidden',
  }
  const inner = {
    margin: '0 auto',
    maxWidth: breakpoints.md - (spacing.md * 2),
    overflow: 'hidden',
    [fn.smallerThan('md')]: {
      paddingLeft: spacing.md,
      paddingRight: spacing.md,
    }
  }

  return ({
    root,
    inner,
    pageContentLink: {
      display: 'none',
      height: 0,
      margin: 0,
    },
    header: {},
    main: {
      flexGrow: 1
    },
    content: {},
    footer: {},
  })
});

export interface PropTypes {
  children: React.ReactNode,
  component?: React.ComponentType<{ className?: string }> | string;
  classes?: ClassNames<typeof useStyles>;
  className?: string;
}

export const getGlobalStyles: (theme: MantineTheme) => CSSObject = (theme) => ({
  'html,body,#__next,#root': {
    padding: 0,
    margin: 0,
    minHeight: '100vh',
  },

  '#__next,#root': {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },

  // for Tina edit mode
  '#__next>div:not([class])': {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  }
})

export const LayoutContentWrapper = ({
  children,
  classes: passedClasses = {},
  ...props
}: PropsWithChildren<{ classes?: Partial<ReturnType<typeof useStyles>['classes']> }>) => {
  const {classes, cx} = useStyles();
  const mainClass = cx(classes.root, classes.main, passedClasses?.main);
  const contentClass = cx(classes.inner, classes.content, passedClasses?.content);
  return (
    <main {...props} id="page-content" className={mainClass}>
      <div className={contentClass}>
        {children}
      </div>
    </main>
  )
}

const Layout = ({
  children,
  classes: passedClasses,
  component: Comp
}: PropTypes) => {
  const {classes, cx} = useStyles();
  const mainClass = cx(classes.root, classes.main, passedClasses?.main);
  const contentClass = cx(classes.inner, classes.content, passedClasses?.content);
  const commonClasses = {
    root: classes.root,
    inner: classes.inner,
  }

  const content = Comp ? (
    <main id="page-content" className={mainClass}>
      <Comp className={contentClass}>
        {children}
      </Comp>
    </main>
  ) : children;

  return (
    <>
      <Global styles={getGlobalStyles} />

      <a className={classes.pageContentLink} href="#page-content">Skip to content</a>

      <Header
        classes={commonClasses}
        className={cx(classes.header, passedClasses?.header)}
      />

      {content}

      <Footer
        classes={commonClasses}
        className={cx(classes.footer, passedClasses?.footer)}
      />
    </>
  );
};

export default Layout;
