import {
  ColorSchemeProvider as MantineColorSchemeProvider,
  createEmotionCache,
  MantineProvider as MantineThemeProvider,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import type { FC, ReactNode } from "react";

import { customTheme } from "~/libs/mantine/theme.config";
import { useColorScheme } from "~/libs/mantine/useColorScheme";

type Props = {
  children: ReactNode;
};

export const MantineProvider: FC<Props> = ({ children }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <MantineColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineThemeProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ ...customTheme, colorScheme }}
        emotionCache={createEmotionCache({ key: "mantine", prepend: false })}
      >
        <NotificationsProvider position="bottom-right">{children}</NotificationsProvider>
      </MantineThemeProvider>
    </MantineColorSchemeProvider>
  );
};
