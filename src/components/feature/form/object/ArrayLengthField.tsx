import { NumberInput } from "@mantine/core";
import type { FC } from "react";
import type { Control, FieldPath } from "react-hook-form";
import { Controller } from "react-hook-form";

import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type ArrayLengthFieldProps = {
  control: Control<ICreateJson>;
  name: FilterFieldPath<FieldPath<ICreateJson>, "length">;
};

export const ArrayLengthField: FC<ArrayLengthFieldProps> = ({ control, name }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <NumberInput sx={{ flex: 1 }} min={1} max={20} size="xs" label="生成数" value={value} onChange={onChange} />
        );
      }}
    />
  );
};
