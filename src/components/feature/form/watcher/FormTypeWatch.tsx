import type { FC, ReactNode } from "react";
import type { Control, FieldPath } from "react-hook-form";
import { useWatch } from "react-hook-form";

import type { JsonCreateForm } from "~/interfaces/model/form";
import type { ValueType } from "~/interfaces/model/object";

type FilterFieldPath<FieldPaths, FilterString extends string> = FieldPaths extends `${infer T}.${FilterString}`
  ? `${T}.${FilterString}`
  : never;

type FieldNames = FieldPath<JsonCreateForm>;

type FormTypeWatchProps = {
  name: FilterFieldPath<FieldNames, "valueType">;
  control: Control<JsonCreateForm>;
  children: (value: ValueType) => ReactNode;
};

export const FormTypeWatch: FC<FormTypeWatchProps> = ({ name, control, children }) => {
  const value = useWatch({ name, control });
  return <>{children(value)}</>;
};
