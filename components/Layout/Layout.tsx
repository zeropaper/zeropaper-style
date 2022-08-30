import { Box, Global } from '@mantine/core';
import { useEditState } from 'tinacms/dist/edit-state';

import Header from './Header';
import Footer from './Footer';
import { PropsWithChildren } from 'react';
import useStyles from './Layout.styles';
import { ClassNames } from '../../typings';

export { useStyles };

export interface PropTypes {
  children: React.ReactNode;
  classes?: ClassNames<typeof useStyles>;
  className?: string;
}

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
      <Box className={contentClass}>
        {children}
      </Box>
    </main>
  );
};

const Layout = ({
  children,
  classes: passedClasses,
}: PropTypes) => {
  const { classes, cx } = useStyles();
  const commonClasses = {
    root: classes.root,
    inner: classes.inner,
  };

  const { edit } = useEditState();
  return (
    <>
      <Global styles={({
        fn,
        other: {
          colorSchemeSwitch: { transitionDuration, transitionTimingFunction },
        },
      }) => ({
        'html,body,#__next,#root': {
          transition: `background-color, color ${transitionDuration} ${transitionTimingFunction}`,
        },

        // for Tina edit mode
        '#__next>div:not([class])': {
          ...(edit ? {
            marginLeft: 10,
            [fn.largerThan('md')]: {
              paddingLeft: 10,
              paddingRight: 10,
            }
          } : {})
        },
      })} />

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
