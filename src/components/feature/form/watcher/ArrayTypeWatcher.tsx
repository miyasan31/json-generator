import type { FC, ReactNode } from "react";
import type { Control, FieldPath } from "react-hook-form";
import { useWatch } from "react-hook-form";

import type { ArrayValueType } from "~/interfaces/model/object";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type ArrayTypeWatcherProps = {
  name: FilterFieldPath<FieldPath<ICreateJson>, "item.valueType">;
  control: Control<ICreateJson>;
  children: (value: ArrayValueType) => ReactNode;
};

export const ArrayTypeWatcher: FC<ArrayTypeWatcherProps> = ({ name, control, children }) => {
  const value = useWatch({ name, control });

  return <>{children(value)}</>;
};
