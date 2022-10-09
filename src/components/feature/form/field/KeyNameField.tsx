import { TextInput } from "@mantine/core";
import type { FC } from "react";
import type { Control, FieldPath, UseFormRegister } from "react-hook-form";
import { useController } from "react-hook-form";

import { formRules } from "~/constants/form/formRules";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type KeyNameFieldProps = {
  control?: Control<ICreateJson>;
  register: UseFormRegister<ICreateJson>;
  name: FilterFieldPath<FieldPath<ICreateJson>, "keyName">;
};

export const KeyNameField: FC<KeyNameFieldProps> = ({ register, name, control }) => {
  const {
    fieldState: { error },
  } = useController({ name, control });

  return (
    <TextInput
      sx={{ flex: 2 }}
      size="xs"
      required
      label="キー名"
      {...register(name, formRules.keyName)}
      error={error?.message}
    />
  );
};
