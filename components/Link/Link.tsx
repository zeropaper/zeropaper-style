import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { Button, createStyles } from '@mantine/core';
import { ComponentType, PropsWithChildren } from 'react';

export * from 'next/link';

type LinkProps = NextLinkProps & {
  className?: string;
  component?: ComponentType<{ className?: string }> | string;
  [k: string]: any;
}

export const useStyles = createStyles(({ fn, colors, colorScheme, primaryColor }) => ({
  root: {
    ...fn.focusStyles(),
    color: colors?.[primaryColor][7],
    transition: 'color 162ms ease-in-out',
    '&:hover,&:focus': {
      color: colors[primaryColor][colorScheme === 'dark' ? 5 : 9],
    },
  }
}))

export const Link = ({
  // children,
  className,
  component: Component = 'a',

  // Next Link Props
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
  locale,

  // 
  ...rest
}: PropsWithChildren<LinkProps>) => {
  const {classes, cx} = useStyles();

  const linkProps: NextLinkProps = {
    href,
    as,
    replace,
    scroll,
    shallow,
    passHref,
    prefetch,
    locale,
  }

  return (
    <NextLink {...linkProps}>
      <Component {...rest} className={cx(className, classes.root)} />
    </NextLink>
  );
}

export const ButtonLink = (props: LinkProps) => <Link {...props} component={Button} />;

export default Link;
