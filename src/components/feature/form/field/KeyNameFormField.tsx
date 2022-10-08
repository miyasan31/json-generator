import { TextInput } from "@mantine/core";
import type { FC } from "react";
import type { FieldPath, UseFormRegister } from "react-hook-form";

import { formRules } from "~/constants/form/formRules";
import { keyNameLabel } from "~/constants/form/label";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type KeyNameFormFieldProps = {
  register: UseFormRegister<ICreateJson>;
  name: FilterFieldPath<FieldPath<ICreateJson>, "keyName">;
  error?: string;
};

export const KeyNameFormField: FC<KeyNameFormFieldProps> = ({ register, name, error }) => {
  return (
    <TextInput
      sx={{
        flex: 2,
      }}
      size="xs"
      required
      label={keyNameLabel}
      {...register(name, formRules.keyName)}
      error={error}
    />
  );
};
