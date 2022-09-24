import type { FC, ReactNode } from "react";
import type { useFormContext } from "react-hook-form";
import { useWatch } from "react-hook-form";

import type { ArrayValueType } from "~/interfaces/model/From.interface";

type ArrayTypeWatchProps = {
  name: string;
  control: ReturnType<typeof useFormContext>["control"];
  children: (value: ArrayValueType) => ReactNode;
};

export const ArrayTypeWatch: FC<ArrayTypeWatchProps> = ({ name, control, children }) => {
  const value = useWatch({ name, control });
  return <>{children(value)}</>;
};
