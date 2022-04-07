import { Global, MantineTheme, CSSObject } from '@mantine/core';

import Header from './Header';
import Footer from './Footer';
import { PropsWithChildren } from 'react';
import useStyles from './Layout.styles';
import { TypographyStylesProvider } from '@mantine/core';
import { ClassNames } from '../../typings';

export { useStyles };

export interface PropTypes {
  children: React.ReactNode;
  classes?: ClassNames<typeof useStyles>;
  className?: string;
}

export const getGlobalStyles: (theme: MantineTheme) => CSSObject = ({
  other: {
    colorSchemeSwitch: { transitionDuration, transitionTimingFunction },
  },
}) => ({
  'html,body,#__next,#root': {
    padding: 0,
    margin: 0,
    minHeight: '100vh',
    transition: `background-color, color ${transitionDuration} ${transitionTimingFunction}`,
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
  },

  '.skip-to-content-link': {
    display: 'none',
    height: 0,
    margin: 0,
  },

  '.site-logo': {
    maxHeight: '1em',
    maxWidth: '1em',
  },
});

export const LayoutContentWrapper = ({
  children,
  className,
  classes: passedClasses = {},
  ...props
}: PropsWithChildren<{
  className?: string;
  classes?: Partial<ReturnType<typeof useStyles>['classes']>;
}>) => {
  const { classes, cx } = useStyles();
  const mainClass = cx(
    classes.root,
    classes.main,
    passedClasses?.main,
    className
  );
  const contentClass = cx(
    classes.inner,
    classes.content,
    passedClasses?.content
  );
  return (
    <main {...props} id="page-content" className={mainClass}>
      <TypographyStylesProvider className={contentClass}>
        {children}
      </TypographyStylesProvider>
    </main>
  );
};

const Layout = ({
  children,
  classes: passedClasses,
}: // component: Comp,
PropTypes) => {
  const { classes, cx } = useStyles();
  const mainClass = cx(classes.root, classes.main, passedClasses?.main);
  const contentClass = cx(
    classes.inner,
    classes.content,
    passedClasses?.content
  );
  const commonClasses = {
    root: classes.root,
    inner: classes.inner,
  };

  // const content = Comp ? (
  //   <main id="page-content" data-wrapped className={mainClass}>
  //     <Comp className={contentClass}>{children}</Comp>
  //   </main>
  // ) : (
  //   children
  // );

  return (
    <>
      <Global styles={getGlobalStyles} />

      <a
        className={`${classes.pageContentLink} skip-to-content-link`}
        href="#page-content"
      >
        Skip to content
      </a>

      <Header
        classes={commonClasses}
        className={cx(classes.header, passedClasses?.header)}
      />

      {/* {content} */}
      {children}

      <Footer
        classes={commonClasses}
        className={cx(classes.footer, passedClasses?.footer)}
      />
    </>
  );
};

export default Layout;
