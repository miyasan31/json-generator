import { Select } from "@mantine/core";
import type { FC } from "react";
import type { FieldPath } from "react-hook-form";
import { Controller } from "react-hook-form";

import { useCreateJsonFormContext } from "~/components/page/public/Root/Root.page";
import { numberDummyTypeOption } from "~/constants/form/selectOption";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type NumberTypeFieldProps = {
  name: FilterFieldPath<FieldPath<ICreateJson>, "numberDummyType">;
};

export const NumberTypeField: FC<NumberTypeFieldProps> = ({ name }) => {
  const { control } = useCreateJsonFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <Select
            sx={{ flex: 1 }}
            size="xs"
            searchable
            label="ダミーデータ"
            value={value}
            onChange={onChange}
            data={numberDummyTypeOption}
            filter={(value, item) => item.value.toLowerCase().includes(value.toLowerCase().trim())}
          />
        );
      }}
    />
  );
};
