import type { FC, ReactNode } from "react";
import type { FieldPath } from "react-hook-form";
import { useWatch } from "react-hook-form";

import { useCreateJsonFormContext } from "~/components/page/public/Root/Root.page";
import type { ObjectValueType } from "~/interfaces/model/object";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type FormTypeWatcherProps = {
  name: FilterFieldPath<FieldPath<ICreateJson>, "valueType">;
  children: (value: ObjectValueType) => ReactNode;
};

export const FormTypeWatcher: FC<FormTypeWatcherProps> = ({ name, children }) => {
  const { control } = useCreateJsonFormContext();
  const value = useWatch({ name, control });

  return <>{children(value)}</>;
};
