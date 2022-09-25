import type { ColorScheme } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

export const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return {
    colorScheme,
    toggleColorScheme,
  };
};
