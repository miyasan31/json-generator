import type { FC, ReactNode } from "react";
import type { Control, FieldPath } from "react-hook-form";
import { useWatch } from "react-hook-form";

import type { ObjectValueType } from "~/interfaces/model/object";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type FormTypeWatcherProps = {
  name: FilterFieldPath<FieldPath<ICreateJson>, "valueType">;
  control: Control<ICreateJson>;
  children: (value: ObjectValueType) => ReactNode;
};

export const FormTypeWatcher: FC<FormTypeWatcherProps> = ({ name, control, children }) => {
  const value = useWatch({ name, control });
  return <>{children(value)}</>;
};
