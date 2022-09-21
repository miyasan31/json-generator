import { CommonLayout } from "~/components/layout/CommonLayout";
import { RootPage } from "~/components/page/public";

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
];
