import { Group, TextInput } from "@mantine/core";
import type { FC } from "react";
import type { Control, FieldPath, UseFormRegister } from "react-hook-form";
import { useWatch } from "react-hook-form";

import { anyLabel, prefixLabel, suffixLabel } from "~/constants/form/label";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type StringOptionFieldProps = {
  control: Control<ICreateJson>;
  register: UseFormRegister<ICreateJson>;
  name: {
    stringDummyType: FilterFieldPath<FieldPath<ICreateJson>, "stringDummyType">;
    options: FilterFieldPath<FieldPath<ICreateJson>, "stringOptions">;
  };
};

export const StringOptionField: FC<StringOptionFieldProps> = ({ control, register, name }) => {
  const stringDummyType = useWatch({ name: name.stringDummyType, control });

  if (["autoIncrement", "fullName", "firstName", "lastName", "email"].includes(stringDummyType)) {
    return (
      <Group spacing="xs" grow align="flex-start">
        <TextInput size="xs" label={prefixLabel} {...register(`${name.options}.prefix`)} />
        <TextInput size="xs" label={suffixLabel} {...register(`${name.options}.suffix`)} />
      </Group>
    );
  }

  if (stringDummyType === "any") {
    return <TextInput size="xs" label={anyLabel} {...register(`${name.options}.stringAnyValue`)} />;
  }

  return null;
};