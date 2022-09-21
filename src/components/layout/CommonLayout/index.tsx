import { Header } from "~/components/layout/CommonLayout/Header";
import { Outlet } from "~/components/lib/react-router/Outlet";
import { Suspense } from "~/components/provider/Suspense";

export const CommonLayout = () => {
  return (
    <>
      <Header />

      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};
