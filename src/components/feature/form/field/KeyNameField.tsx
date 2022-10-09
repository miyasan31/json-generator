import { TextInput } from "@mantine/core";
import type { FC } from "react";
import type { FieldPath } from "react-hook-form";
import { useController } from "react-hook-form";

import { useCreateJsonFormContext } from "~/components/page/public/Root/Root.page";
import { formRules } from "~/constants/form/formRules";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type KeyNameFieldProps = {
  name: FilterFieldPath<FieldPath<ICreateJson>, "keyName">;
};

export const KeyNameField: FC<KeyNameFieldProps> = ({ name }) => {
  const { control, register } = useCreateJsonFormContext();
  const {
    fieldState: { error },
  } = useController({ name, control, rules: formRules.keyName });

  return <TextInput sx={{ flex: 2 }} size="xs" required label="キー名" {...register(name)} error={error?.message} />;
};
