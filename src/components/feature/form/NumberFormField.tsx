import { Group, Select } from "@mantine/core";
import type { FC } from "react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { numberDummyTypeOption } from "~/constants/form/selectOption";

type Props = {
  name: string;
};

export const NumberFormField: FC<Props> = ({ name }) => {
  const { control } = useFormContext();

  return (
    <Group spacing="xs" align="end">
      <Controller
        control={control}
        name={`${name}.options.dummyType`}
        render={({ field: { onChange, value } }) => {
          return <Select size="xs" label="dummy type" value={value} onChange={onChange} data={numberDummyTypeOption} />;
        }}
      />
    </Group>
  );
};
