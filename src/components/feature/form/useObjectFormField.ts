import { useCallback } from "react";
import type { Control, FieldArrayWithId } from "react-hook-form";
import { useFieldArray } from "react-hook-form";

import type { ICreateJson } from "~/interfaces/useCase/json";

type NameType =
  | "json"
  | `json.${number}.object`
  | `json.${number}.item.object`
  | `json.${number}.object.${number}.object`;

type UseObjectFormFieldType = (
  name: NameType,
  control: Control<ICreateJson>,
) => {
  fields: FieldArrayWithId<ICreateJson, NameType, "id">[];
  onAppend: () => void;
  onRemove: (index: number) => void;
};

export const useObjectFormField: UseObjectFormFieldType = (name, control) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name,
  });

  const onRemove = useCallback((index: number) => remove(index), [remove]);

  const onAppend = useCallback(
    () =>
      append({
        keyName: "",
        valueType: "string",
        stringDummyType: "autoIncrement",
        stringOptions: {
          prefix: "",
          suffix: "",
        },
      }),
    [append],
  );

  return {
    fields,
    onAppend,
    onRemove,
  };
};
