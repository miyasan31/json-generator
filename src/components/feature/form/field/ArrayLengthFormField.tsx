import { NumberInput } from "@mantine/core";
import type { FC } from "react";
import type { FieldPath } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";

import { generateLengthLabel } from "~/constants/form/label";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type ArrayLengthFormFieldProps = {
  name: FilterFieldPath<FieldPath<ICreateJson>, "length">;
};

export const ArrayLengthFormField: FC<ArrayLengthFormFieldProps> = ({ name }) => {
  const { control } = useFormContext<ICreateJson>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <NumberInput
            min={1}
            max={20}
            size="xs"
            label={generateLengthLabel}
            value={value}
            onChange={onChange}
            sx={{
              flex: 1,
            }}
          />
        );
      }}
    />
  );
};
