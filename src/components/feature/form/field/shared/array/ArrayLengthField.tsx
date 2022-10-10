import { NumberInput } from "@mantine/core";
import type { FC } from "react";
import { useCallback } from "react";
import type { FieldPath } from "react-hook-form";
import { useController } from "react-hook-form";

import { useCreateJsonFormContext } from "~/components/page/public/Root/Root.page";
import { MAX_ARRAY_LENGTH, MIN_ARRAY_LENGTH } from "~/constants/form/arrayLength";
import { FORM_RULES } from "~/constants/form/formRules";
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
    rules: FORM_RULES.arrayLength,
  });

  const onChangeValue = useCallback((value: number) => {
    if (MIN_ARRAY_LENGTH <= value && value <= MAX_ARRAY_LENGTH) {
      onChange(value);
    }
  }, []);

  return (
    <NumberInput
      sx={{ flex: 1 }}
      min={MIN_ARRAY_LENGTH}
      max={MAX_ARRAY_LENGTH}
      size="xs"
      label="生成数"
      value={value}
      onChange={onChangeValue}
      error={error?.message}
    />
  );
};
