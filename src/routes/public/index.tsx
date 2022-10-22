import { CommonLayout } from "~/components/layout/CommonLayout";
import { DndPage } from "~/components/page/public/Dnd";
import { RootPage } from "~/components/page/public/Root";
import { commonRoutes } from "~/routes/common";

export const publicRoutes = [
  {
    path: "",
    element: <CommonLayout />,
    children: [
      {
        path: "/",
        element: <RootPage />,
      },
      {
        path: "/dnd",
        element: <DndPage />,
      },
    ],
  },
  ...commonRoutes,
];
