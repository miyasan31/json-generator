import { Box, createStyles, Stack } from "@mantine/core";

import { Header } from "~/components/layout/CommonLayout/Header";
import { Outlet } from "~/components/lib/router/Outlet";
import { Suspense } from "~/components/provider/Suspense";
import { useMediaQuery } from "~/libs/mantine/useMediaQuery";

export const CommonLayout = () => {
  const isMediumScreen = useMediaQuery("md");
  const { classes } = useStyle({ isMediumScreen });

  return (
    <Stack spacing="sm" className={classes.root}>
      <Header />

      <Box className={classes.layout}>
        <Suspense>
          <Outlet />
        </Suspense>
      </Box>
    </Stack>
  );
};

const useStyle = createStyles<"root" | "layout", { isMediumScreen: boolean }>((_, params) => {
  const { isMediumScreen } = params;

  return {
    root: {
      height: "100vh",
    },
    layout: {
      width: isMediumScreen ? "90%" : "95%",
      margin: "0 auto",
    },
  };
});
