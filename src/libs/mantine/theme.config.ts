import type { ButtonStylesParams, MantineThemeOverride } from "@mantine/core";

export const breakpointsTheme = {
  xs: 576,
  sm: 768,
  md: 992,
  lg: 1000,
  xl: 1400,
} as const;

export const otherTheme = {
  lineHeights: [1.2, 1.4, 1.6, 1.8, 1.95],
  reduceMotion: true,
  myCustomFunction: () => {},
};

export const customTheme: MantineThemeOverride = {
  colorScheme: "dark",
  loader: "oval",
  primaryColor: "blue",
  breakpoints: breakpointsTheme,
  other: otherTheme,
  activeStyles: { transform: "scale(0.98)" },
  components: {
    Text: {
      styles: (theme, params: ButtonStylesParams) => {
        if (params.color === "gray") {
          return {
            root: {
              color: theme.colors.gray[6],
            },
          };
        }

        return { root: {} };
      },
    },
    ActionIcon: {
      styles: (theme, params: ButtonStylesParams) => {
        if (params.variant === "filled") {
          return {
            root: {
              backgroundColor: theme.colorScheme === "light" ? theme.colors.dark[6] : theme.colors.red[6],
              "&:hover": {
                backgroundColor: theme.colorScheme === "light" ? theme.colors.dark[7] : theme.colors.red[7],
              },
            },
          };
        }

        if (params.variant === "subtle") {
          return {
            root: {
              "&:hover": {
                backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[3] : theme.colors.dark[4],
              },
            },
          };
        }

        return { root: {} };
      },
    },
    Button: {
      styles: (theme, params: ButtonStylesParams) => {
        if (params.variant === "filled") {
          return {
            root: {
              backgroundColor: theme.colorScheme === "light" ? theme.colors.dark[6] : theme.colors.red[6],
              "&:hover": {
                backgroundColor: theme.colorScheme === "light" ? theme.colors.dark[7] : theme.colors.red[7],
              },
            },
          };
        }

        if (params.variant === "subtle") {
          return {
            root: {
              "&:hover": {
                backgroundColor: theme.colorScheme === "light" ? theme.colors.gray[1] : theme.colors.dark[6],
              },
            },
          };
        }

        return { root: {} };
      },
    },
  },
};
