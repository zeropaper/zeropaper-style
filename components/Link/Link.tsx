import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { Button, ButtonProps } from '@mantine/core';
import { ComponentType, PropsWithChildren } from 'react';

export * from 'next/link';

type LinkProps = NextLinkProps & {
  className?: string;
  component?: ComponentType<{ className?: string }> | string;
  [k: string]: any;
}

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
      <Component {...rest} className={className} />
    </NextLink>
  );
}

export const ButtonLink = (props: LinkProps) => <Link {...props} component={Button} />;

export default Link;
