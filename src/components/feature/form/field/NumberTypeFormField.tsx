import { Select } from "@mantine/core";
import type { FC } from "react";
import type { FieldPath } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";

import { dummyTypeLabel } from "~/constants/form/label";
import { numberDummyTypeOption } from "~/constants/form/selectOption";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type NumberTypeFormFieldProps = {
  name: FilterFieldPath<FieldPath<ICreateJson>, "numberDummyType">;
};

export const NumberTypeFormField: FC<NumberTypeFormFieldProps> = ({ name }) => {
  const { control } = useFormContext<ICreateJson>();

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
            data={numberDummyTypeOption}
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
