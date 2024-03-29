import { Box, Global } from "@mantine/core";

import Header, { HeaderProps } from "./Header";
import Footer, { FooterProps } from "./Footer";
import { PropsWithChildren } from "react";
import useStyles from "./Layout.styles";
import { ClassNames } from "../../typings";

export { useStyles };

export interface LayoutProps {
  children: React.ReactNode;
  classes?: ClassNames<typeof useStyles>;
  className?: string;
  header?: HeaderProps;
  footer?: FooterProps;
}

export const LayoutContentWrapper = ({
  children,
  className,
  classes: passedClasses = {},
  ...props
}: PropsWithChildren<{
  className?: string;
  classes?: Partial<ReturnType<typeof useStyles>["classes"]>;
}>) => {
  const { classes, cx } = useStyles();
  const mainClass = cx(
    classes.root,
    classes.main,
    passedClasses?.main,
    className
  );
  const contentClass = cx(
    "inner-layout",
    classes.inner,
    classes.content,
    passedClasses?.content
  );
  return (
    <main {...props} id="page-content" className={mainClass}>
      <Box className={contentClass}>{children}</Box>
    </main>
  );
};

const Layout = ({
  children,
  classes: passedClasses,
  header,
  footer,
}: LayoutProps) => {
  const { classes, cx } = useStyles();
  const commonClasses = {
    root: classes.root,
    inner: classes.inner,
  };
  return (
    <>
      <Global
        styles={({
          fn,
          other: {
            colorSchemeSwitch: { transitionDuration, transitionTimingFunction },
          },
        }) => ({
          "html,body,#__next,#root": {
            transition: `background-color, color ${transitionDuration} ${transitionTimingFunction}`,
          },
        })}
      />

      <a
        className={`${classes.pageContentLink} skip-to-content-link`}
        href="#page-content"
      >
        Skip to content
      </a>

      <Header
        classes={commonClasses}
        {...header}
        className={cx(classes.header, passedClasses?.header)}
      />

      {children}

      <Footer
        classes={commonClasses}
        {...footer}
        className={cx(classes.footer, passedClasses?.footer)}
      />
    </>
  );
};

export default Layout;
