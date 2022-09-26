import { Box, Stack } from "@mantine/core";

import { Header } from "~/components/layout/CommonLayout/Header";
import { Outlet } from "~/components/lib/react-router/Outlet";
import { Suspense } from "~/components/provider/Suspense";
import { useMediaQuery } from "~/libs/mantine/useMediaQuery";

export const CommonLayout = () => {
  const isMediumScreen = useMediaQuery("md");

  return (
    <Stack spacing="sm" sx={{ height: "100vh" }}>
      <Header />

      <Box
        style={{
          width: isMediumScreen ? "90%" : "95%",
          margin: "0 auto",
        }}
      >
        <Suspense>
          <Outlet />
        </Suspense>
      </Box>
    </Stack>
  );
};
