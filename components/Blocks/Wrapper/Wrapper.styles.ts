import { createStyles, CSSObject, MantineTheme } from "@mantine/core";

const patterns = {
  isometric: (theme: MantineTheme) => {
    const color = theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[1];
    const colorFaded = theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2];
    return {
      backgroundSize: '20px 35px',
      backgroundPosition: '0 0, 0 0, 10px 18px, 10px 18px, 0 0, 10px 18px',
      backgroundImage: `linear-gradient(
        30deg,
        ${color} 12%,
        transparent 12.5%,
        transparent 87%,
        ${color} 87.5%,
        ${color}
      ),
      linear-gradient(
        150deg,
        ${color} 12%,
        transparent 12.5%,
        transparent 87%,
        ${color} 87.5%,
        ${color}
      ),
      linear-gradient(
        30deg,
        ${color} 12%,
        transparent 12.5%,
        transparent 87%,
        ${color} 87.5%,
        ${color}
      ),
      linear-gradient(
        150deg,
        ${color} 12%,
        transparent 12.5%,
        transparent 87%,
        ${color} 87.5%,
        ${color}
      ),
      linear-gradient(
        60deg,
        ${colorFaded} 25%,
        transparent 25.5%,
        transparent 75%,
        ${colorFaded} 75%,
        ${colorFaded}
      ),
      linear-gradient(
        60deg,
        ${colorFaded} 25%,
        transparent 25.5%,
        transparent 75%,
        ${colorFaded} 75%, ${colorFaded}
      )`,
    }
  }
} as const

export default createStyles(
  (theme) => {
    const { spacing, colors, primaryColor, colorScheme, fn } = theme;
    const size = spacing.xl * 2;

    return {
      root: {
        position: "relative",
        width: "100%",
        maxWidth: "unset",
        color: "unset",
        overflow: "visible",

        padding: `${size}px 0`,

        ...Object.keys(colors).reduce((acc, key) => {
          acc[`&.${key}`] = {
            backgroundColor: fn[colorScheme === "dark" ? "darken" : "lighten"](
              colors[key][4],
              0.75
            ),
          };
          return acc;
        }, {} as { [key: string]: CSSObject }),
        ["&.primary"]: {
          backgroundColor: fn[colorScheme === "dark" ? "darken" : "lighten"](
            colors[primaryColor][4],
            0.75
          ),
        },
      },
      plain: {
        padding: 0,
      },
      decoSlant: {
        zIndex: 1,
        clipPath: `polygon(
          0% ${size}px,
          100% 0%,
          100% calc(100% - ${size}px),
          0% 100%
        )`,
        margin: `0 auto calc(-1 * (${size}px + 1px)) auto`,
      },
      pattern: patterns.isometric(theme),
      inner: {
        margin: `calc(${size}px - 1px) auto`,
      },
      innerPlain: {
        margin: `0 auto`,
      },
    };
  }
);
