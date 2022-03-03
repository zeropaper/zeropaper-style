import { createStyles as createUseStyles } from '@mantine/core';

import Header from './Header';
import Footer from './Footer';

const useStyles = createUseStyles(({ spacing }) => {
  const root = {
    paddingRight: spacing.sm,
    paddingLeft: spacing.sm,
    overflow: 'hidden',
  }
  const inner = {
    margin: '0 auto',
    maxWidth: 850,
    overflow: 'hidden',
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
    <main data-testid="content" id="page-content" className={mainClass}>
      <Comp className={contentClass}>
        {children}
      </Comp>
    </main>
  ) : children;

  return (
    <>
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
