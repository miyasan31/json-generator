import { NumberInput } from "@mantine/core";
import type { FC } from "react";
import type { Control, FieldPath } from "react-hook-form";
import { Controller } from "react-hook-form";

import { generateLengthLabel } from "~/constants/form/label";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type ArrayLengthFormFieldProps = {
  control: Control<ICreateJson>;
  name: FilterFieldPath<FieldPath<ICreateJson>, "length">;
};

export const ArrayLengthFormField: FC<ArrayLengthFormFieldProps> = ({ control, name }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <NumberInput
            sx={{ flex: 1 }}
            min={1}
            max={20}
            size="xs"
            label={generateLengthLabel}
            value={value}
            onChange={onChange}
          />
        );
      }}
    />
  );
};
