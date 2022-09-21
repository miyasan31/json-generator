import { useRoutes } from "react-router-dom";

import { publicRoutes } from "~/routes/public";

export const AppRoutes = () => {
  const element = useRoutes(publicRoutes);
  return <>{element}</>;
};
