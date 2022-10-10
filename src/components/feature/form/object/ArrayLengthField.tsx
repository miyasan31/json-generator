import { NumberInput } from "@mantine/core";
import type { FC } from "react";
import { useCallback } from "react";
import type { FieldPath } from "react-hook-form";
import { useController } from "react-hook-form";

import { useCreateJsonFormContext } from "~/components/page/public/Root/Root.page";
import { formRules } from "~/constants/form/formRules";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type ArrayLengthFieldProps = {
  name: FilterFieldPath<FieldPath<ICreateJson>, "length">;
};

export const ArrayLengthField: FC<ArrayLengthFieldProps> = ({ name }) => {
  const { control } = useCreateJsonFormContext();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: formRules.arrayLength,
  });

  const onChangeValue = useCallback((value: number) => {
    if (0 < value && value < 11) {
      onChange(value);
    }
  }, []);

  return (
    <NumberInput
      sx={{ flex: 1 }}
      min={1}
      max={10}
      size="xs"
      label="生成数"
      value={value}
      onChange={onChangeValue}
      error={error?.message}
    />
  );
};
