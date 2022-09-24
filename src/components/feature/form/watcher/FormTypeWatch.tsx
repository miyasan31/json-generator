import type { FC, ReactNode } from "react";
import type { useFormContext } from "react-hook-form";
import { useWatch } from "react-hook-form";

import type { ValueType } from "~/interfaces/model/From.interface";

type FromTypeWatchProps = {
  name: string;
  control: ReturnType<typeof useFormContext>["control"];
  children: (value: ValueType) => ReactNode;
};

export const FormTypeWatch: FC<FromTypeWatchProps> = ({ name, control, children }) => {
  const value = useWatch({ name, control });
  return <>{children(value)}</>;
};
