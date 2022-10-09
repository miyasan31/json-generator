import { TextInput } from "@mantine/core";
import type { FC } from "react";
import type { FieldPath, UseFormRegister } from "react-hook-form";

import { formRules } from "~/constants/form/formRules";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type KeyNameFieldProps = {
  register: UseFormRegister<ICreateJson>;
  name: FilterFieldPath<FieldPath<ICreateJson>, "keyName">;
  error?: string;
};

export const KeyNameField: FC<KeyNameFieldProps> = ({ register, name, error }) => {
  return (
    <TextInput
      sx={{ flex: 2 }}
      size="xs"
      required
      label="キー名"
      {...register(name, formRules.keyName)}
      error={error}
    />
  );
};
