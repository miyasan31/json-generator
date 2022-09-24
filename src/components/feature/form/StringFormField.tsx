import { Group, Select, TextInput } from "@mantine/core";
import type { FC } from "react";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { stringDummyTypeOption } from "~/constants/form/selectOption";

type Props = {
  name: string;
  leftSpace?: boolean;
};

export const StringFormField: FC<Props> = ({ name, leftSpace = true }) => {
  const { register, control } = useFormContext();

  return (
    <Group spacing="xs" align="end" ml={leftSpace ? "2.375rem" : 0}>
      <Controller
        control={control}
        name={`${name}.options.dummyType`}
        render={({ field: { onChange, value } }) => {
          return <Select size="xs" label="dummy type" value={value} onChange={onChange} data={stringDummyTypeOption} />;
        }}
      />
      <TextInput size="xs" label="prefix" {...register(`${name}.options.prefix`)} />
      <TextInput size="xs" label="suffix" {...register(`${name}.options.suffix`)} />
    </Group>
  );
};
