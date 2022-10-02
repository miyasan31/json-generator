import type { FC, ReactNode } from "react";
import type { Control, FieldPath } from "react-hook-form";
import { useWatch } from "react-hook-form";

import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type OptionWatcherProps = {
  type: "string" | "number";
  name: FilterFieldPath<FieldPath<ICreateJson>, "stringDummyType" | "numberDummyType">;
  control: Control<ICreateJson>;
  children: (isVisible: boolean) => ReactNode;
};

export const OptionWatcher: FC<OptionWatcherProps> = ({ type, name, control, children }) => {
  const value = useWatch({ name, control });
  const isVisible =
    type === "string"
      ? ["autoIncrement", "fullName", "firstName", "lastName", "email", "any"].includes(value)
      : ["random", "age", "height", "weight", "price", "any"].includes(value);
  return <>{children(isVisible)}</>;
};
