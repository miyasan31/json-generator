import type { FC, ReactNode } from "react";
import type { Control, FieldPath } from "react-hook-form";
import { useWatch } from "react-hook-form";

import type { JsonCreateForm } from "~/interfaces/model/form";
import type { ArrayValueType } from "~/interfaces/model/object";

type FilterFieldPath<FieldPaths, FilterString extends string> = FieldPaths extends `${infer T}.${FilterString}`
  ? `${T}.${FilterString}`
  : never;

type FieldNames = FieldPath<JsonCreateForm>;

type ArrayTypeWatchProps = {
  name: FilterFieldPath<FieldNames, "item.valueType">;
  control: Control<JsonCreateForm>;
  children: (value: ArrayValueType) => ReactNode;
};

export const ArrayTypeWatch: FC<ArrayTypeWatchProps> = ({ name, control, children }) => {
  const value = useWatch({ name, control });
  return <>{children(value)}</>;
};
