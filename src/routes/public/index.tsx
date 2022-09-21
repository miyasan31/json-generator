import { CommonLayout } from "~/components/layout/CommonLayout";
import { RootPage } from "~/components/page/public";
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
    ],
  },
  ...commonRoutes,
];
