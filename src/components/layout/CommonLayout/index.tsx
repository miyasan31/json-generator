import { Box } from "@mantine/core";

import { Header } from "~/components/layout/CommonLayout/Header";
import { Outlet } from "~/components/lib/react-router/Outlet";
import { Suspense } from "~/components/provider/Suspense";
import { useMediaQuery } from "~/libs/mantine/hook/useMediaQuery";

export const CommonLayout = () => {
  const isSmallScreen = useMediaQuery("sm");
  const isMediumScreen = useMediaQuery("md");
  const isLargeScreen = useMediaQuery("lg");
  const isXLargeScreen = useMediaQuery("xl");

  return (
    <>
      <Header />

      <Box
        style={{
          width: isXLargeScreen
            ? "70%"
            : isLargeScreen
            ? "70%"
            : isMediumScreen
            ? "75%"
            : isSmallScreen
            ? "80%"
            : "90%",
          margin: "0 auto",
        }}
      >
        <Suspense>
          <Outlet />
        </Suspense>
      </Box>
    </>
  );
};
