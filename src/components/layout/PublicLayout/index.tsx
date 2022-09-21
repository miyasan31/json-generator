import type { FC, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export const PublicLayout: FC<LayoutProps> = ({ children }) => {
  return <main>{children}</main>;
};
