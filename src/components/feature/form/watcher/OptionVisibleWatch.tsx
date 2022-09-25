import type { FC, ReactNode } from "react";
import type { useFormContext } from "react-hook-form";
import { useWatch } from "react-hook-form";

type OptionVisibleWatchProps = {
  name: string;
  control: ReturnType<typeof useFormContext>["control"];
  children: (value: boolean) => ReactNode;
};

export const OptionVisibleWatch: FC<OptionVisibleWatchProps> = ({ name, control, children }) => {
  const value = useWatch({ name, control });
  return <>{children(value)}</>;
};
