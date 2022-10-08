import { Select } from "@mantine/core";
import type { FC } from "react";
import type { Control, FieldPath } from "react-hook-form";
import { Controller } from "react-hook-form";

import { dummyTypeLabel } from "~/constants/form/label";
import { booleanDummyTypeOption } from "~/constants/form/selectOption";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type BooleanTypeFormFieldProps = {
  control: Control<ICreateJson>;
  name: FilterFieldPath<FieldPath<ICreateJson>, "booleanDummyType">;
};

export const BooleanTypeFormField: FC<BooleanTypeFormFieldProps> = ({ control, name }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <Select
            size="xs"
            searchable
            label={dummyTypeLabel}
            value={value}
            onChange={onChange}
            data={booleanDummyTypeOption}
            filter={(value, item) => item.value.toLowerCase().includes(value.toLowerCase().trim())}
            sx={{
              flex: 1,
            }}
          />
        );
      }}
    />
  );
};
