import { useMediaQuery as useMediaQueryOriginal } from "@mantine/hooks";

import { breakpointsTheme } from "~/libs/mantine/theme.config";

export const useMediaQuery = (
  query: keyof typeof breakpointsTheme,
  initialValue: Parameters<typeof useMediaQueryOriginal>[1] = true,
) => {
  return useMediaQueryOriginal(`(min-width: ${breakpointsTheme[query]}px)`, initialValue);
};
