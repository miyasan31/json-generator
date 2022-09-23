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
            ? "80%"
            : isMediumScreen
            ? "85%"
            : isSmallScreen
            ? "90%"
            : "95%",
          margin: isXLargeScreen
            ? "2rem auto 4rem"
            : isLargeScreen
            ? "2rem auto 4rem"
            : isMediumScreen
            ? "1rem auto 4rem"
            : isSmallScreen
            ? "1rem auto 4rem"
            : "1rem auto 4rem",
        }}
      >
        <Suspense>
          <Outlet />
        </Suspense>
      </Box>
    </>
  );
};
