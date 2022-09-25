import { Group, Select } from "@mantine/core";
import type { FC } from "react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { booleanDummyTypeOption } from "~/constants/form/selectOption";

type Props = {
  name: string;
};

export const BooleanFormField: FC<Props> = ({ name }) => {
  const { control } = useFormContext();

  return (
    <Group spacing="xs" align="end">
      <Controller
        control={control}
        name={`${name}.options.dummyType`}
        render={({ field: { onChange, value } }) => {
          return (
            <Select size="xs" label="dummy type" value={value} onChange={onChange} data={booleanDummyTypeOption} />
          );
        }}
      />
    </Group>
  );
};
