import { createStyles, CSSObject } from '@mantine/core';

export default createStyles(({
  spacing,
  colors,
  primaryColor,
  colorScheme,
  fn,
}) => {
  const size = spacing.xl * 2;
  const top = 'polygon(0 100%,100% 0,100% 100%)';
  const bottom = 'polygon(0 0,100% 0,0 100%)';

  return {
    root: {
      position: 'relative',
      width: '100%',
      maxWidth: 'unset',
      color: 'unset',
      overflow: 'visible',

      padding: `${size}px 0`,

      ...(Object.keys(colors).reduce((acc, key) => {
        acc[`&.${key}`] = {
          background: fn[colorScheme === 'dark' ? 'darken' : 'lighten'](colors[key][4], 0.75),
        }
        return acc;
      }, {} as { [key: string]: CSSObject })),
      ['&.primary']: {
        background: fn[colorScheme === 'dark' ? 'darken' : 'lighten'](colors[primaryColor][4], 0.75),
      }
    },
    decoSlant: {
      margin: `calc(${size}px - 1px) auto`,
      zIndex: 1,
      '&::before,&::after': {
        content: '""',
        left: 0,
        width: '100%',
        right: 0,
        height: size,
        position: 'absolute',
        zIndex: 0,
        backgroundColor: 'inherit',
      },
      '&::before': {
        clipPath: top,
        bottom: '100%'
      },
      '&::after': {
        clipPath: bottom,
        top: '100%'
      },
      '& + $root:not($decoSlant)': {
        marginTop: `calc(-1 * ${size}px)`,
        paddingTop: `calc(2 * ${size}px)`,
        zIndex: 0
      },
    },
    inner: {
      margin: `calc(${size}px - 1px) auto`,
    },
  }
});
