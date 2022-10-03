import type { FC, ReactNode } from "react";
import type { Control, FieldPath } from "react-hook-form";
import { useWatch } from "react-hook-form";

import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type OptionWatcherProps = {
  name: {
    valueType: FilterFieldPath<FieldPath<ICreateJson>, "valueType">;
    stringDummyType: FilterFieldPath<FieldPath<ICreateJson>, "stringDummyType">;
    numberDummyType: FilterFieldPath<FieldPath<ICreateJson>, "numberDummyType">;
  };
  control: Control<ICreateJson>;
  children: (isVisible: boolean) => ReactNode;
};

export const OptionWatcher: FC<OptionWatcherProps> = ({ name, control, children }) => {
  const type = useWatch({ name: name.valueType, control });
  const stringDummyType = useWatch({ name: name.stringDummyType, control });
  const numberDummyType = useWatch({ name: name.numberDummyType, control });

  const isVisible =
    type === "string"
      ? ["autoIncrement", "fullName", "firstName", "lastName", "email", "any"].includes(stringDummyType)
      : type === "number"
      ? ["random", "age", "height", "weight", "price", "any"].includes(numberDummyType)
      : ["array", "object"].includes(type);

  return <>{children(isVisible)}</>;
};
