import { Box, createStyles, Stack } from "@mantine/core";

import { Header } from "~/components/layout/CommonLayout/Header";
import { Outlet } from "~/components/lib/router/Outlet";
import { Suspense } from "~/components/provider/Suspense";

export const CommonLayout = () => {
  const { classes } = useStyle();

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

const useStyle = createStyles<"root" | "layout">(() => {
  return {
    root: {
      position: "relative",
      height: "100vh",
    },
    layout: {
      width: "95%",
      margin: "68px auto",
    },
  };
});
