import type { FC, ReactNode } from "react";
import { useWatch } from "react-hook-form";

import type { ValueType } from "~/components/feature/form/From.interface";

type FromTypeWatchProps = {
  name: any;
  control: any;
  children: (value?: ValueType) => ReactNode;
};

export const FormTypeWatch: FC<FromTypeWatchProps> = ({ name, control, children }) => {
  const value = useWatch({ name, control });
  return <>{children(value)}</>;
};
