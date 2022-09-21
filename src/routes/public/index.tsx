import { PublicLayout } from "~/components/layout/PublicLayout";
import { RootPage } from "~/components/page/public";
import { FetchProvider } from "~/components/provider/Fetch";

export const publicRoutes = [
  {
    path: "",
    element: (
      <PublicLayout>
        <FetchProvider />
      </PublicLayout>
    ),
    children: [
      {
        path: "/",
        element: <RootPage />,
      },
    ],
  },
];
