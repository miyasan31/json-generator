import { Group, Select } from "@mantine/core";
import type { FC } from "react";
import type { FieldPath } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";

import { booleanDummyTypeOption } from "~/constants/form/selectOption";
import type { ICreateJson } from "~/interfaces/useCase/json";
import type { FilterFieldPath } from "~/libs/react-hook-form/FilterFieldPath";

type Props = {
  name: {
    booleanDummy: FilterFieldPath<FieldPath<ICreateJson>, "booleanDummyType">;
  };
};

export const BooleanFormField: FC<Props> = ({ name }) => {
  const { control } = useFormContext<ICreateJson>();

  return (
    <Group spacing="xs" align="end">
      <Controller
        control={control}
        name={name.booleanDummy}
        render={({ field: { onChange, value } }) => {
          return (
            <Select size="xs" label="dummy type" value={value} onChange={onChange} data={booleanDummyTypeOption} />
          );
        }}
      />
    </Group>
  );
};
