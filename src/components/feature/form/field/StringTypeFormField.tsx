import { Select } from "@mantine/core";
import type { FC } from "react";
import type { FieldPath } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";

import { dummyTypeLabel } from "~/constants/form/label";
import { stringDummyTypeOption } from "~/constants/form/selectOption";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type StringTypeFormFieldProps = {
  name: FilterFieldPath<FieldPath<ICreateJson>, "stringDummyType">;
};

export const StringTypeFormField: FC<StringTypeFormFieldProps> = ({ name }) => {
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
            data={stringDummyTypeOption}
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
