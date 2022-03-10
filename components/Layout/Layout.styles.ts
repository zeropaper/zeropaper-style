import { createStyles } from '@mantine/core';

export default createStyles(({
  spacing,
  breakpoints,
  fn,
  colorScheme,
  white,
  colors,
}) => {
  const root = {
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  };
  const inner = {
    margin: '0 auto',
    maxWidth: breakpoints.md - (spacing.md * 2),
    overflow: 'hidden',
    [fn.smallerThan('md')]: {
      paddingLeft: spacing.md,
      paddingRight: spacing.md,
    }
  };

  return ({
    root,
    inner,
    pageContentLink: {
      display: 'none',
      height: 0,
      margin: 0,
    },
    header: {
      backgroundColor: colorScheme === 'light' ? white : colors.dark[7],
      position: 'sticky',
      top: 0,
      zIndex: 900,
    },
    main: {
      backgroundColor: colorScheme === 'light' ? white : colors.dark[7],
      flexGrow: 1,
      zIndex: 500,
    },
    content: {
    },
    footer: {
      backgroundColor: colorScheme === 'light' ? white : colors.dark[7],
      position: 'sticky',
      bottom: 0,
      zIndex: 100,
    },
  });
});
