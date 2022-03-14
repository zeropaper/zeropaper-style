import { createStyles, CSSObject } from '@mantine/core';

// https://mantine.dev/theming/mantine-provider/#normalizecss-and-global-styles
export default createStyles(({
  fn, white, colors, colorScheme, spacing, primaryColor,
  other: {
    colorSchemeSwitch: {
      transitionDuration,
      transitionTimingFunction,
    }
  }
}) => {
  const transitionBase: CSSObject = {
    transition: 'all',
    transitionDuration,
    transitionTimingFunction,
  };
  const clearSpace: CSSObject = {
    margin: 0,
    padding: 0,
  };
  const effectColor = colors[primaryColor][4];
  const backgroundColor = colorScheme === 'light' ? white : colors.dark[7];
  return {
    root: {
      ...clearSpace,
      width: '100%',
      flexGrow: 1,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    iframeWrapper: {
      '&:before': {
        ...transitionBase,
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        content: '""',
        display: 'block',
        zIndex: 2,
        boxShadow: `0 0 0 0 transparent inset`,
        background: 'transparent',
      },
      ...clearSpace,
      ...transitionBase,
      overflow: 'hidden',
      border: 'none',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      position: 'relative',
      zIndex: 1,
    },
    iframeWrapperShadow: {
      '&:before': {
        boxShadow: `0 0 7px 3px ${fn.rgba(effectColor, 0.15)} inset`,
        background: fn.rgba(effectColor, 0.05)
      }
    },
    iframe: {
      ...clearSpace,
      border: 'none',
      width: '100%',
      height: '100%',
      flexGrow: 1,
      position: 'relative',
      zIndex: 0,
    },
    main: {},
    scrollable: {
      overflow: 'auto',
      padding: spacing.md,
      backgroundColor,
      maxHeight: '100%',
      minHeight: '100%',
      position: 'relative',
      zIndex: 1,
    },
    aside: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      zIndex: 100,
      ...transitionBase,
      transition: 'right',
      width: '35vw',
      right: '-35vw',
      [fn.smallerThan('xs')]: {
        // TODO: should be stacked below the iframe
        width: '250px',
        right: '-250px',
      },
      [fn.smallerThan('md')]: {
        width: '55vw',
        right: '-55vw',
      },
      '&.asideOpen': {
        right: 0,
      }
    },
    asideOpen: {
      right: 0,
    },
    toggleButtonHolder: {
      position: 'absolute',
      right: '100%',
      top: '50%',
      zIndex: 0,
    },
    toggleButton: {
      borderRadius: `${spacing.xs}px ${spacing.xs}px 0 0`,
      transformOrigin: 'bottom center',
      transform: `translate(calc(50% + 1px), calc(((${spacing.xs}px * 2) + 1rem) * -1)) rotate(-90deg)`,
      border: 'none',
      cursor: 'pointer',
      paddingTop: spacing.xs,
      paddingBottom: spacing.xs,
      paddingLeft: spacing.sm,
      paddingRight: spacing.sm,
      backgroundColor,
      color: 'inherit',
      outline: 'none',
      ...transitionBase,
      fontSize: '1.25em',
      boxShadow: `0 0 7px 0px ${fn.rgba(colorScheme === 'dark' ? colors.gray[1] : colors.dark[7], 0.15)}`,
      '&:hover': {
        boxShadow: `0 0 7px 3px ${fn.rgba(colorScheme === 'dark' ? colors.gray[1] : colors.dark[7], 0.15)}`,
      }
    },
  };
});
