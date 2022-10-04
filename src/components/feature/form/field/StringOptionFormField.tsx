import { Group, TextInput } from "@mantine/core";
import type { FC } from "react";
import type { FieldPath } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { useFormContext } from "react-hook-form";

import { anyLabel, prefixLabel, suffixLabel } from "~/constants/form/label";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type StringOptionFormFieldProps = {
  name: {
    stringDummyType: FilterFieldPath<FieldPath<ICreateJson>, "stringDummyType">;
    options: FilterFieldPath<FieldPath<ICreateJson>, "stringOptions">;
  };
};

export const StringOptionFormField: FC<StringOptionFormFieldProps> = ({ name }) => {
  const { register, control } = useFormContext<ICreateJson>();
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
