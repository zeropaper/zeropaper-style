import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { Button, createStyles } from '@mantine/core';
import { ComponentType, PropsWithChildren } from 'react';

export * from 'next/link';

type LinkProps = NextLinkProps & {
  className?: string;
  component?: ComponentType<{ className?: string }> | string;
  [k: string]: any;
};

export const useStyles = createStyles(
  ({ fn, colors, colorScheme, primaryColor }) => ({
    root: {
      ...fn.focusStyles(),
      color: colors?.[primaryColor][5],
      transition: 'color 162ms ease-in-out',
      '&:hover,&:focus': {
        color: colors[primaryColor][3],
      },
      '&.draft': {
        color: colors?.['orange'][5],
      },
      '&.draft:hover,&.draft:focus': {
        color: colors['orange'][3],
      },
    },
  })
);

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
  const { classes, cx } = useStyles();

  const linkProps: NextLinkProps = {
    href,
    as,
    replace,
    scroll,
    shallow,
    passHref,
    prefetch,
    locale,
  };

  return (
    <NextLink {...linkProps}>
      <Component {...rest} className={cx(className, classes.root)} />
    </NextLink>
  );
};

export const ButtonLink = (props: LinkProps) => (
  <Link {...props} component={Button} />
);

export const DraftLink = ({
  unpublished,
  className,
  ...props
}: LinkProps & { unpublished?: boolean }) => (
  <Link
    {...props}
    className={[className, unpublished && 'draft'].filter(Boolean).join(' ')}
  />
);

export default Link;
