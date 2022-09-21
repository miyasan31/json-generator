import { useRoutes } from "react-router-dom";

import { commonRoutes } from "~/routes/common";
import { publicRoutes } from "~/routes/public";

export const AppRoutes = () => {
  const element = useRoutes([...publicRoutes, ...commonRoutes]);
  return <>{element}</>;
};
